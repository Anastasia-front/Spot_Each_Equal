export function getRoundedHexagonPath(size: number): string {
  const inset = size * 0.06;
  const radius = size * 0.5 - inset;
  const cornerRadius = size * 0.035;
  const center = size / 2;
  const points = Array.from({ length: 6 }, (_, i) => {
    const angle = i * 60 * (Math.PI / 180);
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  });

  return points
    .map((point, index) => {
      const previous = points[(index + points.length - 1) % points.length];
      const next = points[(index + 1) % points.length];
      const previousAngle = Math.atan2(
        previous.y - point.y,
        previous.x - point.x,
      );
      const nextAngle = Math.atan2(next.y - point.y, next.x - point.x);
      const start = {
        x: point.x + Math.cos(previousAngle) * cornerRadius,
        y: point.y + Math.sin(previousAngle) * cornerRadius,
      };
      const end = {
        x: point.x + Math.cos(nextAngle) * cornerRadius,
        y: point.y + Math.sin(nextAngle) * cornerRadius,
      };

      return `${index === 0 ? "M" : "L"} ${start.x} ${start.y} Q ${point.x} ${point.y} ${end.x} ${end.y}`;
    })
    .join(" ")
    .concat(" Z");
}
