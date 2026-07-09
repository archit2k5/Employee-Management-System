import { useState } from "react";
import "./LineChart.css";

/**
 * Simple responsive line chart.
 * data: [{ label, value, highlight?, tooltip? }]
 * yTicks: array of numbers to show on left axis (top to bottom)
 */
export default function LineChart({ data, yTicks, height = 220, color = "var(--accent-blue)", valueFormatter }) {
  const [hoverIdx, setHoverIdx] = useState(null);

  const width = 600;
  const padding = { top: 10, right: 10, bottom: 24, left: 36 };
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;

  const maxTick = Math.max(...yTicks);
  const minTick = Math.min(...yTicks);

  const xStep = innerW / (data.length - 1);
  const yFor = (v) => padding.top + innerH - ((v - minTick) / (maxTick - minTick)) * innerH;
  const xFor = (i) => padding.left + i * xStep;

  const points = data.map((d, i) => `${xFor(i)},${yFor(d.value)}`).join(" ");
  const areaPoints = `${padding.left},${padding.top + innerH} ${points} ${padding.left + innerW},${padding.top + innerH}`;

  const activeIdx = hoverIdx ?? data.findIndex((d) => d.highlight);

  return (
    <div className="linechart">
      <svg viewBox={`0 0 ${width} ${height}`} className="linechart-svg" preserveAspectRatio="none">
        {/* grid lines */}
        {yTicks.map((t) => (
          <line
            key={t}
            x1={padding.left}
            x2={width - padding.right}
            y1={yFor(t)}
            y2={yFor(t)}
            className="linechart-grid"
          />
        ))}

        <defs>
          <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>

        <polygon points={areaPoints} fill="url(#lineFill)" stroke="none" />
        <polyline points={points} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />

        {activeIdx >= 0 && (
          <line
            x1={xFor(activeIdx)}
            x2={xFor(activeIdx)}
            y1={padding.top}
            y2={padding.top + innerH}
            className="linechart-cursor"
          />
        )}

        {data.map((d, i) => (
          <circle
            key={d.label}
            cx={xFor(i)}
            cy={yFor(d.value)}
            r={i === activeIdx ? 5 : 3.5}
            className="linechart-dot"
            onMouseEnter={() => setHoverIdx(i)}
            onMouseLeave={() => setHoverIdx(null)}
          />
        ))}

        {yTicks.map((t) => (
          <text key={t} x={padding.left - 8} y={yFor(t) + 4} className="linechart-ytick" textAnchor="end">
            {valueFormatter ? valueFormatter(t) : t}
          </text>
        ))}

        {data.map((d, i) => (
          <text key={d.label} x={xFor(i)} y={height - 4} className="linechart-xtick" textAnchor="middle">
            {d.label}
          </text>
        ))}
      </svg>

      {activeIdx >= 0 && (
        <div
          className="linechart-tooltip"
          style={{
            left: `${(xFor(activeIdx) / width) * 100}%`,
            top: `${(yFor(data[activeIdx].value) / height) * 100}%`,
          }}
        >
          <div className="linechart-tooltip-label">{data[activeIdx].label}</div>
          <div className="linechart-tooltip-value">
            {data[activeIdx].tooltip || `Total : ${data[activeIdx].value}`}
          </div>
        </div>
      )}
    </div>
  );
}
