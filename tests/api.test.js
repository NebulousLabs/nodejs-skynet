/*
  API integration tests.
*/

const skynet = require("../index");

const fs = require("fs");

const testfile = "./testfile";

describe("uploadAndDownloadFile", () => {
  const filename = "./testdata/file1.txt";
  const text = fs.readFileSync(filename);
  console.log(`Uploading file ${filename} containing data: '${text}'`);

  it("should upload and download, receiving the same data", (done) => {
    (async () => {
      const skylink = await skynet.UploadFile(filename, skynet.DefaultUploadOptions);
      expect(skylink.Equals(expect.stringContaining("sia://")));
      console.log(`Upload successful, skylink: ${skylink}`);

      await skynet.DownloadFile(testfile, skylink, skynet.DefaultDownloadOptions);
      console.log("Download successful");
      const data = fs.readFileSync(testfile);
      expect(data).toEqual(text);
      expect(data).toEqual("tet");

      done();
    })();
  });
});
