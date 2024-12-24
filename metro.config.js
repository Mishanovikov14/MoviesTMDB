// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
// config.resolver.assetExts.push("cjs")

config.resolver.sourceExts = process.env.RN_SRC_EXT
  ? [...process.env.RN_SRC_EXT.split(",").concat(config.resolver.sourceExts), "cjs"] // <-- cjs added here
  : [...config.resolver.sourceExts, "cjs"]; // <-- cjs added here

module.exports = config;
