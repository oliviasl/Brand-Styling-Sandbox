"use client";

import { ATTRIBUTES } from "@/app/attributes";
import "chart.js/auto";
import "chartjs-plugin-dragdata";
import { Radar } from "react-chartjs-2";

export default function RadarChart({
  data,
  handleAttributeChange,
}: {
  data: any;
  handleAttributeChange: (key: string, value: number) => void;
}) {
  // Generate labels with primary attributes first and inverses opposite
  const labels = [
    ...ATTRIBUTES.map(({ primary }) => primary),
    ...ATTRIBUTES.map(({ inverse }) => inverse),
  ];

  const chartData = {
    labels,
    datasets: [
      {
        label: "",
        data: labels.map((label) => data[label]),
        fill: true,
        tension: 0,
        borderWidth: 3,
        pointHitRadius: 25,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  const options = {
    scales: {
      r: {
        ticks: {
          display: false,
          beginAtZero: true,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    plugins: {
      dragData: {
        round: 0, // Snap to integers during dragging
        onDragEnd: (
          _event: any,
          _datasetIndex: number,
          index: number,
          value: number | null
        ) => {
          const key = labels[index];
          handleAttributeChange(key, value || 0);
        },
      },
      datalabels: { display: false },
      legend: { display: false },
    },
  };

  return (
    <div className="m-0 p-0">
      <div className="absolute w-screen h-screen bg-gray-200">
        <Radar data={chartData} options={options} />
      </div>
    </div>
  );
}
