import React, { useRef } from 'react';
import Highcharts from 'highcharts';
import more from 'highcharts/highcharts-more';
import draggable from 'highcharts/modules/draggable-points';
import HighchartsReact from 'highcharts-react-official';

if (typeof Highcharts === 'object') {
  more(Highcharts);
  draggable(Highcharts);
}

function BlitzChartDraw({ ticker }) {
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
        text: null,
      },
      min: -2,
      max: 2,
      resizable: false, // Disable y-axis resizing
      plotLines: [
        {
          value: 0,
          color: 'red',
          width: 1,
          zIndex: 3,
        },
      ],
    },
    series: [
      {
        name: '',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        lineWidth: 2,
        dragDrop: {
          draggableX: false,
          draggableY: true,
          dragMinY: -2,
          dragMaxY: 2,
          dragPrecisionY: .01,
        },
        point: {
            events: {
              drag: function (e) {
                // Prevent dragging the first point
                if (this.index === 0) {
                  return false;
                }
              },
              drop: function (e){
                if(this.index === 0){
                    return false;
                }
              }
            },
          },
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
    <div className="flex-grow">
      <div className="text-3xl font-bold mb-5">
        <span>{ticker}</span> - <span>{currentDate}</span>
      </div>

      <div className="bg-blue-200 flex-grow">
        <HighchartsReact
          highcharts={Highcharts}
          ref={chartRef}
          constructorType={'chart'}
          options={options}
        />
      </div>
    </div>
  );
}

export default BlitzChartDraw;
