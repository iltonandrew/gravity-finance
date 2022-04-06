import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

type DoughnutChartPropsType = {
  data?: {type: string, value: number}[];
};

const categoryColorPallete: {[id: string]: {backgroundColor: string, borderColor:string}} = {
  "Alimentaçao": {backgroundColor: "rgba(255, 99, 132, 0.2)", borderColor: "rgba(255, 99, 132, 1)"},
  "Saúde": {backgroundColor: "rgba(54, 162, 235, 0.2)", borderColor: "rgba(54, 162, 235, 1)"},
  "Academia": {backgroundColor: "rgba(255, 206, 86, 0.2)", borderColor: "rgba(255, 206, 86, 1)"},
  "Combustivel": {backgroundColor: "rgba(75, 192, 192, 0.2)", borderColor: "rgba(75, 192, 192, 1)"},
  "Educação": {backgroundColor: "rgba(153, 102, 255, 0.2)", borderColor: "rgba(153, 102, 255, 1)"},
  "Entretenimento": {backgroundColor: "rgba(204, 102, 0, 0.2)", borderColor: "rgba(204, 102, 0, 1)"},
  "other": {backgroundColor: "", borderColor: ""},

}

export default function DoughnutChart(props: DoughnutChartPropsType) {

  let chartData: {
    labels: string[],
    datasets: {
      label: string,
      data: number[],
      backgroundColor: string[],
      borderColor: string[],
      borderWidth: number
    }[]
  } = {
    labels: [],
    datasets: [{
      label: 'Amount Spent',
      data: [],
      backgroundColor: [],
      borderColor: [],
      borderWidth: 1
    }]
  }

  props.data?.forEach(item => {
    chartData.labels.push(item.type);
    chartData.datasets[0].data.push(item.value)
    chartData.datasets[0].backgroundColor.push(categoryColorPallete[item.type].backgroundColor)
    chartData.datasets[0].borderColor.push(categoryColorPallete[item.type].borderColor)
  });
  
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  ChartJS.register(ArcElement, Tooltip, Legend);

  return (
    <Doughnut data={chartData} options={options}/>
  );
};


