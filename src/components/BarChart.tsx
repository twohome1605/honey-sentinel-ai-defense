
import React from "react";

interface BarChartProps {
  data: { label: string; value: number }[];
  height?: number;
  barColor?: string;
  className?: string;
  labelPosition?: "bottom" | "left";
  animated?: boolean;
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  height = 200,
  barColor = "var(--accent-color, #BBDEFB)",
  className = "",
  labelPosition = "bottom",
  animated = true
}) => {
  // Find max value for scaling
  const maxValue = Math.max(...data.map(item => item.value)) * 1.1; // Add 10% padding
  
  const isHorizontal = labelPosition === "left";
  const chartWidth = isHorizontal ? "100%" : `${data.length * 40}px`;
  const minWidth = isHorizontal ? "100%" : `${data.length * 30}px`;
  
  return (
    <div 
      className={`relative ${className}`} 
      style={{ 
        height: isHorizontal ? `${data.length * 40}px` : `${height}px`,
        width: chartWidth,
        minWidth
      }}
    >
      {/* Background grid lines */}
      {!isHorizontal && Array.from({ length: 5 }).map((_, i) => {
        const yPosition = height - (height * (i + 1) / 5);
        return (
          <div
            key={i}
            className="absolute left-0 right-0 border-t border-white/10"
            style={{ top: yPosition }}
          />
        );
      })}
      
      {isHorizontal && Array.from({ length: 5 }).map((_, i) => {
        const xPosition = (i + 1) / 5 * 100;
        return (
          <div
            key={i}
            className="absolute top-0 bottom-0 border-l border-white/10"
            style={{ left: `${xPosition}%` }}
          />
        );
      })}
      
      {/* Chart content */}
      <div className={`h-full flex ${isHorizontal ? 'flex-col' : 'items-end'} justify-between relative`}>
        {data.map((item, index) => {
          const size = (item.value / maxValue) * 100;
          
          return (
            <div
              key={index}
              className={`relative flex ${isHorizontal ? 'h-8 items-center' : 'w-7 h-full flex-col justify-end'} mx-1`}
            >
              {/* Bar */}
              <div
                className={`${isHorizontal ? 'h-5' : 'w-5'} bg-opacity-80 rounded-sm`}
                style={{
                  backgroundColor: barColor,
                  [isHorizontal ? 'width' : 'height']: `${size}%`,
                  transition: animated ? 'all 0.5s ease-out' : 'none'
                }}
              />
              
              {/* Label */}
              <div 
                className={`text-xs text-white/70 truncate ${
                  isHorizontal 
                    ? 'absolute -left-6 text-right w-5' 
                    : 'mt-1 text-center w-full'
                }`}
              >
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BarChart;
