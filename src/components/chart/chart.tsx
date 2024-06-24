import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function Chart({
  dates,
  prices,
}: {
  dates: string[];
  prices: number[];
}) {
  return (
    <Line
      data={{
        // x-axis label values
        labels: dates,
        datasets: [
          {
            label: "Price",
            // y-axis data plotting values
            data: prices,
            borderWidth: 3,
            pointRadius: 5,
            pointBackgroundColor: "#f0f0f2",
            borderColor: "#a1a3ad",
          },
        ],
      }}
      options={{
        plugins: {
          legend: {
            onClick: () => null,
          },
        },
      }}
    />
  );
}
