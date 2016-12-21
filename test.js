/*
 * @Author: Rekey
 * @Date: 2016/12/21
 * @Last Modified by: Rekey
 * @Last Modified time: 2016/12/21
 */

'use strict';

const path = require('path');
const WBPic = require('./libs/wbpic.js');

const wbPic = new WBPic('weibo cookie');

wbPic.upload(path.resolve(__dirname, 'test.jpg'))
  .then((pics) => {
    console.log(pics);
  });