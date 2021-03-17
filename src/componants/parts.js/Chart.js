import { useEffect, useRef, useState } from "react";
import Chartjs from "chart.js";
import Loader from "./Loader";
const Chart = ({ position }) => {
  const [temp, setTemp] = useState([]);
  const fetchData = async () => {
    const data = await fetch(
      `${process.env.REACT_APP_API_URL}/onecall?lat=${position.latitude}&lon=${position.longitude}&exclude=current,minutely,daily,alerts&appid=${process.env.REACT_APP_API_KEY}`
    );
    const final = await data.json();
    return final.hourly
      .filter((hour, i) => i < 24)
      .map((hour) => parseInt((hour.temp - 273.15).toFixed(0)));
  };
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const data = {
    labels: [
      "0am",
      "1am",
      "2am",
      "3am",
      "4am",
      "5am",
      "6am",
      "7am",
      "8am",
      "9am",
      "10am",
      "11am",
      "12am",
      "13pm",
      "14pm",
      "15pm",
      "16pm",
      "17pm",
      "18pm",
      "19pm",
      "20pm",
      "21pm",
      "22pm",
      "23pm",
    ],
    datasets: [
      {
        label: "temperature",
        data: temp,
        fill: false,
        borderColor: "#fff",
        display: false,
      },
    ],
  };

  const Options = {
    responsive: true, //
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
            zeroLineColor: "#fff",
          },
          ticks: {
            beginAtZero: false,
            fontColor: "white",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            zeroLineColor: "#fff",
          },
          ticks: {
            beginAtZero: false,
            fontColor: "white",
          },
        },
      ],
    },
  };
  const chartConfig = {
    type: "line",
    data: data,
    options: Options,
  };

  const upd = () => {
    const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
    setChartInstance(newChartInstance);
  };
  useEffect(() => {
    const merge = async () => {
      const data = await fetchData();
      setTemp(data);
    };
    merge();
    upd();
    console.log(data);
  }, [chartContainer, position]);
  console.log(position);
  return (
    <div>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default Chart;
