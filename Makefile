MAKEFILE_THIS := $(lastword $(MAKEFILE_LIST))
REPO_ROOT     := $(patsubst %/,%,$(dir $(abspath $(MAKEFILE_THIS))))
SCRIPTS_PATH  := $(REPO_ROOT)/scripts
TESTS_PATH    := $(REPO_ROOT)/tests
MOTTO_REPO    := github.com/ddliu/motto

.PHONY: all
all: generate test

.PHONY: depend
depend:
	go get -u github.com/stretchr/testify

.PHONY: generate
generate:
	@cd $(SCRIPTS_PATH) && \
	    ./prepare-source.sh

.PHONY: test
test: depend
	go test -v

.PHONY: motto
motto:
	@go get -u $(MOTTO_REPO) && \
	    go install $(MOTTO_REPO)/motto && \
		cd $(TESTS_PATH) && \
		motto simple.js && \
		motto vehicle.js
