#!/bin/bash

if  [ -e ./.git ];
then
    cp scripts/git/hooks/* .git/hooks
fi
