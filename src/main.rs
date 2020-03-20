use rust_embed::RustEmbed;
use web_view::*;

#[derive(RustEmbed)]
#[folder = "static/"]
struct Asset;

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
        .title("My Project")
        .content(Content::Html(index_html))
        .size(480, 640)
        .resizable(true)
        .user_data(())
        .invoke_handler(|_webview, _arg| Ok(()))
        .run()
        .unwrap();
}
