#!/bin/bash

cross-env Contract=$1 Node=$2 Mainnet=$3 nuxt-ts generate

# test node
# npm run generate "0x0fd4c951b13ca9f70798a8d4fff891a73d0124a7" https://mtnode1.jccdex.cn false