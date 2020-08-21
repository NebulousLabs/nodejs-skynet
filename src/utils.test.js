const { defaultPortalUrl, makeUrl, trimSiaPrefix, uriSkynetPrefix } = require("./utils.js");

const portalUrl = defaultPortalUrl();
const skylink = "XABvi7JtJbQSMAcDwnUnmp2FKDPjg8_tTTFP4BwMSxVdEg";

describe("makeUrl", () => {
  it("should return correctly formed URLs", () => {
    expect(makeUrl(portalUrl, "/")).toEqual(`${portalUrl}/`);
    expect(makeUrl(portalUrl, "/skynet")).toEqual(`${portalUrl}/skynet`);
    expect(makeUrl(portalUrl, "/skynet/")).toEqual(`${portalUrl}/skynet/`);

    expect(makeUrl(portalUrl, "/", skylink)).toEqual(`${portalUrl}/${skylink}`);
    expect(makeUrl(portalUrl, "/skynet", skylink)).toEqual(`${portalUrl}/skynet/${skylink}`);
    expect(makeUrl(portalUrl, "//skynet/", skylink)).toEqual(`${portalUrl}/skynet/${skylink}`);
  });
});

describe("trimSiaPrefix", () => {
  it("should correctly trim the sia prefix", () => {
    expect(trimSiaPrefix(skylink)).toEqual(skylink);
    expect(trimSiaPrefix(`${uriSkynetPrefix}${skylink}`)).toEqual(skylink);
  });
});
