import fs from 'fs';
import path from 'path';
import qiniu from 'qiniu';
import buckInfo from './action';
import { Info } from './action';
const { argv } = process;
const info: Info = buckInfo[argv[2]];
const dirPath = argv[3];
const { ak, sk, bucket, baseUrl, zone } = info;

/**
 * 获取upload token
 * @returns token
 */
const getToken = (): string => {
  const mac = new qiniu.auth.digest.Mac(ak, sk);
  const putPolicy = new qiniu.rs.PutPolicy({ scope: bucket });
  const uploadToken = putPolicy.uploadToken(mac);
  return uploadToken;
};

/**
 * 上传
 * @param uploadToken string 上传凭证
 * @param localFile string 文件路径
 * @param key string 目标文件名
 * @returns Promise
 */
const upload = async (uploadToken: string, localFile: string, key: string): Promise<any> => {
  const config = new qiniu.conf.Config({zone: qiniu.zone[zone]});
  const formUploader = new qiniu.form_up.FormUploader(config);
  const putExtra = new qiniu.form_up.PutExtra();
  return new Promise((resolve, reject) => {
    formUploader.putFile(uploadToken, key, localFile, putExtra, (respErr, respBody, respInfo) => {
      if(respErr) {
        reject(respErr);
      }
      if (respInfo.statusCode == 200) {
        resolve(respBody);
      }
    });
  });
};

/**
 * 获取上传后的文件链接
 * @param dirPath 文件夹路径
 * @param callback cb upload
 */
const getUrl = async (dirPath: string, callback: Function) => {
  const list = fs.readdirSync(dirPath);
  fs.writeFileSync('./url.txt', '');
  const dir = Date.now() + '/';
  const uploadToken = getToken();
  const fsList: Promise<any>[] = [];
  list.forEach((item: string) => {
    const localFile = path.resolve(dirPath, item);
    const key = dir + item;
    fsList.push(callback(uploadToken, localFile, key));
  });
  Promise.all(fsList).then((res) => {
    let str = '';
    res.forEach(item => {
      str += `${baseUrl}${item.key}\n`;
    });
    fs.appendFileSync('./url.txt', str);
  });
};

getUrl(dirPath, upload);
