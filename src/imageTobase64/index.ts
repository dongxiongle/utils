import fs from 'fs';

const fileUrl = process.argv[2];
const imageToBase = (fileUrl: string) => {
  const imageData = fs.readFileSync(fileUrl, 'base64');
  return `data:image/png;base64,${imageData}`;
};
const base = imageToBase(fileUrl);
console.log(base);