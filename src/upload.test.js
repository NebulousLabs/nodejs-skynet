const axios = require("axios");

const { uploadDirectory, uploadFile } = require("../index");
const { uriSkynetPrefix } = require("../index");

jest.mock("axios");

const portalUrl = "https://siasky.net";
const skylink = "XABvi7JtJbQSMAcDwnUnmp2FKDPjg8_tTTFP4BwMSxVdEg";

describe("uploadFile", () => {
  const filename = "testdata/file1.txt";

  beforeEach(() => {
    axios.mockResolvedValue({ data: { skylink } });
  });

  it("should send post request to default portal", () => {
    uploadFile(filename);

    expect(axios).toHaveBeenCalledWith(
      expect.objectContaining({
        url: `${portalUrl}/skynet/skyfile`,
        data: expect.objectContaining({
          _streams: expect.arrayContaining([
            expect.stringContaining(`Content-Disposition: form-data; name="file"; filename="file1.txt"`),
          ]),
        }),
        headers: expect.anything(),
        params: expect.anything(),
      })
    );
  });

  it("should use custom upload options if defined", () => {
    uploadFile(filename, {
      portalUrl: "https://localhost",
      endpointPath: "/skynet/file",
      portalFileFieldname: "filetest",
      customFilename: "test.jpg",
      dryRun: true,
    });

    expect(axios).toHaveBeenCalledWith(
      expect.objectContaining({
        url: `https://localhost/skynet/file`,
        data: expect.objectContaining({
          _streams: expect.arrayContaining([
            expect.stringContaining('Content-Disposition: form-data; name="filetest"; filename="test.jpg"'),
          ]),
        }),
        headers: expect.anything(),
        params: { dryrun: true },
      })
    );
  });

  it("should use custom connection options if defined", () => {
    uploadFile(filename, {
      APIKey: "foobar",
      customUserAgent: "Sia-Agent",
    });

    expect(axios).toHaveBeenCalledWith(
      expect.objectContaining({
        url: `${portalUrl}/skynet/skyfile`,
        data: expect.objectContaining({
          _streams: expect.arrayContaining([
            expect.stringContaining(`Content-Disposition: form-data; name="file"; filename="file1.txt"`),
          ]),
        }),
        auth: { username: "", password: "foobar" },
        headers: { "User-Agent": "Sia-Agent" },
        params: expect.anything(),
      })
    );
  });

  it("should return skylink on success", async () => {
    const data = await uploadFile(filename);

    expect(data).toEqual(`${uriSkynetPrefix}${skylink}`);
  });

  it("should return skylink on success with dryRun", async () => {
    const data = await uploadFile(filename, { dryRun: true });

    expect(data).toEqual(`${uriSkynetPrefix}${skylink}`);
  });
});

describe("uploadDirectory", () => {
  const filename = "testdata";
  const directory = ["file1.txt", "file2.txt", "dir1/file3.txt"];

  beforeEach(() => {
    axios.mockResolvedValue({ data: { skylink } });
  });

  it("should send post request to default portal", () => {
    uploadDirectory(filename);

    for (const file of directory) {
      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          url: `${portalUrl}/skynet/skyfile`,
          data: expect.objectContaining({
            _streams: expect.arrayContaining([
              expect.stringContaining(`Content-Disposition: form-data; name="files[]"; filename="${file}"`),
            ]),
          }),
          headers: expect.anything(),
          params: { filename: filename },
        })
      );
    }
  });

  it("should use custom options if defined", () => {
    uploadDirectory(filename, {
      portalUrl: "http://localhost",
      endpointPath: "/skynet/file",
      portalDirectoryFileFieldname: "filetest",
      customFilename: "testpath",
      dryRun: true,
    });

    for (const file of directory) {
      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          url: `http://localhost/skynet/file`,
          data: expect.objectContaining({
            _streams: expect.arrayContaining([
              expect.stringContaining(`Content-Disposition: form-data; name="filetest"; filename="${file}"`),
            ]),
          }),
          headers: expect.anything(),
          params: {
            filename: "testpath",
            dryrun: true,
          },
        })
      );
    }
  });

  it("should return single skylink on success", async () => {
    const data = await uploadDirectory(filename);

    expect(data).toEqual(`${uriSkynetPrefix}${skylink}`);
  });

  it("should return single skylink on success with dryRun", async () => {
    const data = await uploadDirectory(filename, { dryRun: true });

    expect(data).toEqual(`${uriSkynetPrefix}${skylink}`);
  });
});
