"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
} from "recharts";
import { SensorData } from "@/services/apiService";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegendContent,
} from "@/components/ui/chart";
import { format } from "date-fns";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SensorChartProps {
  data: SensorData[];
  metric: keyof Omit<SensorData, "id" | "timestamp" | "category">;
}

const categories = ["trees", "vegetables", "ornamentals"] as const;

// Function to round date to the nearest second
const roundToNearestSecond = (date: Date): string => {
  const rounded = new Date(Math.floor(date.getTime() / 1000) * 1000);
  return format(rounded, "yyyy-MM-dd HH:mm:ss");
};

const metricLabels: Record<keyof Omit<SensorData, "id" | "timestamp" | "category">, string> = {
  temperature: "Temperatura",
  humidity: "Umidade",
  lightIntensity: "Intensidade de Luz",
  soilMoisture: "Umidade do Solo",
};

const SensorChart: React.FC<SensorChartProps> = ({ data, metric }) => {
  // Define the config for ChartContainer
  const config = {
    trees: {
      label: "Árvores",
      color: "hsl(220, 90%, 56%)",
    },
    vegetables: {
      label: "Vegetais",
      color: "hsl(120, 70%, 50%)",
    },
    ornamentals: {
      label: "Ornamentais",
      color: "hsl(340, 80%, 60%)",
    },
  };

  // Group data by timestamp
  const groupedDataMap: {
    [key: string]: { timestamp: string } & { [key in typeof categories[number]]: number | null };
  } = {};

  data.forEach((item) => {
    const roundedTimestamp = roundToNearestSecond(new Date(item.timestamp));
    if (!groupedDataMap[roundedTimestamp]) {
      groupedDataMap[roundedTimestamp] = { timestamp: roundedTimestamp, trees: null, vegetables: null, ornamentals: null };
    }
    groupedDataMap[roundedTimestamp][item.category] = item[metric];
  });

  // Convert grouped data to an array and sort by timestamp
  const chartData = Object.values(groupedDataMap).sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  return (
    <>
      <CardHeader>
        <CardTitle>
          {metricLabels[metric]} ao longo do tempo
        </CardTitle>
      </CardHeader>
      <CardContent> 
        <ChartContainer config={config} className="w-full max-h-80">
          <LineChart data={chartData} height={200} margin={{ left: 12, right: 12 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="timestamp"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(str) => {
              const date = new Date(str);
              return format(date, "HH:mm:ss");
            }}
          />
          <RechartsTooltip content={<ChartTooltipContent />} cursor={false} />
          <RechartsLegend content={<ChartLegendContent />} />
          {categories.map((category) => (
            <Line
              key={category}
              type="monotone"
              dataKey={category}
              stroke={`var(--color-${category})`}
              strokeWidth={2}
              dot={false}
              name={config[category].label}
              connectNulls
            />
          ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </>
  );
};

export default SensorChart;
