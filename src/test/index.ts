/// <reference path="../../typings/index.d.ts" />
'use strict';

import WBPic = require('../index');
import request = require('request');

const COOKIE_REGEX = /^SUB=.*?;/;

function buildOptions(formData: any) {
  return {
    method: 'POST',
    url: 'https://passport.weibo.cn/sso/login',
    headers: {
      Referer: 'https://passport.weibo.cn/signin/login',
      contentType: 'application/x-www-form-urlencoded',
    },
    formData,
    json: true
  }
}

function parseCookie(res: any) {
  return res.rawHeaders
    .find((h: string) => {
      return COOKIE_REGEX.test(h);
    })
    .match(COOKIE_REGEX)
    .pop();
}

function parseUid(res: any) {
  return res.body.data.uid
}

async function login(username: string, password: string) {
  try {
    const options = buildOptions({username, password});
    const resp = await new Promise((resolve, reject) => {
      request(options, (err: any, resp: any) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(resp);
      });
    });
    return {
      cookie: parseCookie(resp),
      uid: parseUid(resp),
    }
  } catch (err) {
    console.error(err);
    throw new Error('try again?');
  }
}

(async () => {
  try {
    const user = await login('username', 'password');
    const wbpic = new WBPic(user.cookie);
    const pic = await wbpic.upload('/tmp/test.png');
    // const pic = await WBPic.upload(user.cookie, '/tmp/test.png', user.uid);
    console.log(pic);
  } catch (e) {
    console.error(e);
  }
})();
