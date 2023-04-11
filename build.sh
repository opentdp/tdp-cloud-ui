#!/bin/sh
#

set -e
set -o noglob

###########################################

[ -d node_modules ] || npm install

npm run build
