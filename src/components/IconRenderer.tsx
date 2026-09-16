import * as Icons from "@/assets/icons";
import {
  Defs,
  G,
  Image as SvgImage,
  Mask,
  Rect,
} from "react-native-svg";

interface IconRendererProps {
  icon: (typeof Icons)[keyof typeof Icons];
  size: number;
  color?: string;
  outlineColor?: string;
  outlineWidth?: number;
  maskId?: string;
}

const OUTLINE_OFFSETS = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
  [-0.7, -0.7],
  [0.7, -0.7],
  [-0.7, 0.7],
  [0.7, 0.7],
];

const IconRenderer = ({
  icon,
  size,
  outlineColor,
  outlineWidth = 4,
  maskId,
}: IconRendererProps) => {
  const shouldOutline = Boolean(outlineColor && maskId);
  const outlineMasks = shouldOutline
    ? OUTLINE_OFFSETS.map(([x, y], index) => ({
        id: `${maskId}-${index}`,
        x: x * outlineWidth,
        y: y * outlineWidth,
      }))
    : [];

  return (
    <G>
      {shouldOutline && (
        <Defs>
          {outlineMasks.map((mask) => (
            <Mask
              key={mask.id}
              id={mask.id}
              x={mask.x}
              y={mask.y}
              width={size}
              height={size}
              maskUnits="userSpaceOnUse"
            >
              <SvgImage
                href={icon}
                x={mask.x}
                y={mask.y}
                width={size}
                height={size}
                preserveAspectRatio="xMidYMid meet"
              />
            </Mask>
          ))}
        </Defs>
      )}

      {shouldOutline &&
        outlineMasks.map((mask) => (
          <Rect
            key={mask.id}
            x={mask.x}
            y={mask.y}
            width={size}
            height={size}
            fill={outlineColor}
            mask={`url(#${mask.id})`}
          />
        ))}

      <SvgImage
        href={icon}
        width={size}
        height={size}
        preserveAspectRatio="xMidYMid meet"
      />
    </G>
  );
};

export default IconRenderer;
