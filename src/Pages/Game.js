import React, { useState, useEffect, useRef } from 'react';
import Chart from '../chart/Chart';
import Highcharts from "highcharts";
import more from "highcharts/highcharts-more";
import draggable from "highcharts/modules/draggable-points";
import HighchartsReact from "highcharts-react-official";

if (typeof Highcharts === "object") {
  more(Highcharts);
  draggable(Highcharts);
}

const Game = () => {
  const [data, setData] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&outputsize=full&apikey=demo')
      .then(response => response.json())
      .then(data => {
        const transformedData = transformData(data);
        setData(transformedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const transformData = (apiData) => {
    const timeSeriesData = apiData['Time Series (Daily)'];
    const transformedData = [];
    let count = 0;

    for (const date in timeSeriesData) {
      if (timeSeriesData.hasOwnProperty(date)) {
        const { '1. open': open, '2. high': high, '3. low': low, '4. close': close, '6. volume': volume } = timeSeriesData[date];
        const formattedDate = new Date(date);
        const dataPoint = { date: formattedDate, open: parseFloat(open), high: parseFloat(high), low: parseFloat(low), close: parseFloat(close), volume: parseInt(volume) };
        transformedData.push(dataPoint);

        count++;
        if (count === 50) {
          break; // Stop processing after the first 30 data points
        }
      }
    }
    transformedData.reverse();
    const future20 = transformedData.splice(-20);
    console.log(transformedData);
    console.log(future20);
    return transformedData;
  };

  if (data === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>

    <div className="flex flex-row">
      <div className="w-1/2 h-96">
        <Chart data={data} />
      </div>
      <div className="w-1/2 h-96">
        <HighchartsReact
          highcharts={Highcharts}
          ref={chartRef}
          constructorType={"chart"}
          options={{
            chart: {
              type: 'line',
              backgroundColor: '#ffffcc',
            },
            xAxis: {
              title: {
                text: null,
              },
              visible: false,
            },
            yAxis: {
              title: {
                text: null,
              },
              visible: false,
              min: 0,
              max: 100,
            },
            series: [
              {
                name: '',
                data: [10, 10, 9, 8, 7, 20, 23, 42],
                lineWidth: 2,
                dragDrop: {
                  draggableX: false,
                  draggableY: true,
                  dragMinY: 10, // minimum y-value allowed for dragged points
                  dragMaxY: 90, // maximum y-value allowed for dragged points
                  dragPrecisionY: 1, // number of decimal places for y-values
                },
                point: {
                  events: {
                    // drop: handlePointDrag
                  },
                },
              },
              {
                name: 'Solution',
                data: [10, 10, 10, 10],
                lineWidth: 2,
                visible: false,
              },
            ],
            title: {
              text: null,
            },
            credits: {
              enabled: false,
            },
            legend: {
              enabled: false,
            },
            plotOptions: {
              series: {},
            },
          }}
        />
      </div>
    </div>
          <div className='mt-60 ml-10'>
            <div className="flex flex-row w-56 items-center justify-center bg-gray-200 hover:bg-gray-400 rounded-md shadow-md cursor-pointer">
              <h1 className='p-5 text-2xl font-bold flex text-center align-middle justify-center'> Parse Memo </h1>
            </div>
          </div>
    </div>
  );
};

export default Game;
