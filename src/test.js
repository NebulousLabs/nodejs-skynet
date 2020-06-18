const axios = require("axios");
const FormData = require("form-data");
const { UploadDirectory, UploadFile } = require("./upload");

jest.mock("axios");

const portalUrl = "https://siasky.net";
const skylink = "XABvi7JtJbQSMAcDwnUnmp2FKDPjg8_tTTFP4BwMSxVdEg";

describe("upload", () => {
  const filename = "testdata/file1.jpeg";

  beforeEach(() => {
    axios.post.mockResolvedValue({ data: { skylink } });
  });

  it("should send post request with FormData", () => {
    UploadFile(filename);

    expect(axios.post).toHaveBeenCalledWith(
      `${portalUrl}/skynet/skyfile`,
      expect.objectContaining({
        _streams: expect.arrayContaining([
          expect.stringContaining(`Content-Disposition: form-data; name="file"; filename="file1.jpeg"`),
        ]),
      }),
      { headers: expect.anything() }
    );
  });

  it("should send custom options if defined", () => {
    UploadFile(filename, {
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

  it("should return sia url on success", async () => {
    const data = await UploadFile(filename);

    expect(data).toEqual("sia://" + skylink);
  });
});

describe("uploadDirectory", () => {
  const filename = "testdata";
  const directory = ["testdata/file1.jpeg", "testdata/file2.jpeg", "testdata/dir1/file3.jpeg"];

  beforeEach(() => {
    axios.post.mockResolvedValue({ data: { skylink } });
  });

  it("should send post request with FormData", () => {
    UploadDirectory(filename);

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

  it("should send custom options if defined", () => {
    UploadDirectory(filename, {
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
    const data = await UploadDirectory(filename);

    expect(data).toEqual("sia://" + skylink);
  });
});
