/*
 * @Author: Rekey
 * @Date: 2016/12/21
 * @Last Modified by: RekeyLuo
 * @Last Modified time: 2017-01-06 23:26:02
 */

'use strict';

const request = require('request');
const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');

const pid2url = require('./pid2url.js');

class WBPic {
  static upload(cookie, file) {
    const uri = 'http://picupload.service.weibo.com/interface/pic_upload.php?wm=3&exif=1';
    const replaceStr = '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';
    const replaceStr2 = '<script type="text/javascript">document.domain="sina.com.cn";</script>';
    const defer = Promise.defer();
    const formData = {
      app: 'miniblog',
      token: 'I-Love-You',
      s: 'json',
      rotate: 0,
      nick: '',
      url: '',
      cb: '',
      pic1: fs.createReadStream(file)
    };
    request.post({
      url: uri,
      formData: formData,
      method: 'post',
      headers: {
        'Cookie': cookie
      }
    }, (err, httpResponse, body) => {
      if (err) {
        defer.reject(err);
        return;
      }
      let resp = body.replace(replaceStr, '');
      resp = JSON.parse(resp.replace(replaceStr2, ''));
      /** @namespace resp.data.pics */
      const picKeys = Object.keys(resp.data.pics);
      const pics = picKeys.map((key) => {
        const pic = resp.data.pics[key];
        pic.uri = pid2url(pic.pid);
        pic.ratio = Math.round((pic.width / pic.height) * 1000) / 1000;
        return pic;
      });
      defer.resolve(pics[0]);
    });
    return defer.promise;
  }

  constructor(cookie) {
    this.cookie = cookie;
  }

  upload(file) {
    return WBPic.upload(this.cookie, file);
  }
}

module.exports = WBPic;
