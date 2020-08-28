const { SkynetClient } = require("./index");

describe("SkynetClient", () => {
  it("should contain all api methods", () => {
    const client = new SkynetClient();

    // Download
    expect(client).toHaveProperty("downloadFile");
    expect(client).toHaveProperty("metadata");

    // Encryption
    expect(client).toHaveProperty("addSkykey");
    expect(client).toHaveProperty("createSkykey");
    expect(client).toHaveProperty("getSkykeyById");
    expect(client).toHaveProperty("getSkykeyByName");
    expect(client).toHaveProperty("getSkykeys");

    // Upload
    expect(client).toHaveProperty("uploadFile");
    expect(client).toHaveProperty("uploadDirectory");
  });
});
