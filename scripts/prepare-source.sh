#!/bin/bash

TRACEUR_REPO="https://github.com/google/traceur-compiler.git"
JSONATA_REPO="https://github.com/jsonata-js/jsonata.git"
BINDATA_REPO="github.com/jteeuwen/go-bindata"

SDIR=$( cd -P "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PDIR=$( dirname "${SDIR}" )
BUILD_PATH=${PDIR}/build
JS_PATH=${PDIR}/js
GOPATH=${GOPATH:-"${HOME}/go"}
PATH=${GOPATH}/bin:${PATH}

# cleanup working directories
function init {
    mkdir -p ${BUILD_PATH}
    rm -rf ${BUILD_PATH}/*
    mkdir -p ${JS_PATH}
    rm -rf ${JS_PATH}/*
}

# download and compile traceur for transcompile js code of ES6+
function buildTraceur {
    cd ${BUILD_PATH}
    git clone ${TRACEUR_REPO}
    cd traceur-compiler
    npm install
    make
    make bin/traceur-runtime.js
    cp traceur ${GOPATH}/bin
    cp bin/traceur-runtime.js ${JS_PATH}
}

function jsonataSource {
    # download jsonata source files
    cd ${BUILD_PATH}
    git clone ${JSONATA_REPO}

    # transpile js files down to ES5
    cd ${BUILD_PATH}/traceur-compiler
    ./traceur --dir ../jsonata/src jsonata --modules=commonjs
    cp ./jsonata/*.js ${JS_PATH}

    # generate golang source including all js files
    cd ${PDIR}
    go get -u ${BINDATA_REPO}/...
    go-bindata -pkg jsdata -o ./jsdata/jsdata.go js
}

init
buildTraceur
jsonataSource
