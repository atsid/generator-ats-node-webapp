#!/usr/bin/env bash

if [ -e node_modules/public ]
then
  rm node_modules/public
fi

if [ -e node_modules/app ]
then
  rm node_modules/app
fi
