/* eslint-disable no-unused-vars */

const { defaultOptions } = require("./utils");
const { SkynetClient } = require("./client");

const defaultAddSkykeyOptions = {
  ...defaultOptions("/skynet/addskykey"),
};

const defaultCreateSkykeyOptions = {
  ...defaultOptions("/skynet/createskykey"),
};

const defaultGetSkykeyOptions = {
  ...defaultOptions("/skynet/skykey"),
};

const defaultGetSkykeysOptions = {
  ...defaultOptions("/skynet/skykeys"),
};

SkynetClient.prototype.addSkykey = function (skykey, customOptions = {}) {
  const opts = { ...defaultAddSkykeyOptions, ...this.customOptions, ...customOptions };

  throw new Error("Unimplemented");
};

SkynetClient.prototype.createSkykey = function (skykeyName, skykeyType, customOptions = {}) {
  const opts = { ...defaultCreateSkykeyOptions, ...this.customOptions, ...customOptions };

  throw new Error("Unimplemented");
};

SkynetClient.prototype.getSkykeyById = function (skykeyId, customOptions = {}) {
  const opts = { ...defaultGetSkykeyOptions, ...this.customOptions, ...customOptions };

  throw new Error("Unimplemented");
};

SkynetClient.prototype.getSkykeyByName = function (skykeyName, customOptions = {}) {
  const opts = { ...defaultGetSkykeyOptions, ...this.customOptions, ...customOptions };

  throw new Error("Unimplemented");
};

SkynetClient.prototype.getSkykeys = function (customOptions = {}) {
  const opts = { ...defaultGetSkykeysOptions, ...this.customOptions, ...customOptions };

  throw new Error("Unimplemented");
};
