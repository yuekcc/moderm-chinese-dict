#!/bin/sh

set -eux

BUILD_TARGET=x86_64-unknown-linux-musl
BIN_NAME=modern_chinese_dict
BIN_FILE_PATH=target/${BUILD_TARGET}/release/${BIN_NAME}

echo "build web app"
test -d dist && rm -f dist
pnpm i
pnpm build

echo "build server"
cargo zigbuild --target $BUILD_TARGET --release

if [ -d "target/${BUILD_TARGET}/release" ]
then
  echo "Build failed, exit"
  exit 1
fi

echo "make package"
mkdir -p mcd_install
test -s .env && cp .env mcd_install/
test -s $BIN_FILE_PATH && cp $BIN_FILE_PATH mcd_install/
test -d data && cp -r data mcd_install/
tar czvf mcd_install.tar.gz mcd_install

echo "all done"

