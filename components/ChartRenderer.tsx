"use client";

import {
  BarChart, Bar,
  LineChart, Line,
  XAxis, YAxis,
  Tooltip, CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function ChartRenderer({ data, recommendation }: any) {
  if (!data || data.length === 0) {
    return <p className="text-neutral-500">No data to visualize</p>;
  }

  const keys = Object.keys(data[0]);

  // 🔥 detect numeric column (Y axis)
  const numericKey = keys.find(
    (k) => typeof data[0][k] === "number"
  );

  // 🔥 detect category/date column (X axis)
  const categoryKey = keys.find((k) => k !== numericKey);

  if (!numericKey || !categoryKey) {
    return (
      <p className="text-neutral-500">
        Unable to determine chart axes
      </p>
    );
  }

  const xKey = categoryKey;
  const yKey = numericKey;

  // 🔥 auto detect time series
  const isTimeSeries = !isNaN(new Date(data[0][xKey]).getTime());
  const type = isTimeSeries ? "line" : (recommendation?.best?.chart || "bar");

  // 🔥 sort if date
  const sortedData = [...data].sort((a, b) => {
    const d1 = new Date(a[xKey]).getTime();
    const d2 = new Date(b[xKey]).getTime();
    return isNaN(d1) || isNaN(d2) ? 0 : d1 - d2;
  });

  // 🔥 reduce clutter (last 12 points)
  const displayData = sortedData.slice(-12);

  // 🔥 date formatter
  const formatDate = (value: any) => {
    const date = new Date(value);
    return isNaN(date.getTime())
      ? value
      : date.toLocaleDateString();
  };

  return (
    <div className="w-full mt-4 min-h-[300px]">
      <ResponsiveContainer width="100%" height={300}>

        {type === "line" ? (
          <LineChart data={displayData} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>

            {/* 🔥 Gradient */}
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.2} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="#374151" strokeDasharray="3 3" />

            <XAxis
              dataKey={xKey}
              tickFormatter={formatDate}
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
            />

            <YAxis
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              width={60}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#111",
                border: "1px solid #333",
                borderRadius: "8px",
                color: "#fff",
              }}
              labelFormatter={formatDate}
            />

            <Line
              type="monotone"
              dataKey={yKey}
              stroke="url(#lineGradient)"
              strokeWidth={3}
              dot={false}
            />

          </LineChart>

        ) : (
          <BarChart data={displayData} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>

            {/* 🔥 Gradient */}
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.3} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="#374151" strokeDasharray="3 3" />

            <XAxis
              dataKey={xKey}
              tickFormatter={formatDate}
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
            />

            <YAxis
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              width={60}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#111",
                border: "1px solid #333",
                borderRadius: "8px",
                color: "#fff",
              }}
              labelFormatter={formatDate}
            />

            <Bar
              dataKey={yKey}
              fill="url(#barGradient)"
              radius={[6, 6, 0, 0]}
            />

          </BarChart>
        )}

      </ResponsiveContainer>
    </div>
  );
}