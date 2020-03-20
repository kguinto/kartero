
install:
	cargo install wasm-bindgen-cli
	cd app; npm i

build-app:
	cd app; npm run build
	cp app/dist/** static/ 

run: build-app
	cargo run

build-macos: build-app
	cargo build  --target x86_64-apple-darwin --release