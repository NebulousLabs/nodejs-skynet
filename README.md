# Skynet NodeJS SDK

An SDK for integrating Skynet into Node.js applications.

## Installing

Using `npm`:

```sh
npm install @nebulous/skynet
```

Using `yarn`:

```sh
yarn add @nebulous/skynet
```

## Examples

### Uploading and downloading

```js
const skynet = require("@nebulous/skynet");

const fs = require("fs");

(async () => {
  // upload file

  const src_file = "./testdata/file1.txt";

  const text = fs.readFileSync(src_file);
  console.log(`Uploading file ${src_file} containing data: '${text}'`);

  const skylink = await skynet.uploadFile(src_file, skynet.DefaultUploadOptions);
  if (!skylink.includes(skynet.UriSkynetPrefix)) {
    console.log(`ERROR: invalid skylink returned: ${skylink}`);
    return;
  }
  console.log(`Upload successful, skylink: ${skylink}`);

  // download file

  const dst_file = "./dst.txt";

  console.log(`Downloading to ${dst_file}`);
  const new_skylink = skylink.replace(skynet.UriSkynetPrefix, "");
  await skynet.downloadFile(dst_file, new_skylink, skynet.DefaultDownloadOptions);
  const data = fs.readFileSync(dst_file);
  if (!data.equals(text)) {
    console.log(`ERROR: wrong data returned: ${data}`);
    return;
  }
  console.log("Download successful");

  // upload dir

  const src_dir = "./src";

  console.log(`Uploading dir ${src_dir}`);
  const dir_skylink = await skynet.uploadDirectory(src_dir);
  if (!dir_skylink.includes(skynet.UriSkynetPrefix)) {
    console.log(`ERROR: invalid skylink returned: ${dir_skylink}`);
    return;
  }
  console.log(`Dir upload successful, skylink: ${dir_skylink}`);
})();
```
