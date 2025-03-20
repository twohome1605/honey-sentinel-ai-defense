
import React, { useMemo } from "react";

interface HexagonDataPoint {
  axis: string;
  value: number;
}

interface HexagonChartProps {
  data: HexagonDataPoint[];
  size?: number;
  color?: string;
  className?: string;
}

const HexagonChart: React.FC<HexagonChartProps> = ({
  data,
  size = 200,
  color = "var(--accent-color, #BBDEFB)",
  className = ""
}) => {
  const center = size / 2;
  const radius = (size / 2) * 0.8; // 80% of half the size
  
  const points = useMemo(() => {
    const angleStep = (Math.PI * 2) / data.length;
    
    return data.map((point, i) => {
      const angle = i * angleStep - Math.PI / 2; // Start from top (- PI/2)
      const x = center + radius * point.value * Math.cos(angle);
      const y = center + radius * point.value * Math.sin(angle);
      return { x, y, label: point.axis };
    });
  }, [data, center, radius]);
  
  // Generate polygon points string
  const polygonPoints = points.map(p => `${p.x},${p.y}`).join(' ');
  
  // Background grid lines (hexagon shapes for each 0.2 value)
  const gridLines = [0.2, 0.4, 0.6, 0.8, 1.0].map(scale => {
    const gridPoints = data.map((_, i) => {
      const angle = i * ((Math.PI * 2) / data.length) - Math.PI / 2;
      const x = center + radius * scale * Math.cos(angle);
      const y = center + radius * scale * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
    
    return (
      <polygon
        key={scale}
        points={gridPoints}
        fill="none"
        stroke="rgba(255, 255, 255, 0.1)"
        strokeWidth="1"
      />
    );
  });
  
  // Axis lines
  const axisLines = data.map((_, i) => {
    const angle = i * ((Math.PI * 2) / data.length) - Math.PI / 2;
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    
    return (
      <line
        key={i}
        x1={center}
        y1={center}
        x2={x}
        y2={y}
        stroke="rgba(255, 255, 255, 0.1)"
        strokeWidth="1"
      />
    );
  });
  
  // Labels
  const labels = points.map((point, i) => {
    const angle = i * ((Math.PI * 2) / data.length) - Math.PI / 2;
    // Position labels a bit outside the max radius
    const labelRadius = radius * 1.15;
    const x = center + labelRadius * Math.cos(angle);
    const y = center + labelRadius * Math.sin(angle);
    
    // Adjust text-anchor based on position
    let textAnchor = "middle";
    if (angle > -Math.PI / 4 && angle < Math.PI / 4) textAnchor = "start";
    else if (angle > Math.PI * 3/4 || angle < -Math.PI * 3/4) textAnchor = "end";
    
    return (
      <text
        key={i}
        x={x}
        y={y}
        fontSize="10"
        fill="rgba(255, 255, 255, 0.7)"
        textAnchor={textAnchor}
        dominantBaseline="middle"
      >
        {point.label}
      </text>
    );
  });

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Grid lines */}
        {gridLines}
        
        {/* Axis lines */}
        {axisLines}
        
        {/* Data polygon */}
        <polygon
          points={polygonPoints}
          fill={`${color}40`}
          stroke={color}
          strokeWidth="2"
          className="transition-all duration-500 ease-in-out"
        />
        
        {/* Data points */}
        {points.map((point, i) => (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="3"
            fill={color}
            className="filter drop-shadow-md"
          />
        ))}
        
        {/* Axis labels */}
        {labels}
      </svg>
    </div>
  );
};

export default HexagonChart;
