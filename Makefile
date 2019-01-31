MAKEFILE_THIS := $(lastword $(MAKEFILE_LIST))
REPO_ROOT     := $(patsubst %/,%,$(dir $(abspath $(MAKEFILE_THIS))))
BUILD_PATH    := $(REPO_ROOT)/build
JS_PATH       := $(REPO_ROOT)/js
BIN_PATH      := $(REPO_ROOT)/bin
SCRIPTS_PATH  := $(REPO_ROOT)/scripts
TESTS_PATH    := $(REPO_ROOT)/tests
MOTTO_REPO    := github.com/ddliu/motto
TRACEUR_REPO  := https://github.com/google/traceur-compiler.git
JSONATA_REPO  := https://github.com/jsonata-js/jsonata.git

.PHONY: all
all: prepare traceur jsonata motto tests

.PHONY: prepare
prepare:
	@mkdir -p $(BUILD_PATH) && \
	    mkdir -p $(JS_PATH) && \
		mkdir -p $(BIN_PATH) && \
		rm -Rf $(BUILD_PATH)/*

.PHONY: traceur
traceur:
	@cd $(BUILD_PATH) && \
	    git clone $(TRACEUR_REPO) && \
		cd traceur-compiler && \
		npm install && \
		make && \
		make bin/traceur-runtime.js && \
		cp traceur $(BIN_PATH) && \
		cp bin/traceur-runtime.js $(JS_PATH)

.PHONY: jsonata
jsonata:
	@cd $(BUILD_PATH) && \
	    git clone $(JSONATA_REPO) && \
		cd $(BUILD_PATH)/traceur-compiler && \
		./traceur --dir ../jsonata/src jsonata --modules=commonjs && \
		cp ./jsonata/*.js $(JS_PATH)

.PHONY: motto
motto:
	@go get -u $(MOTTO_REPO) && \
	    go install $(MOTTO_REPO)/motto && \
		cp $(GOPATH)/bin/motto $(BIN_PATH)

.PHONY: tests
tests:
	@cd $(TESTS_PATH) && \
	    motto simple.js && \
		motto vehicle.js
