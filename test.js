/*
 * @Author: Rekey
 * @Date: 2016/12/21
 * @Last Modified by: RekeyLuo
 * @Last Modified time: 2017-01-06 23:19:03
 */

'use strict';

const path = require('path');
const WBPic = require('./libs/wbpic.js');

const wbPic = new WBPic('weibo cookie');

WBPic.upload('weibo cookie','d:\\test.png')
.then((pics) => {
    console.log(pics);
  });