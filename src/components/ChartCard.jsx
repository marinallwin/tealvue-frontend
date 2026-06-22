import { useEffect, useRef } from "react";
import { createChart, LineSeries } from "lightweight-charts";

import "../styles/dashboard.css";

function ChartCard({ symbol, data = [] }) {
  const containerRef = useRef(null);

  const chartRef = useRef(null);
  const seriesRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
    });

    const series = chart.addSeries(LineSeries);

    chartRef.current = chart;
    seriesRef.current = series;

    const resizeObserver = new ResizeObserver(() => {
      chart.applyOptions({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight,
      });
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
    };
  }, []);

  useEffect(() => {
    if (!seriesRef.current || !data.length) {
      return;
    }

    seriesRef.current.setData(data);
  }, [data]);

  return (
    <div className="chart-card">
      <div className="chart-header">
        <div className="chart-symbol">{symbol}</div>
      </div>

      <div ref={containerRef} className="chart-container" />
    </div>
  );
}

export default ChartCard;
