import { Dimensions, PixelRatio } from "react-native";

const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

export const { width: screenWidth, height: screenHeight } =
  Dimensions.get("window");

export const shortestSide = Math.min(screenWidth, screenHeight);
export const longestSide = Math.max(screenWidth, screenHeight);
export const isTablet = shortestSide >= 768;

export const vw = (percent: number) => (screenWidth * percent) / 100;
export const vh = (percent: number) => (screenHeight * percent) / 100;

export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const rs = (value: number, min = value * 0.82, max = value * 1.28) => {
  const scale = Math.min(screenWidth / BASE_WIDTH, screenHeight / BASE_HEIGHT);
  return clamp(value * scale, min, max);
};

export const rf = (value: number, min = value * 0.86, max = value * 1.22) =>
  Math.round(PixelRatio.roundToNearestPixel(rs(value, min, max)));

export const getModeCardSize = ({
  heightRatio,
  max,
  min,
  rail = true,
  widthRatio,
}: {
  heightRatio: number;
  max: number;
  min: number;
  rail?: boolean;
  widthRatio: number;
}) => {
  const railSpace = rail ? rs(92, 76, 118) : 0;
  const widthLimit = (screenWidth - railSpace) * widthRatio;
  const heightLimit = screenHeight * heightRatio;

  return clamp(
    Math.min(widthLimit, heightLimit),
    min,
    isTablet ? max * 1.25 : max,
  );
};
