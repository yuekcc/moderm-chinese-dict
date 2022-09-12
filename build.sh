#!/bin/sh

set -eux

BUILD_TARGET=x86_64-unknown-linux-musl
BIN_NAME=modern_chinese_dict
BIN_FILE_PATH=target/${BUILD_TARGET}/release/${BIN_NAME}

echo "build web app"
test -d dist && rm -rf dist
pnpm i
pnpm build

echo "build server"
cargo zigbuild --target $BUILD_TARGET --release

if [ ! -d "target/${BUILD_TARGET}/release" ]
then
  echo "Build failed, exit"
  exit 1
fi

echo "make package"
OUTPUT_DIR=mcd_install
test -d $OUTPUT_DIR && rm -rf $OUTPUT_DIR
mkdir -p $OUTPUT_DIR
test -s .env && cp .env $OUTPUT_DIR
test -s $BIN_FILE_PATH && cp $BIN_FILE_PATH $OUTPUT_DIR
test -d data && cp -r data $OUTPUT_DIR
tar czvf mcd_install.tar.gz $OUTPUT_DIR

echo "all done"

