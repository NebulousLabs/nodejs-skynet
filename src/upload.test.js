const axios = require("axios");

const { uploadDirectory, uploadFile } = require("./upload");
const { uriSkynetPrefix } = require("./utils");

jest.mock("axios");

const portalUrl = "https://siasky.net";
const skylink = "XABvi7JtJbQSMAcDwnUnmp2FKDPjg8_tTTFP4BwMSxVdEg";

describe("uploadFile", () => {
  const filename = "testdata/file1.txt";

  beforeEach(() => {
    axios.post.mockResolvedValue({ data: { skylink } });
  });

  it("should send post request to default portal", () => {
    uploadFile(filename);

    expect(axios.post).toHaveBeenCalledWith(
      `${portalUrl}/skynet/skyfile`,
      expect.objectContaining({
        _streams: expect.arrayContaining([
          expect.stringContaining(`Content-Disposition: form-data; name="file"; filename="file1.txt"`),
        ]),
      }),
      { headers: expect.anything() }
    );
  });

  it("should use custom options if defined", () => {
    uploadFile(filename, {
      portalUrl: "localhost",
      portalUploadPath: "/skynet/file",
      portalFileFieldname: "filetest",
      customFilename: "test.jpg",
    });

    expect(axios.post).toHaveBeenCalledWith(
      `localhost/skynet/file`,
      expect.objectContaining({
        _streams: expect.arrayContaining([
          expect.stringContaining('Content-Disposition: form-data; name="filetest"; filename="test.jpg"'),
        ]),
      }),
      { headers: expect.anything() }
    );
  });

  it("should return skylink on success", async () => {
    const data = await uploadFile(filename);

    expect(data).toEqual(`${uriSkynetPrefix}${skylink}`);
  });
});

describe("uploadDirectory", () => {
  const filename = "testdata";
  const directory = ["file1.txt", "file2.txt", "dir1/file3.txt"];

  beforeEach(() => {
    axios.post.mockResolvedValue({ data: { skylink } });
  });

  it("should send post request to default portal", () => {
    uploadDirectory(filename);

    for (const file of directory) {
      expect(axios.post).toHaveBeenCalledWith(
        `${portalUrl}/skynet/skyfile?filename=${filename}`,
        expect.objectContaining({
          _streams: expect.arrayContaining([
            expect.stringContaining(`Content-Disposition: form-data; name="files[]"; filename="${file}"`),
          ]),
        }),
        { headers: expect.anything() }
      );
    }
  });

  it("should use custom options if defined", () => {
    uploadDirectory(filename, {
      portalUrl: "localhost",
      portalUploadPath: "/skynet/file",
      portalDirectoryFileFieldname: "filetest",
      customFilename: "testpath",
    });

    for (const file of directory) {
      expect(axios.post).toHaveBeenCalledWith(
        `localhost/skynet/file?filename=testpath`,
        expect.objectContaining({
          _streams: expect.arrayContaining([
            expect.stringContaining(`Content-Disposition: form-data; name="filetest"; filename="${file}"`),
          ]),
        }),
        { headers: expect.anything() }
      );
    }
  });

  it("should return single skylink on success", async () => {
    const data = await uploadDirectory(filename);

    expect(data).toEqual(`${uriSkynetPrefix}${skylink}`);
  });
});
