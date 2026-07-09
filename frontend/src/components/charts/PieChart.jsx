/**
 * Simple pie chart with outside labels.
 * data: [{ dept, value, color }]
 */
export default function PieChart({ data, size = 260 }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 4;

  let cumulative = 0;
  const slices = data.map((d) => {
    const startAngle = (cumulative / total) * 2 * Math.PI - Math.PI / 2;
    cumulative += d.value;
    const endAngle = (cumulative / total) * 2 * Math.PI - Math.PI / 2;

    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;

    const midAngle = (startAngle + endAngle) / 2;
    const labelR = r + 26;
    const labelX = cx + labelR * Math.cos(midAngle);
    const labelY = cy + labelR * Math.sin(midAngle);

    return {
      ...d,
      path: `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`,
      labelX,
      labelY,
      anchor: Math.cos(midAngle) > 0.15 ? "start" : Math.cos(midAngle) < -0.15 ? "end" : "middle",
    };
  });

  return (
    <svg viewBox={`0 0 ${size + 120} ${size + 20}`} className="piechart-svg">
      <g transform={`translate(60, 10)`}>
        {slices.map((s) => (
          <path key={s.dept} d={s.path} fill={s.color} className="piechart-slice" />
        ))}
        {slices.map((s) => (
          <text
            key={s.dept}
            x={s.labelX}
            y={s.labelY}
            textAnchor={s.anchor}
            className="piechart-label"
            fill={s.color}
          >
            {s.dept}: {s.value}
          </text>
        ))}
      </g>
    </svg>
  );
}
