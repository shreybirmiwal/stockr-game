import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import more from 'highcharts/highcharts-more';
import draggable from 'highcharts/modules/draggable-points';
import HighchartsReact from 'highcharts-react-official';
import { useState } from 'react';
import { collection, getDoc, setDoc, doc, query, updateDoc } from "firebase/firestore";
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';

if (typeof Highcharts === 'object') {
  more(Highcharts);
  draggable(Highcharts);
}

function BlitzChartDraw({ ticker, currentDate }) {
  const { user } = UserAuth();
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleSubmit = () => {
    const tempEg = `blitz/${currentDate}-${ticker}`; // Modify the document reference
  
    const userID = user.uid;
    const yValues = chartRef.current.chart.series[0].points.map((point) => point.y);
    yValues.push(50)

    updateDoc(doc(db, tempEg), {
      [userID]: yValues
    })
      .then(() => {
        console.log('Document successfully written!');
      })
      .catch((error) => {
        console.error('Error writing document:', error);
      });
  };

  const chartRef = useRef(null);

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
        min: -1,
        max: 1,
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
            dragMinY: -1,
            dragMaxY: 1,
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
        },
        {
          name: 'Live data',
          data: [],
          lineWidth: 2,
          dragDrop: {
            draggableX: false,
            draggableY: false,
          },
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

    useEffect(() => {
      const tempEg = `blitz/${currentDate}-${ticker}`;
     
      const getActualData = async () => {
        
        try {
          const docSnap = await getDoc(doc(db, tempEg));
          if (docSnap.exists()) {
            const actualData = docSnap.data().actual;
            
            const chart = chartRef.current.chart;
            chart.series[2].setData(actualData); // Update 'Live data' series with actualData
    
            console.log('Actual data:', actualData);
            
          } else {
            console.log('No document exists.');
          }
        } catch (error) {
          console.error('Error getting document:', error);
        }
      };
    
      getActualData();
    }, []);
  
    return (
      <div>
        <div className="flex-grow">
          <div className="flex flex-row mb-5">
            <div className="text-3xl font-bold mt-5">
              <span>{ticker}</span> - <span>{currentDate}</span>
            </div>
            <div onClick={handleSubmit} className="bg-gray-800 p-5 flex flex-col w-48 ml-auto text-white hover:bg-black">
              <h1>Submit/Update Predictions ⚡</h1>
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
            {expanded ? 'Collapse' : 'Leaderboard ⬇️'}
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
  