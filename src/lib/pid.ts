'use strict';

import WBPicD = require('WBPic');

function random(min: number, max: number): number {
  return Math.floor(Math.random() * max) + min;
}

function pid2url(pid: string, type: string): string {
  const ext = (pid[21] === 'g') ? 'gif' : 'jpg';
  const rand = random(1, 4);
  return `https://ws${rand}.sinaimg.cn/${type}/${pid}.${ext}`;
}

function parse(pid: string): WBPicD.uri {
  if (!pid) {
    return {};
  }
  return {
    thumb: pid2url(pid, 'thumbnail'),
    middle: pid2url(pid, 'bmiddle'),
    large: pid2url(pid, 'large'),
    mw690: pid2url(pid, 'mw690'),
    cover: pid2url(pid, 'orj360')
  };
}

export = {
  parse
};
