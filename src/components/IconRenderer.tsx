import React from "react";
import { G, Mask, Rect, Image as SvgImage } from "react-native-svg";

interface IconRendererProps {
  icon: number;
  size: number;
  rotation?: number;
  color?: string; // for monochrome / tint overlay
}

const IconRenderer: React.FC<IconRendererProps> = ({
  icon,
  size,
  rotation = 0,
  color,
}) => {
  const halfSize = size / 2;

  if (!color) {
    return (
      <SvgImage
        href={icon}
        width={size}
        height={size}
        x={-halfSize}
        y={-halfSize}
        transform={`rotate(${rotation})`}
        preserveAspectRatio="xMidYMid meet"
      />
    );
  }

  // Apply monochrome tint overlay
  return (
    <G transform={`rotate(${rotation})`}>
      <Mask id="icon-mask">
        <SvgImage
          href={icon}
          width={size}
          height={size}
          x={-halfSize}
          y={-halfSize}
          preserveAspectRatio="xMidYMid meet"
        />
      </Mask>
      <Rect
        x={-halfSize}
        y={-halfSize}
        width={size}
        height={size}
        fill={color}
        mask="url(#icon-mask)"
      />
    </G>
  );
};

export default IconRenderer;
