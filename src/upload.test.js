const axios = require("axios");
const fs = require("fs");
const tmp = require("tmp");

const { SkynetClient, defaultPortalUrl, uriSkynetPrefix } = require("../index");

jest.mock("axios");

const portalUrl = defaultPortalUrl();
const skylink = "XABvi7JtJbQSMAcDwnUnmp2FKDPjg8_tTTFP4BwMSxVdEg";
const sialink = `${uriSkynetPrefix}${skylink}`;
const client = new SkynetClient();

describe("uploadFile", () => {
  const filename = "testdata/file1.txt";

  beforeEach(() => {
    axios.mockResolvedValue({ data: { skylink } });
  });

  it("should send post request to default portal", () => {
    client.uploadFile(filename);

    expect(axios).toHaveBeenCalledWith(
      expect.objectContaining({
        url: `${portalUrl}/skynet/skyfile`,
        data: expect.objectContaining({
          _streams: expect.arrayContaining([
            expect.stringContaining(
              'Content-Disposition: form-data; name="file"; filename="file1.txt"\r\nContent-Type: text/plain'
            ),
          ]),
        }),
        headers: expect.objectContaining({ "content-type": expect.stringContaining("multipart/form-data") }),
        params: expect.anything(),
      })
    );
  });

  it("should use custom upload options if defined", () => {
    client.uploadFile(filename, {
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

  it("should use custom connection options if defined on the client", () => {
    const client = new SkynetClient("", { APIKey: "foobar", customUserAgent: "Sia-Agent" });

    client.uploadFile(filename);

    expect(axios).toHaveBeenCalledWith(
      expect.objectContaining({
        url: `${portalUrl}/skynet/skyfile`,
        data: expect.objectContaining({
          _streams: expect.arrayContaining([
            expect.stringContaining(`Content-Disposition: form-data; name="file"; filename="file1.txt"`),
          ]),
        }),
        auth: { username: "", password: "foobar" },
        headers: expect.objectContaining({ "User-Agent": "Sia-Agent" }),
        params: expect.anything(),
      })
    );
  });

  it("should use custom connection options if defined on the API call", () => {
    const client = new SkynetClient("", { APIKey: "foobar", customUserAgent: "Sia-Agent" });

    client.uploadFile(filename, { APIKey: "barfoo", customUserAgent: "Sia-Agent-2" });

    expect(axios).toHaveBeenCalledWith(
      expect.objectContaining({
        url: `${portalUrl}/skynet/skyfile`,
        data: expect.objectContaining({
          _streams: expect.arrayContaining([
            expect.stringContaining(`Content-Disposition: form-data; name="file"; filename="file1.txt"`),
          ]),
        }),
        auth: { username: "", password: "barfoo" },
        headers: expect.objectContaining({ "User-Agent": "Sia-Agent-2" }),
        params: expect.anything(),
      })
    );
  });

  it("should upload tmp files", async () => {
    const file = tmp.fileSync({ postfix: ".json" });
    fs.writeFileSync(file.fd, JSON.stringify("testing"));

    const data = await client.uploadFile(file.name);

    expect(data).toEqual(sialink);
  });

  it("should return skylink on success", async () => {
    const data = await client.uploadFile(filename);

    expect(data).toEqual(sialink);
  });

  it("should return skylink on success with dryRun", async () => {
    const data = await client.uploadFile(filename, { dryRun: true });

    expect(data).toEqual(sialink);
  });
});

describe("uploadDirectory", () => {
  const dirname = "testdata";
  const directory = ["file1.txt", "file2.txt", "dir1/file3.txt"];

  beforeEach(() => {
    axios.mockResolvedValue({ data: { skylink } });
  });

  it("should send post request to default portal", () => {
    client.uploadDirectory(dirname);

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
          params: { filename: dirname },
        })
      );
    }
  });

  it("should use custom options if defined", () => {
    client.uploadDirectory(dirname, {
      portalUrl: "http://localhost",
      endpointPath: "/skynet/file",
      portalDirectoryFileFieldname: "filetest",
      customDirname: "/testpath",
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
    const data = await client.uploadDirectory(dirname);

    expect(data).toEqual(sialink);
  });

  it("should return single skylink on success with dryRun", async () => {
    const data = await client.uploadDirectory(dirname, { dryRun: true });

    expect(data).toEqual(sialink);
  });
});
