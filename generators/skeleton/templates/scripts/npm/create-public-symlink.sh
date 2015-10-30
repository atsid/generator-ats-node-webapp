#!/bin/bash

if [ ! -e node_modules ]; then
    mkdir -p node_modules
fi

if [ -e node_modules/public ]; then
  rm node_modules/public
fi

ln -sf `pwd`/public node_modules
