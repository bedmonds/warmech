.PHONY: build clean deps run test
default: build 

deps:
	gem install srl-api
	npm install

build:
	npm run build

run: build
	node build/main.js

clean:
	rm -f build/*

test:
	npm run test
