import fs from 'fs';

const fileUrl = process.argv[2];
const imageToBase = (fileUrl: string) => {
  const imageData = fs.readFileSync(fileUrl);
  const imageBase64 = imageData.toString('base64');
  fs.writeFileSync('./url.txt', `data:image/png;base64,${imageBase64}`);
};
imageToBase(fileUrl);