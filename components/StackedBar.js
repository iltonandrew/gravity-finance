import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function StackedBarChart(props) {

  const backgroundColorPalette = {
    "Alimentaçao": "rgba(255, 99, 132)",
    "Saúde": "rgba(54, 162, 235)",
    "Academia": "rgba(255, 206, 86)",
    "Combustivel": "rgba(75, 192, 192)",
    "Educação": "rgba(153, 102, 255)",
    "Entretenimento": "rgba(204, 102, 0)",
    "other": ""
  }

  const options = {
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
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ].slice(0, new Date().getMonth()+1);
  
  const data = {
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

  if(props.data) {
    data.datasets = []
    props.data.forEach(item => {
      const dataset = {
        label: item.type,
        data: item.values,
        backgroundColor: backgroundColorPalette[item.type] ?? '',
      }
      data.datasets.push(dataset)
    });
  }

  return (
    <Bar options={options} data={data} />
  );
}