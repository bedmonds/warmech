.PHONY: build clean deps run
default: build 

deps:
	gem install srl-api

build:
	npm run build

run: build
	node build/main.js

clean:
	rm -f build/*
