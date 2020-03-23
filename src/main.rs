use chrono;
use reqwest;
use rust_embed::RustEmbed;
use serde::{Deserialize, Serialize};
use serde_json;
use web_view::*;

#[derive(Serialize, Deserialize, Debug)]
struct Invocation {
    method: String,
    args: Vec<String>,
}

#[derive(RustEmbed)]
#[folder = "static/"]
struct Asset;

fn handle_http(args: Vec<String>) -> Result<String, Box<dyn std::error::Error>> {
    let method = &args[0];

    match &method[..] {
        "GET" => {
            println!("GET {:?} {}", &args[1..], chrono::Utc::now());

            let url = &args[1];

            let resp = reqwest::blocking::get(url)?.text()?;

            return Ok(resp);
        }
        "POST" => println!("POST {:?}", &args[1..]),
        _ => unimplemented!(),
    }

    Ok("".to_string())
}

fn main() {
    let main_js = Asset::get("main.js").expect("Could not unwrap");

    let index_html = format!(
        r#"
            <!DOCTYPE html>
        <html>
        <head>
            <title>App</title>
        </head>
        <body>
            <div id="app">You need JavaScript enabled to view this content.</div>
            <script>
            {js}
            </script>
        </body>
        </html>
        "#,
        js = std::str::from_utf8(&main_js).expect("Could not convert contents to string")
    );

    web_view::builder()
        .title("kartero")
        .content(Content::Html(index_html))
        .size(480, 640)
        .resizable(true)
        .user_data(())
        .invoke_handler(|webview, arg| {
            let inv: Invocation = serde_json::from_str(&arg).expect("Could not parse JSON");

            match &inv.method[..] {
                "log" => {
                    println!("JS: {}", inv.args.join(" "));
                }
                "http" => {
                    let response = match handle_http(inv.args) {
                        Err(message) => {
                            println!("Error handling http: {}", &message);

                            message.to_string()
                        }
                        Ok(resp) => resp,
                    };

                    webview.eval(&format!("setResponse({:?})", &response))?;
                }
                _ => println!("unimplemented"),
            }

            Ok(())
        })
        .run()
        .unwrap();
}
