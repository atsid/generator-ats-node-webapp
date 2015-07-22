#!/bin/bash

if [ ! -e node_modules ]; then
    mkdir -p node_modules
fi

if [ ! -L node_modules/app ]; then
    ln -s ../server node_modules/app
fi
