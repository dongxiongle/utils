## utils
```
git clone https://github.com/dongxiongle/utils.git
yarn install
tsc
```
### download web image
```ts
npm run download url
```

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
```ts
npm run upload test dirPath
```