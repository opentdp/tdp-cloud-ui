#!/bin/sh
#

set -e
set -o noglob

####################################################################

last_tag=`git tag | sort -V | tail -n 1`
prev_tag=`git tag | sort -V | tail -n 2 | head -n 1`
git log $prev_tag..$last_tag --pretty=format:"%s" | grep -v "^release" | sed 's/^/- /' | sort > RELEASE.md

version=`echo $last_tag | sed 's/^v//'`
sed -i "s/^const Version = \".*\"/const Version = \"$version\"/" src/helper/const.ts

build_version=$((`grep -oP 'BuildVersion = "\K\d+' src/helper/const.ts` + ${GITHUB_RUN_NUMBER:-0}))
sed -i "s/^const BuildVersion = \".*\"/const BuildVersion = \"$build_version\"/" src/helper/const.ts

echo "build info - tag: $last_tag, version: $version, build: $build_version"

###########################################

if [ ! -d node_modules ] ; then
    echo Installing node modules...
    npm install
fi

npm run build
