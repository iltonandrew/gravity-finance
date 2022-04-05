import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  plugins: {
    title: {
      display: false,
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
// labels: ["Alimentação", "Eletronicos", "Transporte", "Cultura", "Saúde"],
export const data = {
  labels,
  datasets: [
    {
      label: "Alimentação",
      data: labels.map(() => faker.datatype.number({ min: 100, max: 3000 })),
      backgroundColor: "rgb(255, 99, 132)",
    },
    {
      label: "Eletronicos",
      data: labels.map(() => faker.datatype.number({ min: 100, max: 3000 })),
      backgroundColor: "rgb(75, 192, 192)",
    },
    {
      label: "Transporte",
      data: labels.map(() => faker.datatype.number({ min: 100, max: 3000 })),
      backgroundColor: "rgb(53, 162, 235)",
    },
    {
      label: "Cultura",
      data: labels.map(() => faker.datatype.number({ min: 100, max: 3000 })),
      backgroundColor: "rgb(255, 206, 86)",
    },
    {
      label: "Saúde",
      data: labels.map(() => faker.datatype.number({ min: 100, max: 3000 })),
      backgroundColor: "rgb(255, 159, 64)",
    },
  ],
};

export const BarChart = () => <Bar options={options} data={data} />;
