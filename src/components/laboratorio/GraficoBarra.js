/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const GraficoBarra = ({ estadistica, tipoPrueba }) => {
  const [result, setResult] = useState();
  // const getEstadistica = () => {
  //   const prueba =
  //     estadistica.length > 0 && estadistica.map((data, i) => data.atenciones);

  //   setResult(prueba);
  // };
  // console.log(estadistica);

  useEffect(() => {
    // getEstadistica();
  }, [tipoPrueba]);

  return (
    <div style={{ width: '100%', height: '50%' }}>
      <Bar
        data={{
          labels: estadistica.labels,
          datasets: [
            {
              label: 'Número de evaluaciones por período de tiempo',
              data: estadistica.data,
              backgroundColor: [
                '#64C9CF',
                '#CAF7E3',
                '#B8DFD8',
                '#E5FBB8',
                '#93D9A3',
              ],
              borderColor: [
                '#64C9CF',
                '#CAF7E3',
                '#B8DFD8',
                '#E5FBB8',
                '#93D9A3',
              ],
              borderWidth: 1,
            },
          ],
        }}
        width={500}
        height={400}
        options={{
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default GraficoBarra;
