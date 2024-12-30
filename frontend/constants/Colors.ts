/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#000000",
    background: "#EBE4E7",
    tint: tintColorLight,
    icon: "#000000",
    highlighted: "#E0A5BD",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    item: "rgba(255, 255, 255, 0.4)",
    border: "rgba(4, 4, 4, 0.09)",
  },
  dark: {
    text: "#ffffff",
    background: "#18171a",
    tint: tintColorDark,
    icon: "#ffffff",
    highlighted: "#6A1E55",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorDark,
    item: "#231f29",
    border: "rgba(255, 255, 255, 0.4)",
  },
};
