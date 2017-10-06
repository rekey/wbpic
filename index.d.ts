/// <reference path="typings/index.d.ts" />
/// <reference path="node_modules/@types/node/index.d.ts" />
declare module 'weibo-pic' {
  import stream = require('stream');
  namespace WBPic {
    interface uri {
      thumb?: string;
      middle?: string;
      large?: string;
      mw690?: string;
      cover?: string;
    }

    interface form {
      app: string;
      token: string;
      s: string;
      rotate: number;
      nick: string;
      url: string;
      cb: string;
      pic1: object;
    }

    interface pic {
      width: number;
      height: number;
      ratio: number;
      uri: any
    }

    interface upload {
      width: number;
      height: number;
      ratio: number;
      uri: uri
    }
  }

  class WBPic {
    static upload(cookie: string, file: string, uid?: number): WBPic.upload;

    static uploadStream(cookie: string, file: stream.Readable, uid?: number): WBPic.upload;

    cookie: string;
    uid: number;

    constructor(cookie: string, uid: number);

    update(cookie: string, uid: number): void;

    upload(file: string): WBPic.upload;

    uploadStream(file: stream.Readable): WBPic.upload;
  }

  export = WBPic
}