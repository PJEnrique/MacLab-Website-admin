import React from 'react';
import Chart from 'react-apexcharts';
import './LineChart.css';

const LineChart = () => {
  const chartOptions = {
    xaxis: {
      categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    },
    colors: ['#ffa500'],  // Orange color for the chart line
    chart: {
      background: '#101820FF',  // Black background
    },
  };

  const chartSeries = [
    {
      name: 'Sample Data',
      data: [30, 40, 45, 50, 49, 60, 70],
    },
  ];

  return (
    <Chart
      options={chartOptions}
      series={chartSeries}
      type="line"
      width="1000"
    />
  );
};

export default LineChart;