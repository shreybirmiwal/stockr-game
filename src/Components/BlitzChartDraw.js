import React, { useRef } from 'react';
import Highcharts from 'highcharts';
import more from 'highcharts/highcharts-more';
import draggable from 'highcharts/modules/draggable-points';
import HighchartsReact from 'highcharts-react-official';
import { useState } from 'react';

if (typeof Highcharts === 'object') {
  more(Highcharts);
  draggable(Highcharts);
}

function BlitzChartDraw({ ticker }) {

  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const chartRef = useRef(null);
  const currentDate = new Date().toLocaleDateString();
    const options = {
      chart: {
        type: 'line',
        backgroundColor: '#BFDBFE',
        panning: false, // Disable chart panning
        zoomType: '', // Disable chart zooming
      },
      title: {
        text: null,
      },
      xAxis: {
        categories: [
          '9:30',
          '10:00',
          '10:30',
          '11:00',
          '11:30',
          '12:00',
          '12:30',
          '1:00',
          '1:30',
          '2:00',
          '2:30',
          '3:00',
          '3:30',
          '4:00',
        ],
      },
      yAxis: {
        title: {
          text: "% change",
        },
        min: -2,
        max: 2,
        resizable: false, // Disable y-axis resizing
        plotLines: [
              ],
      },
      series: [
        {
          name: '',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          lineWidth: 2,
          dragDrop: {
            draggableX: false,
            draggableY: true,
            dragMinY: -2,
            dragMaxY: 2,
            dragPrecisionY: 0.01,
          },
        },{
          name: 'Market Open',
          data: [0],
          zIndex: 1,
          lineWidth: 4,
          color: 'red',
          radius: 10,
          fillColor: 'red',
        }
      ],
      
      credits: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        series: {},
      },
    };
  
    return (
      <div>
        <div className="flex-grow">
          <div className="flex flex-row mb-5">
            <div className="text-3xl font-bold mt-5">
              <span>{ticker}</span> - <span>{currentDate}</span>
            </div>
            <div className="bg-gray-800 p-5 flex flex-col w-48 ml-auto text-white hover:bg-black">
              <h1>Lock Predictions 🔒</h1>
            </div>
          </div>
  
          <div className="bg-blue-200 flex-grow">
            <HighchartsReact
              highcharts={Highcharts}
              ref={chartRef}
              constructorType={'chart'}
              options={options}
            />
          </div>

  
          <button
            className="w-full bg-yellow-400 text-black font-bold py-2 mt-10"
            onClick={toggleExpand}
          >
            {expanded ? 'Collapse' : 'Leaderboard ⚡⬇️'}
          </button>

          <div>
            {/* Content of the leaderboard */}

            {expanded ? (
                <div className='overflow-scroll h-42'>
                    <div className='bg-gray-800 text-white mt-1 p-5 grid grid-cols-3'>
                        <h1> Shrey Birmiwal </h1>
                        <h1> 79.00% </h1>
                    </div>
                </div>

            ) : (
                <div></div>
            )}


          </div>

        </div>
      </div>
    );
  }
  
  export default BlitzChartDraw;
  