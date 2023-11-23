import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const GraficoHertz = () => {
  const [data, setData] = useState({
    series: [{
      name: 'Variação de Hertz',
      data: [5],
    }],
    options: {
      chart: {
        id: 'realtime',
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000,
          },
        },
      },
      xaxis: {
        type: 'category',
        categories: [1],
      },
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      gerarDadoAleatorio();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const gerarDadoAleatorio = () => {
    const novoDado = Math.floor(Math.random() * 10) + 1;

    setData((prevState) => {
      const newCategories = [...prevState.options.xaxis.categories, prevState.options.xaxis.categories.length + 1];
      const newSeries = [{
        name: 'Variação de Hertz',
        data: [...prevState.series[0].data, novoDado],
      }];

      return {
        series: newSeries,
        options: {
          ...prevState.options,
          xaxis: {
            ...prevState.options.xaxis,
            categories: newCategories,
          },
        },
      };
    });
  };

  return (
    <div>
      <ReactApexChart
        options={data.options}
        series={data.series}
        type="line"
        height={350}
      />
    </div>
  );
};


export default GraficoHertz;
