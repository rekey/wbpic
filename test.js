/*
 * @Author: Rekey
 * @Date: 2016/12/21
 * @Last Modified by: RekeyLuo
 * @Last Modified time: 2017-01-07 13:46:55
 */

'use strict';

const path = require('path');
const WBPic = require('./libs/wbpic.js');

const wbPic = new WBPic('weibo cookie');
const cookie = 'weibo cookie';

WBPic.upload(cookie,'d:\\3a81b5fed845c3581560c61d002f8769.jpeg')
.then((pics) => {
    console.log(pics);
  });