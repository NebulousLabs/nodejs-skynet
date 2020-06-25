const axios = require("axios");
const tmp = require("tmp");

const { downloadFile } = require("./download");

jest.mock("axios");

const portalUrl = "https://siasky.net";
const skylink = "XABvi7JtJbQSMAcDwnUnmp2FKDPjg8_tTTFP4BwMSxVdEg";
const tmpFile = tmp.fileSync();

describe("download", () => {
  const dst_file = tmpFile.name;
  const body = "asdf";

  axios.get.mockResolvedValue({ data: { body, pipe: function () {} } });

  it("should send get request to default portal", () => {
    downloadFile(dst_file, skylink);

    expect(axios.get).toHaveBeenCalledWith(`${portalUrl}/${skylink}`, { responseType: "stream" });
  });

  it("should use custom options if defined", () => {
    downloadFile(dst_file, skylink, {
      portalUrl: "localhost",
    });

    expect(axios.get).toHaveBeenCalledWith(`localhost/${skylink}`, { responseType: "stream" });
  });
});

tmpFile.removeCallback();
