#!/bin/bash

if [ ! -e node_modules ]; then
    mkdir -p node_modules
fi

rm node_modules/app
ln -sf `pwd`/server node_modules/app
