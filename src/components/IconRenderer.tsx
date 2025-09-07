// import React from "react";
// import { G, Mask, Rect, Image as SvgImage } from "react-native-svg";
import * as Icons from "@/assets/icons";

interface IconRendererProps {
  icon: (typeof Icons)[keyof typeof Icons];
  size: number;
  rotation?: number;
  color?: string; // for monochrome / tint overlay
}

// const IconRenderer: React.FC<IconRendererProps> = ({
//   icon,
//   size,
//   rotation = 0,
//   color,
// }) => {
//   const halfSize = size / 2;

//   if (!color) {
//     return (
//       <SvgImage
//         href={icon}
//         width={size}
//         height={size}
//         x={-halfSize}
//         y={-halfSize}
//         transform={`rotate(${rotation})`}
//         preserveAspectRatio="xMidYMid meet"
//       />
//     );
//   }

//   // Apply monochrome tint overlay
//   return (
//     <G transform={`rotate(${rotation})`}>
//       <Mask id="icon-mask">
//         <SvgImage
//           href={icon}
//           width={size}
//           height={size}
//           x={-halfSize}
//           y={-halfSize}
//           preserveAspectRatio="xMidYMid meet"
//         />
//       </Mask>
//       <Rect
//         x={-halfSize}
//         y={-halfSize}
//         width={size}
//         height={size}
//         fill={color}
//         mask="url(#icon-mask)"
//       />
//     </G>
//   );
// };

// export default IconRenderer;

// import { Image } from "react-native";
import { Image as SvgImage } from "react-native-svg";

const IconRenderer = ({ icon, size, rotation = 0 }: IconRendererProps) => (
  <SvgImage
    href={icon} // important: use `href` for react-native-svg
    width={size}
    height={size}
    transform={`rotate(${rotation})`}
    preserveAspectRatio="xMidYMid meet"
  />
  // <Image
  //   source={icon}
  //   style={{
  //     width: size,
  //     height: size,
  //     transform: [{ rotate: `${rotation}deg` }],
  //   }}
  //   resizeMode="contain"
  // />
);

export default IconRenderer;
