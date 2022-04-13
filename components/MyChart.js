import React from "react";
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
import { propNames } from "@chakra-ui/react";

  export default function MyChart(props) {

  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].slice(0, new Date().getMonth()+1)
  
  let data = {
    labels: labels,
    datasets: [
      {
        fill: false,
        lineTension: 0.5,
        backgroundColor: "#db86b2",
        borderColor: "#B57295",
        borderCapStyle: "butt",
        borderDashOffset: 0.0,
        borderJoinStyle: "#B57295",
        pointBorderColor: "#B57295",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#B57295",
        pointHoverBorderColor: "#B57295",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: props.dataItems,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          borderDash: [3, 3],
        },
        // beginAtZero: true, // this works
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
  <Line data={data} options={options} />
  );
}
