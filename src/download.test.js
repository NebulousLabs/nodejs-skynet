const axios = require("axios");
const { DownloadFile } = require("./download");

jest.mock("axios");

const portalUrl = "https://siasky.net";
const skylink = "XABvi7JtJbQSMAcDwnUnmp2FKDPjg8_tTTFP4BwMSxVdEg";

describe("download", () => {
  const filename = "testfile";
  const body = "asdf";

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: { body, pipe: function () {} } });
  });

  it("should send get request to default portal", () => {
    DownloadFile(filename, skylink);

    expect(axios.get).toHaveBeenCalledWith(`${portalUrl}/${skylink}`, { responseType: "stream" });
  });

  it("should use custom options if defined", () => {
    DownloadFile(filename, skylink, {
      portalUrl: "localhost",
    });

    expect(axios.get).toHaveBeenCalledWith(`localhost/${skylink}`, { responseType: "stream" });
  });
});
