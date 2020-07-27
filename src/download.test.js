const axios = require("axios");
const tmp = require("tmp");

const { downloadFile } = require("../index");

jest.mock("axios");

const portalUrl = "https://siasky.net";
const skylink = "XABvi7JtJbQSMAcDwnUnmp2FKDPjg8_tTTFP4BwMSxVdEg";

describe("download", () => {
  const body = "asdf";

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: { body, pipe: function () {} } });
  });

  it("should send get request to default portal", () => {
    const tmpFile = tmp.fileSync();
    downloadFile(tmpFile.name, skylink);

    expect(axios.get).toHaveBeenCalledWith(`${portalUrl}/${skylink}`, { responseType: "stream" });
    tmpFile.removeCallback();
  });

  it("should use custom options if defined", () => {
    const tmpFile = tmp.fileSync();
    downloadFile(tmpFile.name, skylink, {
      portalUrl: "http://localhost",
    });

    expect(axios.get).toHaveBeenCalledWith(`http://localhost/${skylink}`, { responseType: "stream" });
    tmpFile.removeCallback();
  });
});
