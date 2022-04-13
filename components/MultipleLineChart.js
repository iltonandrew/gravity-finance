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


export default function MultipleLineChart(props){

    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

    const data1 = [500, 300, 400, 600, 800, 650, 700, 690, 1000, 1200, 1050, 1300].slice(0, new Date().getMonth()+1);
    const data2 = [null, 275, 100, 500, 400, 250, 100, 1090, 100, 200, 1100, 1000].slice(0, new Date().getMonth()+1);
    const data3 = [1548, 2417, 1434, 268, 2188, 879, 1547, 1090, 80, 393, 1658, 1917].slice(0, new Date().getMonth()+1);

    const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].slice(0, new Date().getMonth()+1)

    const data = {
    labels: monthLabels,
    datasets: []
    };

    if(props.data) {
        Object.keys(props.data).forEach(bank => {
            const preset = presets[bank];
            preset.data = props.data[bank];
            data.datasets.push(preset)
        });
    } else {
        let preset = presets.BTG
        preset.data = data1
        data.datasets.push(preset)
        preset = presets.BanKoga
        preset.data = data2
        data.datasets.push(preset)
        preset = presets.NuBank
        preset.data = data3
        data.datasets.push(preset)
    }

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
            },
        },
        plugins: {
            legend: {
            display: true,
            position: 'bottom'
            },
        },
    };
    return (
        <Line data={data} options={options} />
    );
}

const presets = {
    NuBank: {
    label: "NuBank",
    fill: false,
    lineTension: 0.5,
    backgroundColor: "#B57295",
    borderColor: "#B57295",
    borderDashOffset: 0.0,
    pointBackgroundColor: "#B57295",
    pointHoverRadius: 5,
    pointHoverBackgroundColor: "#B57295",
    pointHoverBorderColor: "#B57295",
    pointHoverBorderWidth: 2,
    pointRadius: 5,
    pointHitRadius: 10,
    data: [],
    },
    BanKoga: {
    label: "BanKoga",
    fill: false,
    lineTension: 0.5,
    backgroundColor: "#B5FA95",
    borderColor: "#B5FA95",
    borderCapStyle: "butt",
    borderDashOffset: 0.0,
    borderJoinStyle: "#B5FA95",
    pointBorderColor: "#B5FA95",
    pointBackgroundColor: "#B5FA95",
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: "#B5FA95",
    pointHoverBorderColor: "#B5FA95",
    pointHoverBorderWidth: 2,
    pointRadius: 5,
    pointHitRadius: 10,
    data: [],
    },
    BTG: {
    label: "BTG",
    fill: false,
    lineTension: 0.5,
    backgroundColor: "#001E62",
    borderColor: "#001E62",
    borderCapStyle: "butt",
    borderDashOffset: 0.0,
    borderJoinStyle: "#001E62",
    pointBorderColor: "#001E62",
    pointBackgroundColor: "#001E62",
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: "#001E62",
    pointHoverBorderColor: "#001E62",
    pointHoverBorderWidth: 2,
    pointRadius: 5,
    pointHitRadius: 10,
    data: [],
    },
}