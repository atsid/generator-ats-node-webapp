#!/bin/bash

if [ ! -e node_modules ]; then
    mkdir -p node_modules
fi

ln -sf `pwd`/server node_modules/app
