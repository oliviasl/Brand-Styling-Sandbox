"use client";

import { ATTRIBUTES } from "@/app/attributes";
import "chart.js/auto";
import "chartjs-plugin-dragdata";
import { Radar } from "react-chartjs-2";
import styled from "styled-components";

const StyledCard = styled.div`
  position: relative;
  margin: auto;
  aspect-ratio: 1 / 1;
  height: 35rem;
  width: 35rem;
  padding: 2rem;
  background-color: white;
  border-radius: 12px;
  border: 3px solid #e7e7e7;
  height: 100%;
  max-width: 100%;

  /* Card effect using ::before pseudo-element */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #e7e7e7;
    border-radius: 12px;
    z-index: -1;
    transform: rotate(3deg);
  }
`;

export default function RadarChart({
  data,
  handleAttributeChange,
}: {
  data: any;
  handleAttributeChange: (key: string, value: number) => void;
}) {
  // Generate labels with primary attributes first and inverses opposite
  const labels = [...ATTRIBUTES.map(({ primary }) => primary), ...ATTRIBUTES.map(({ inverse }) => inverse)];

  const chartData = {
    labels,
    datasets: [
      {
        label: "",
        data: labels.map(label => data[label]),
        fill: true,
        tension: 0,
        pointHitRadius: 25,
        backgroundColor: "rgba(231, 98, 98, 0.45)",
        borderColor: "rgba(231, 98, 98, 1)",
        borderWidth: 1,
        pointRadius: 4,
        pointBackgroundColor: "rgba(231, 98, 98, 1)",
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
        pointLabels: {
          font: {
            size: 12,
            weight: "bold",
            family: "Inter, sans-serif",
          },
        },
      },
    },
    plugins: {
      dragData: {
        round: 0, // Snap to integers during dragging
        onDragEnd: (_event: any, _datasetIndex: number, index: number, value: number | null) => {
          const key = labels[index];
          handleAttributeChange(key, value || 0);
        },
      },
      datalabels: { display: false },
      legend: { display: false },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="m-0 flex h-full w-full p-4">
      <div className="m-auto inline-block h-full w-full">
        <StyledCard>
          <Radar data={chartData} options={options} />
        </StyledCard>
      </div>
    </div>
  );
}
