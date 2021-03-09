interface Info {
  ak: string;
  sk: string;
  bucket: string;
  baseUrl: string;
};
const buckInfo: Record<string, Info> = {
  "test": {
    ak: 'xxxx',
    sk: 'xxxx',
    bucket: 'xxxx',
    baseUrl: 'https://xxxx.com'
  }
};

export default buckInfo;
