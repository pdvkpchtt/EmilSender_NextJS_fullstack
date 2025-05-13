"use client";

import TextMain from "@/shared/text/TextMain";
import Card from "@/shared/ui/Card";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  maintainAspectRatio: false,
  responsive: true,
  aspectRatio: 1,
  plugins: {
    legend: {
      position: "bottom",
    },
  },
};

const Stats = ({ data = [] }) => {
  console.log(data);

  return (
    <div className="flex flex-col gap-[12px] [@media(hover)]:ml-[262.77px] w-full">
      <Card style="flex flex-col gap-[12px]">
        <TextMain text="Статистика" style="font-medium" />

        <div
          style={{
            height: "60vh",
            position: "relative",
            marginBottom: "1%",
            padding: "1%",
          }}
        >
          <Line options={options} data={data} />
        </div>
      </Card>
    </div>
  );
};

export default Stats;
