## utils
### download web image

### qiniu upload
#### action.ts
```ts
const buckInfo = {
  "test": {
    ak: 'xxxx',
    sk: 'xxxx',
    bucket: 'xxxx',
    baseUrl: 'https://xxxx.com'
  }
};

export default buckInfo;
```
#### 上传
```
node dist\upload\index.js test
```