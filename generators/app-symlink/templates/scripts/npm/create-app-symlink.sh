#!/bin/bash

if [ ! -e node_modules ]; then
    mkdir -p node_modules
fi

if [ -e node_modules/app ]; then
  rm node_modules/app
fi

ln -sf `pwd`/server node_modules/app
