/// <reference path="../index.d.ts" />
'use strict';

import fs = require('fs');
import request = require('request');
import debug = require('debug');

import pid = require('./lib/pid');

import WBPicD = require('WBPic');

const defaultFrom: WBPicD.form = {
  app: 'miniblog',
  token: 'I-Love-You',
  s: 'json',
  rotate: 0,
  nick: '',
  url: '',
  cb: '',
  pic1: {}
};

class WBPic implements WBPic {

  static debug = debug('WBPic');

  static request(formData: object, cookie: string, file: string, uid: number = 3766716287): Promise<string> {
    const uri = 'http://picupload.service.weibo.com/interface/pic_upload.php?wm=3&exif=1';
    const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36';
    return new Promise((resolve, reject) => {
      request.post({
        url: uri,
        formData: formData,
        method: 'post',
        headers: {
          'user-agent': ua,
          cookie: cookie,
          referer: `http://weibo.com/u/${uid}/home`
        }
      }, (err, httpResponse, body) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(body);
      });
    });
  }

  static async upload(cookie: string, file: string, uid: number = 3766716287): Promise<WBPicD.pic> {
    WBPic.debug('static', 'upload', cookie, uid);
    const exists = fs.existsSync(file);
    if (!exists) {
      throw new Error(`${file} is no exists.`);
    }
    const str = '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';
    const str2 = '<script type="text/javascript">document.domain="sina.com.cn";</script>';
    const form: WBPicD.form = Object.assign({}, defaultFrom, {
      pic1: fs.createReadStream(file)
    });
    const resp = await WBPic.request(form, cookie, file);
    const data = JSON.parse(resp.replace(str, '').replace(str2, ''));
    const picKeys = Object.keys(data.data.pics);
    const pics = picKeys.map((key): WBPicD.pic => {
      const pic = data.data.pics[key];
      pic.uri = pid.parse(pic.pid);
      pic.width = parseInt(pic.width, 10);
      pic.height = parseInt(pic.height, 10);
      pic.ratio = Math.round((pic.width / pic.height) * 1000) / 1000;
      return {
        width: pic.width,
        height: pic.height,
        ratio: pic.ratio,
        uri: pic.uri
      };
    });
    return pics[0];
  }

  cookie: string;
  uid: number;

  constructor(cookie: string, uid: number = 0) {
    WBPic.debug('init', cookie, uid);
    this.cookie = cookie;
    this.uid = uid;
  }

  update(cookie: string, uid: number = 0) {
    WBPic.debug('update', cookie, uid);
    this.cookie = cookie;
    this.uid = uid;
  }

  upload(file: string): Promise<WBPicD.pic> {
    const cookie = this.cookie;
    const uid = this.uid;
    WBPic.debug('upload', cookie, uid);
    return WBPic.upload(cookie, file, uid);
  }

}

export = WBPic;