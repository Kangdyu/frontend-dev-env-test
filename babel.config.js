module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          chrome: "88",
          ie: "11",
        },
        useBuiltIns: "usage",
        corejs: {
          version: 3,
        },
      },
    ],
  ],
};
