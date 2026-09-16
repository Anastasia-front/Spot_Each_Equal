import * as Icons from "@/assets/icons";
import { G, Rect } from "react-native-svg";

import IconRenderer from "./IconRenderer";

type HexagonCardSymbolsProps = {
  card: any;
  centerX: number;
  centerY: number;
  disabled: boolean;
  onSymbolPress?: (symbol: any, symbolIndex: number) => void;
  selectedSymbols: Record<number, "selected" | "error" | "success">;
  size: number;
};

const HexagonCardSymbols = ({
  card,
  centerX,
  centerY,
  disabled,
  onSymbolPress,
  selectedSymbols,
  size,
}: HexagonCardSymbolsProps) => (
  <>
    {card.symbols.map((symbol: any, index: number) => {
      const radius = size * 0.5;
      const iconSize = size * (symbol.size ?? 0.2);
      const touchPadding = iconSize * 0.18;
      const outlineStatus = selectedSymbols[index];
      const outlineColor =
        outlineStatus === "success"
          ? "#2ECC71"
          : outlineStatus === "error"
            ? "#FF4D4F"
            : "#FFD43B";
      const x = centerX + symbol.position.x * (radius * 0.68);
      const y = centerY + symbol.position.y * (radius * 0.68);
      const maskId = `symbol-outline-${card.id}-${index}`;

      return (
        <G
          key={index}
          onPress={() => !disabled && onSymbolPress?.(symbol, index)}
          transform={`translate(${x}, ${y}) rotate(${symbol.rotation ?? 0}) translate(${-iconSize / 2}, ${-iconSize / 2})`}
        >
          <Rect
            x={-touchPadding}
            y={-touchPadding}
            width={iconSize + touchPadding * 2}
            height={iconSize + touchPadding * 2}
            fill="transparent"
          />
          <IconRenderer
            icon={Icons[symbol.icon as keyof typeof Icons]}
            color={symbol.color}
            size={iconSize}
            outlineColor={outlineStatus ? outlineColor : undefined}
            outlineWidth={Math.max(3, size * 0.012)}
            maskId={maskId}
          />
        </G>
      );
    })}
  </>
);

export default HexagonCardSymbols;
