#!/bin/sh
cat ./build/server/sk_render/index.js | sed 's/return !!(proto && proto.constructor.name === "AbortSignal");/console.log("###",{signal:signal,proto:proto});\r&/g' > temp
mv temp ./build/server/sk_render/index.js
