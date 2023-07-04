import React, { useState, useEffect, useRef } from 'react';
import Chart from '../chart/Chart';
import Highcharts from "highcharts";
import more from "highcharts/highcharts-more";
import draggable from "highcharts/modules/draggable-points";
import HighchartsReact from "highcharts-react-official";
import Sidebar from '../Components/Sidebar';

if (typeof Highcharts === "object") {
  more(Highcharts);
  draggable(Highcharts);
}

const Game = () => {
  const [data, setData] = useState(null);
  const [dragData, setDragData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [dataHigh, setDataHigh] = useState();
  const [dataLow, setDataLow] = useState();
  const [lastData, setLastData] = useState();
  const [futureData, setFutureData] = useState()
  const chartRef = useRef(null);

  var tempLow = 99999999;
  var tempHigh = -999999999;
  var tempLast = 0;

  const dummyData = [
    { date: '2023-06-01', accuracy: 80 },
    { date: '2023-06-02', accuracy: 85 },
    { date: '2023-06-03', accuracy: 90 },
    // Add more data points as needed
  ];

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

    var first = true
    var second  = false
    var firstDate;
    var secondDate;

    for (const date in timeSeriesData) {
      if(first){
        if (timeSeriesData.hasOwnProperty(date)) {
          firstDate = new Date(date);
          first = false
          second = true
        }
      }
      else if (second){
        secondDate = new Date(date);
        second = false
      }
      else{
      
        if (timeSeriesData.hasOwnProperty(date)) {
          const { '1. open': open, '2. high': high, '3. low': low, '4. close': close, '6. volume': volume } = timeSeriesData[date];
          const formattedDate = new Date(date);

          if (parseFloat(low) < parseFloat(tempLow)) {
            tempLow = parseFloat(low);
          }
          if (parseFloat(high) > parseFloat(tempHigh)) {
            console.log("NEW HIGH " + high + " temphigh: " + tempHigh)
            tempHigh = parseFloat(high);
          }

          const dataPoint = { date: formattedDate, open: parseFloat(open), high: parseFloat(high), low: parseFloat(low), close: parseFloat(close), volume: parseFloat(volume) };
          transformedData.push(dataPoint);

          count++;

          if (count === 30) {
            tempLast = close
          }

          if (count === 50) {
            break; // Stop processing after the first 30 data points
          }
        }
      }
    }

    //add highs and lows
    const highPoint = { date: firstDate, open: tempHigh, high: tempHigh, low: tempHigh, close: tempHigh, volume: 0 };
    const lowPoint = { date: secondDate, open: tempLow, high: tempLow, low: tempLow, close: tempLow, volume: 0 };
    transformedData.push(highPoint);
    transformedData.push(lowPoint);

    setLastData(parseFloat(tempLast))
    setDragData([parseFloat(tempLast),parseFloat(tempLast),parseFloat(tempLast),parseFloat(tempLast),parseFloat(tempLast),parseFloat(tempLast),parseFloat(tempLast),parseFloat(tempLast),parseFloat(tempLast), parseFloat(tempLast)])
    setDataLow(tempLow)
    setDataHigh(tempHigh)

    transformedData.reverse();
    var future20 = transformedData.splice(-20);
    future20 = future20.map(item => item.close);
    setFutureData(future20)

    console.log("DATA : " + transformedData)
    console.log("FUTURE : " + future20)
    return transformedData;
  };


  if (data === null) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async () => {
    const chart = chartRef.current.chart;

    var onePercent = parseFloat((dataHigh - dataLow) / 100.0);
    var bottom = parseFloat(dataLow);

    console.log("ONE PERCENT " + onePercent)
    console.log("BOTTOM " + bottom)

    // Get the data from the draggable points
    const pointsData = chart.series[0].points.map((point) => ({
      x: point.x,
      y: point.y,
      z: (point.y*onePercent)+bottom
    }));

    //update the solution graph
    var percentages = futureData
    for (var i = 0; i < percentages.length; i++) {
      percentages[i] = (percentages[i] - bottom) / onePercent;
    }
    console.log("PERCENTAGES " + percentages)
    chart.series[1].setData(percentages);
    chart.series[1].update({ visible: true });


    console.log(pointsData);
  };

  const accuracyOptions = {
    title: {
      text: 'Accuracy',
      style: {
        color: '#ffffff',
        fontSize: '24px',
        fontWeight: 'bold',
      },
    },
    xAxis: {
      categories: dummyData.map((data) => data.date),
    },
    yAxis: {
      title: {
        text: 'Accuracy (%)',
        style: {
          color: '#ffffff',
        },
      },
    },
    series: [
      {
        name: 'Accuracy',
        data: dummyData.map((data) => data.accuracy),
      },
    ],
    legend: {
      enabled: false, // Hide the legend
    },
  };
  
  if(false){
    return (
      <h1> You need to log in </h1>
    );
  }

  return (
    <div className='h-screen '>
      <div className="flex flex-row">

        <div className="w-2/12 h-96">
          <Sidebar/>
        </div>

      
        <div className="w-7/12 mt-5 -ml-12">
          <Chart data={data} />
        </div>


        <div className="w-5/12 pt-5 -ml-10 bg-blue-200">
          <HighchartsReact
            highcharts={Highcharts}
            ref={chartRef}
            constructorType={"chart"}
            options={{
              chart: {
                type: 'line',
                backgroundColor: '#BFDBFE',
              },
              xAxis: {
                title: {
                  text: null,
                },
                visible: false,
                plotLines: [{
                  value: 0, // The y-value where the line is positioned (in this case, at the x-axis)
                  color: 'red', // The color of the line
                  width: 1, // The width of the line
                  zIndex: 3, // The layer order of the line
                }],
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
                  data: [50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50],
                  lineWidth: 2,
                  dragDrop: {
                    draggableX: false,
                    draggableY: true,
                    dragMinY: 0, // minimum y-value allowed for dragged points
                    dragMaxY: 100, // maximum y-value allowed for dragged points
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
              dataLabels: [
                {
                  enabled: false,
                },
                {
                  enabled: false,
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
          
          <div className="flex justify-center mt-4">
            <div
              onClick={handleSubmit}
              className="w-56 items-center justify-center bg-gray-200 hover:bg-gray-400 rounded-md shadow-md cursor-pointer"
            >
              <h1 className="p-5 text-2xl font-bold flex text-center align-middle justify-center">
                Submit
              </h1>
            </div>
            <div
              onClick={handleSubmit}
              className="ml-5 w-56 items-center justify-center bg-gray-200 hover:bg-gray-400 rounded-md shadow-md cursor-pointer"
            >
              <h1 className="p-5 text-2xl font-bold flex text-center align-middle justify-center">
                Skip
              </h1>
            </div>
          </div>
        </div>

      </div>

      <div className="p-5 ml-64 text-2xl font-bold flex h-80 flex flex-col">
        <h1 className='mb-5 ml-8'> Accuracy % over time </h1>
        <HighchartsReact highcharts={Highcharts} options={accuracyOptions} />
      </div>

    </div>
  );
};

export default Game;
