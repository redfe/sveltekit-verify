#!/bin/sh
cat ./build/server/sk_render/index.js | sed 's/return !!(proto && proto.constructor.name === "AbortSignal");/return !!(proto \&\& proto.constructor.name === "AbortSignal2");/g' > temp
mv temp ./build/server/sk_render/index.js
