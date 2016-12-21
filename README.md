# wbpic

```
const path = require('path');
const WBPic = require('weibo-pic');

const wbPic = new WBPic('weibo cookie');

wbPic.upload(path.resolve(__dirname, 'test.jpg'))
  .then((pics) => {
    console.log(pics);
  });
```