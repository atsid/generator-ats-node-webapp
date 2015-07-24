#!/bin/bash

if [ ! -e node_modules ]; then
    mkdir -p node_modules
fi

if [ ! -L node_modules/public ]; then
    ln -s ../public node_modules/public
fi
