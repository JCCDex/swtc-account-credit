#!/bin/bash
cross-env Contract=$1 Node=$2 Mainnet=$3 nuxt-ts

# internal test node
# npm run dev 0x0fd4c951b13ca9f70798a8d4fff891a73d0124a7 http://192.168.66.249:8546 false

# public test node
# npm run dev 0x0fd4c951b13ca9f70798a8d4fff891a73d0124a7 https://mtnode1.jccdex.cn false

# public production node
# npm run dev 0xf5d4e7dd6f46402004f085be51dbfcc023532264 https://chain3.mytokenpocket.vip true