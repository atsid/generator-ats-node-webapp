#!/bin/bash
if [ ! -L node_modules/app ]; then
    ln -s ../server node_modules/app
fi
