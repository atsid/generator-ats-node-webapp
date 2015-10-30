#!/bin/bash

if [ ! -e node_modules ]; then
    mkdir -p node_modules
fi

rm node_modules/public
ln -sf `pwd`/public node_modules
