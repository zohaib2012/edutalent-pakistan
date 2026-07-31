const TrendChart = ({ data = [], width = 560, height = 180 }) => {
  const pts = Array.isArray(data) ? data : [];
  if (pts.length === 0) {
    return (
      <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
        <span className="text-gray-400 text-sm">No registrations in the last 14 days</span>
      </div>
    );
  }

  const padX = 10;
  const padY = 20;
  const max = Math.max(...pts.map((d) => d.value), 1);
  const stepX = (width - padX * 2) / Math.max(pts.length - 1, 1);

  const points = pts.map((d, i) => ({
    x: padX + i * stepX,
    y: padY + (height - padY * 2) * (1 - d.value / max),
    ...d,
  }));

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - padY} L ${points[0].x} ${height - padY} Z`;
  const id = `trend-${width}-${height}-${pts.length}`;

  return (
    <div className="w-full overflow-hidden">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ maxHeight: height + 30 }}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1A73E8" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#1A73E8" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={f} x1={padX} x2={width - padX} y1={padY + (height - padY * 2) * f} y2={padY + (height - padY * 2) * f} stroke="#F3F4F6" strokeWidth="1" />
        ))}
        <path d={areaPath} fill={`url(#${id})`} />
        <path d={linePath} fill="none" stroke="#1A73E8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="3.5" fill="#1A73E8" stroke="#fff" strokeWidth="1.5" />
            {pts.length <= 14 && (
              <text x={p.x} y={height - 4} textAnchor="middle" fontSize="9" fill="#9CA3AF">
                {new Date(p.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};

export default TrendChart;
