/*
  API integration tests.
*/

const skynet = require("../index");

const fs = require("fs");

describe("uploadAndDownloadFile", () => {
  const src_file = "./testdata/file1.txt";
  const dst_file = "./dst.txt";
  const src_dir = "./src";

  it("should upload and download, receiving the same data", (done) => {
    (async () => {
      // upload file

      const text = fs.readFileSync(src_file);
      console.log(`Uploading file ${src_file} containing data: '${text}'`);

      const skylink = await skynet.UploadFile(src_file, skynet.DefaultUploadOptions);
      expect(skylink.Equals(expect.stringContaining(skynet.UriSkynetPrefix)));
      console.log(`Upload successful, skylink: ${skylink}`);

      // download file

      console.log(`Downloading to ${dst_file}`);
      const new_skylink = skylink.replace(skynet.UriSkynetPrefix, "");
      await skynet.DownloadFile(dst_file, new_skylink, skynet.DefaultDownloadOptions);
      const data = fs.readFileSync(dst_file);
      expect(data).toEqual(text);
      console.log("Download successful");

      // upload dir

      console.log(`Uploading dir ${src_dir}`);
      const dir_skylink = await skynet.UploadDirectory(src_dir);
      expect(skylink.Equals(expect.stringContaining(skynet.UriSkynetPrefix)));
      console.log(`Dir upload successful, skylink: ${dir_skylink}`);

      done();
    })();
  });
});
