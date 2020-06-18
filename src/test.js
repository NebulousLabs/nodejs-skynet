const axios = require("axios");
const { FormData } = require("form-data");
const { UploadFile } = require("./upload");

jest.mock("axios");

const portalUrl = "https://siasky.net";
const skylink = "XABvi7JtJbQSMAcDwnUnmp2FKDPjg8_tTTFP4BwMSxVdEg";

describe("upload", () => {
  const filename = "testdata/test";

  beforeEach(() => {
    axios.post.mockResolvedValue({ data: { skylink } });
  });

  it("should send post request with FormData", () => {
    UploadFile(filename);

    expect(axios.post).toHaveBeenCalledWith(`${portalUrl}/skynet/skyfile`, expect.any(FormData), undefined);
  });

  it("should send register onUploadProgress callback if defined", () => {
    UploadFile(filename, { onUploadProgress: jest.fn() });

    expect(axios.post).toHaveBeenCalledWith(`${portalUrl}/skynet/skyfile`, expect.any(FormData), {
      onUploadProgress: expect.any(Function),
    });
  });

  it("should return skylink on success", async () => {
    const data = await UploadFile(filename);

    expect(data).toEqual({ skylink });
  });
});
