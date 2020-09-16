const axios = require("axios");
const tmp = require("tmp");

const { SkynetClient, defaultPortalUrl } = require("../index");

jest.mock("axios");

const portalUrl = defaultPortalUrl();
const skylink = "XABvi7JtJbQSMAcDwnUnmp2FKDPjg8_tTTFP4BwMSxVdEg";
const client = new SkynetClient();

describe("download", () => {
  const body = "asdf";

  beforeEach(() => {
    axios.mockResolvedValue({ data: { body, pipe: function () {} } });
  });

  it("should send get request to default portal", () => {
    const tmpFile = tmp.fileSync();

    client.downloadFile(tmpFile.name, skylink);

    expect(axios).toHaveBeenCalledWith(
      expect.objectContaining({
        url: `${portalUrl}/${skylink}`,
        method: "get",
        responseType: "stream",
      })
    );

    tmpFile.removeCallback();
  });

  it("should use custom options if defined", () => {
    const tmpFile = tmp.fileSync();

    client.downloadFile(tmpFile.name, skylink, {
      portalUrl: "http://localhost",
    });

    expect(axios).toHaveBeenCalledWith(
      expect.objectContaining({
        url: `http://localhost/${skylink}`,
        method: "get",
        responseType: "stream",
      })
    );

    tmpFile.removeCallback();
  });

  it("should use custom connection options if defined on the client", () => {
    const tmpFile = tmp.fileSync();
    const client = new SkynetClient("", { APIKey: "foobar", customUserAgent: "Sia-Agent" });

    client.downloadFile(tmpFile.name, skylink, { APIKey: "barfoo", customUserAgent: "Sia-Agent-2" });

    expect(axios).toHaveBeenCalledWith(
      expect.objectContaining({
        url: `${portalUrl}/${skylink}`,
        auth: { username: "", password: "barfoo" },
        headers: expect.objectContaining({ "User-Agent": "Sia-Agent-2" }),
      })
    );

    tmpFile.removeCallback();
  });
});
