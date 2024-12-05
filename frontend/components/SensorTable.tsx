"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { categoryLabels } from "@/components/Dashboard";
import { Button } from "@/components/ui/button";

interface SensorTableProps {
  data: {
    id: number;
    timestamp: string;
    temperature: number;
    humidity: number;
    lightIntensity: number;
    soilMoisture: number;
    category: "trees" | "vegetables" | "ornamentals";
  }[];
}

export function SensorTable({ data }: SensorTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Timestamp</TableHead>
            <TableHead>Temperature (°C)</TableHead>
            <TableHead>Humidity (%)</TableHead>
            <TableHead>Light (lux)</TableHead>
            <TableHead>Soil Moisture (%)</TableHead>
            <TableHead>Category</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{new Date(row.timestamp).toLocaleString()}</TableCell>
              <TableCell>{row.temperature}</TableCell>
              <TableCell>{row.humidity}</TableCell>
              <TableCell>{row.lightIntensity}</TableCell>
              <TableCell>{row.soilMoisture}</TableCell>
              <TableCell>{categoryLabels[row.category]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          variant={currentPage === 1 ? "outline" : "default"}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          variant={currentPage === totalPages ? "outline" : "default"}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
