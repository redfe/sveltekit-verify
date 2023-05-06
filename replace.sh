#!/bin/sh
# Azure Blob Storage ライブラリを導入すると "Expected signal to be an instanceof AbortSignal" というエラーが発生するので、その対策。
cat ./build/server/sk_render/index.js | sed 's/return !!(proto && proto.constructor.name === "AbortSignal");/return !!(proto \&\& proto.constructor.name === "AbortSignal2");/g' > temp
mv temp ./build/server/sk_render/index.js
