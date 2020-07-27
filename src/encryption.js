/* eslint-disable no-unused-vars */

const { defaultOptions } = require("./utils");

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

function addSkykey(skykey, customOptions = {}) {
  const opts = { ...defaultAddSkykeyOptions, ...customOptions };

  throw new Error("Unimplemented");
}

function createSkykey(skykeyName, skykeyType, customOptions = {}) {
  const opts = { ...defaultCreateSkykeyOptions, ...customOptions };

  throw new Error("Unimplemented");
}

function getSkykeyById(skykeyId, customOptions = {}) {
  const opts = { ...defaultGetSkykeyOptions, ...customOptions };

  throw new Error("Unimplemented");
}

function getSkykeyByName(skykeyName, customOptions = {}) {
  const opts = { ...defaultGetSkykeyOptions, ...customOptions };

  throw new Error("Unimplemented");
}

function getSkykeys(customOptions = {}) {
  const opts = { ...defaultGetSkykeysOptions, ...customOptions };

  throw new Error("Unimplemented");
}

module.exports = {
  addSkykey,
  createSkykey,
  getSkykeyById,
  getSkykeyByName,
  getSkykeys,
};
