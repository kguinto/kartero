use chrono;
use reqwest;
use rust_embed::RustEmbed;
use serde::{Deserialize, Serialize};
use serde_json;
use std::collections::HashMap;
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

            let mut stringified_headers = &String::from("");

            stringified_headers = match args.len() >= 2 {
                true => &args[2],
                false => stringified_headers,
            };

            let parsed_headers: Vec<HashMap<String, String>> =
                serde_json::from_str(&stringified_headers).expect("Could not parse headers");

            let client = reqwest::blocking::Client::new();

            let mut req = client.get(url);

            for parsed_header in parsed_headers.iter() {
                let header_name = parsed_header
                    .get("name")
                    .expect("Could not get header name");

                let header_value = parsed_header
                    .get("value")
                    .expect("Could not get header value");

                req = req.header(header_name, header_value);
            }

            let res = req.send()?.text()?;

            return Ok(res);
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
        <html
            style="height: 100%; width: 100%; overflow: hidden; box-sizing: border-box; padding: 0; margin: 0;"
        >
        <head>
            <title>App</title>
            <script>
                window.console.log = function (...args) {{
                    const stringifiedArgs = args.map(a =>
                        typeof a === 'string' ? a : JSON.stringify(a)
                      );
                  

                    external.invoke(
                        JSON.stringify({{
                            method: 'log',
                            args: stringifiedArgs
                        }})
                    );
                }};

                window.console.error = function (...args) {{
                    const stringifiedArgs = args.map(a =>
                        typeof a === 'string' ? a : JSON.stringify(a)
                      );

                    external.invoke(
                        JSON.stringify({{
                            method: 'error',
                            args: stringifiedArgs
                        }})
                    );
                }};

            </script>
        </head>
        <body
            style="height: 100%; width: 100%; overflow: hidden; box-sizing: border-box; padding: 0; margin: 0;"
        >
            <div id="app">You need JavaScript enabled to view this content.</div>
            <script>

            try {{
                {js}
            }} catch (err) {{
                console.error(err.toString());
            }}
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
                    println!("JS log: {}", inv.args.join(" "));
                }
                "error" => {
                    println!("JS error: {}", inv.args.join(" "));
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
