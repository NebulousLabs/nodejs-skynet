const axios = require("axios");
const { DownloadFile } = require("./download");

jest.mock("axios");

const portalUrl = "https://siasky.net";
const skylink = "XABvi7JtJbQSMAcDwnUnmp2FKDPjg8_tTTFP4BwMSxVdEg";

describe("download", () => {
  const dst_file = "./dst.txt";
  const body = "asdf";

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: { body, pipe: function () {} } });
  });

  it("should send get request to default portal", () => {
    DownloadFile(dst_file, skylink);

    expect(axios.get).toHaveBeenCalledWith(`${portalUrl}/${skylink}`, { responseType: "stream" });
  });

  it("should use custom options if defined", () => {
    DownloadFile(dst_file, skylink, {
      portalUrl: "localhost",
    });

    expect(axios.get).toHaveBeenCalledWith(`localhost/${skylink}`, { responseType: "stream" });
  });
});
