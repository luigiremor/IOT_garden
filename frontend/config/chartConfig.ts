import { type ChartConfig } from "@/components/ui/chart";

export const chartConfig: { [metric: string]: ChartConfig } = {
  temperature: {
    trees: {
      label: "Trees",
      color: "hsl(220, 90%, 56%)",
    },
    vegetables: {
      label: "Vegetables",
      color: "hsl(120, 70%, 50%)",
    },
    ornamentals: {
      label: "Ornamentals",
      color: "hsl(340, 80%, 60%)",
    },
  },
  humidity: {
    trees: {
      label: "Trees",
      color: "hsl(220, 90%, 56%)",
    },
    vegetables: {
      label: "Vegetables",
      color: "hsl(120, 70%, 50%)",
    },
    ornamentals: {
      label: "Ornamentals",
      color: "hsl(340, 80%, 60%)",
    },
  },
  lightIntensity: {
    trees: {
      label: "Trees",
      color: "hsl(220, 90%, 56%)",
    },
    vegetables: {
      label: "Vegetables",
      color: "hsl(120, 70%, 50%)",
    },
    ornamentals: {
      label: "Ornamentals",
      color: "hsl(340, 80%, 60%)",
    },
  },
  soilMoisture: {
    trees: {
      label: "Trees",
      color: "hsl(220, 90%, 56%)",
    },
    vegetables: {
      label: "Vegetables",
      color: "hsl(120, 70%, 50%)",
    },
    ornamentals: {
      label: "Ornamentals",
      color: "hsl(340, 80%, 60%)",
    },
  },
};
