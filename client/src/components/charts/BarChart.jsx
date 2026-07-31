const COLORS = ['#1A73E8', '#2ECC71', '#F1C40F', '#9B59B6', '#E67E22', '#E74C3C', '#16A085', '#3498DB', '#95A5A6', '#D35400'];

const BarChart = ({ data = [], height = 180 }) => {
  if (!data || data.length === 0) {
    return (
      <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
        <span className="text-gray-400 text-sm">No data available</span>
      </div>
    );
  }
  const max = Math.max(...data.map((d) => d.value), 1);
  const barMaxHeight = height - 42;
  return (
    <div className="flex items-end gap-3" style={{ height: `${height + 6}px` }}>
      {data.map((d, i) => {
        const h = Math.max((d.value / max) * barMaxHeight, 4);
        return (
          <div key={i} className="flex-1 flex flex-col items-center justify-end h-full min-w-0">
            <span className="text-xs font-semibold text-gray-700 mb-1">{d.value}</span>
            <div
              className="w-full max-w-[42px] rounded-t-md transition-all duration-500 hover:opacity-80"
              style={{ height: `${h}px`, backgroundColor: d.color || COLORS[i % COLORS.length] }}
              title={`${d.label}: ${d.value}`}
            />
            <span className="text-[10px] text-gray-500 mt-1.5 truncate w-full text-center leading-tight">{d.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default BarChart;
