

export default {
  expo: {
    name: "inspiration-flow",
    owner: "truestayhere",
    slug: "inspiration-flow",
    version: "0.0.1",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    extra: {
      eas: {
      },
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.truestayhere.inspirationflow"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF"
      },
      package: "com.truestayhere.inspirationflow"
    },
    web: {
      favicon: "./assets/favicon.png"
    },
  },
};