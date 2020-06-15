const axios = require("axios");
const upload = require("./upload");

jest.mock("axios");

const portalUrl = "https://siasky.net";
const skylink = "XABvi7JtJbQSMAcDwnUnmp2FKDPjg8_tTTFP4BwMSxVdEg";

describe("upload", () => {
  const filename = "image.jpeg";
  const blob = new Blob([], { type: "image/jpeg" });
  const file = new File([blob], filename);

  beforeEach(() => {
    axios.post.mockResolvedValue({ data: { skylink } });
  });

  it("should send post request with FormData", () => {
    upload(portalUrl, file);

    expect(axios.post).toHaveBeenCalledWith(`${portalUrl}/skynet/skyfile`, expect.any(FormData), undefined);
  });

  it("should send register onUploadProgress callback if defined", () => {
    upload(portalUrl, file, { onUploadProgress: jest.fn() });

    expect(axios.post).toHaveBeenCalledWith(`${portalUrl}/skynet/skyfile`, expect.any(FormData), {
      onUploadProgress: expect.any(Function),
    });
  });

  it("should return skylink on success", async () => {
    const data = await upload(portalUrl, file);

    expect(data).toEqual({ skylink });
  });
});
