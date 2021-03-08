const fs = require('fs');
const Path = require('path');
const Process = require('process');
const puppeteer = require('puppeteer');
const path = Path.resolve(__dirname, 'images');
try {
  fs.mkdirSync(path);
} catch(err: any) {
  console.log('iamges already exists');
}
const download = async (url: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setViewport({ width: 1280, height: 926 });
  let counter = 0;
  let flag = 0;
  page.on('response', async (response: any) => {
    const list = response.url();
    const matches = /.*\/([^\/]*?)\.(jpg|png|svg|gif)$/.exec(list);
    if (matches && matches.length === 3) {
      counter++;
      const fileName = Path.resolve(__dirname,`images/${counter}.${matches[1]}.${matches[2]}`);
      const buffer = await response.buffer().catch((err: any) => { console.log(err) });
      fs.writeFileSync(fileName, buffer, 'base64');
    }
  });
  await page.goto(url);
  browser.close();
}

download(process.argv[2]);