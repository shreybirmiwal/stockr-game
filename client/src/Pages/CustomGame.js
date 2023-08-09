import React, { useState, useEffect, useRef } from 'react';
import Chart from '../chart/Chart';
import Highcharts from "highcharts";
import more from "highcharts/highcharts-more";
import draggable from "highcharts/modules/draggable-points";
import HighchartsReact from "highcharts-react-official";
import Sidebar from '../Components/Sidebar';
import Popup from 'reactjs-popup';
import { collection, getDoc, setDoc, doc, query, updateDoc } from "firebase/firestore";
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';


if (typeof Highcharts === "object") {
  more(Highcharts);
  draggable(Highcharts);
}

const CustomGame = () => {
  const { user } = UserAuth();


  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null);
  const [dataHigh, setDataHigh] = useState();
  const [dataLow, setDataLow] = useState();
  const [futureData, setFutureData] = useState()
  const chartRef = useRef(null);

  const [nameInput, setNameInput] = useState()

  var tempLow = 99999999;
  var tempHigh = -999999999;
  var tempLast = 0;

  const [PopOpen, setPopOpen] = useState(true);
  const [accuracyPop, SetAccuracyPop] = useState(0);
  const [accuracyData, setAccuracyData] = useState([])
  const [authUser, setAuthUser] = useState(null);

  const [first_second_third_place, setPos] = useState(["N/A", "N/A", "N/A"])
  const [first_second_third_place_VAL, setVals] = useState(["N/A", "N/A", "N/A"])

  const getLeaderBoardData = async () => {
    //Get places:
    const leaderboardData = await getDoc(doc(db, "fishbowl", "leaderboard"));
    const leaderboardData1 = leaderboardData.data()

    const sortedKeys = Object.entries(leaderboardData1)
      .sort(([, valueA], [, valueB]) => valueB - valueA)
      .map(([key]) => key);

    const sortedValues = Object.entries(leaderboardData1)
      .sort(([, valueA], [, valueB]) => valueB - valueA)
      .map(([, value]) => value);
    

    setPos(sortedKeys)
    setVals(sortedValues)
  }

  useEffect(() => {

    const fetchData = async () => {
      getLeaderBoardData()



      getDataInitial();
      const user = await new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          unsubscribe();
          resolve(user);
        }, reject);
      });
  
      if (user) {
        setAuthUser(user);

        const snap = await getDoc(doc(db, "stats", "users"));
        const dataT1 = snap.data()?.[user.uid];
        
        if (dataT1) {

          setAccuracyData(dataT1);
        } else {
        }
        
      

      } else {
        setAuthUser(null);
      }
    };
  
    fetchData();
  
    return () => {
      // Cleanup function
    };
  }, []);
  



  const getDataInitial = async() => {
    setLoading(true)
    fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&outputsize=full&apikey=demo')
      .then(response => response.json())
      .then(data => {
        const transformedData = transformData(data);
        setData(transformedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
      setLoading(false)
  }

  const transformData = (apiData) => {
    const timeSeriesData = apiData['Time Series (Daily)'];
    const randomNumber = Math.floor(Math.random() * 6001); // Generate a random number between 0 and 6000
    const entries = Object.entries(timeSeriesData);
    const slicedEntries = entries.slice(randomNumber);
    const modifiedTimeSeriesData = Object.fromEntries(slicedEntries);
        
    const transformedData = [];
    let count = 0;

    var first = true
    var second  = false
    var firstDate;
    var secondDate;

    for (const date in modifiedTimeSeriesData) {
      if(first){
        if (modifiedTimeSeriesData.hasOwnProperty(date)) {
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
      
        if (modifiedTimeSeriesData.hasOwnProperty(date)) {
          const { '1. open': open, '2. high': high, '3. low': low, '4. close': close, '6. volume': volume } = modifiedTimeSeriesData[date];
          const formattedDate = new Date(date);

          if (parseFloat(low) < parseFloat(tempLow)) {
            tempLow = parseFloat(low);
          }
          if (parseFloat(high) > parseFloat(tempHigh)) {
            //console.log("NEW HIGH " + high + " temphigh: " + tempHigh)
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

    setDataLow(tempLow)
    setDataHigh(tempHigh)

    transformedData.reverse();
    var future20 = transformedData.splice(-20);
    future20 = future20.map(item => item.close);
    setFutureData(future20)

    //console.log("DATA : " + transformedData)
    //console.log("FUTURE : " + future20)
    return transformedData;
  };


  if (data === null) {
    return(
    <div>
      <div className="flex flex-row">

        <div className="w-2/12 h-96">
          <Sidebar/>
        </div>


        <div className="w-7/12 mt-5 text-4xl ">
          Loading...
        </div>
      
      </div>

    
    </div>
    );
  }

  const handleNewPuzzle = () => {
    const chart = chartRef.current.chart;
    chart.series[0].setData([50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50])
    chart.series[0].update({ visible: true });

    chart.series[1].update({ visible: false });
    chart.series[2].update({ visible: false });


    // add to stats bar graph
    //if add needs to play play ad
    //close pop up
    getDataInitial()

    setTimeout(() => {
      SetAccuracyPop(0)
      setPopOpen(false)
    }, 2000); // Delay of 2000 milliseconds (2 seconds)

  }

  const handleNameInput = (e) => {
    setNameInput(e.target.value);
  };

  const handleSubmit = async () => {
    if(loading) return;
    const chart = chartRef.current.chart;

    var onePercent = parseFloat((dataHigh - dataLow) / 100.0);
    var bottom = parseFloat(dataLow);

    //console.log("ONE PERCENT " + onePercent)
    //console.log("BOTTOM " + bottom)

    // Get the data from the draggable points
    const pointsData = chart.series[0].points.map((point) => ({
      x: point.x,
      y: point.y,
      z: ((point.y*onePercent)+bottom).toFixed(2)
    }));

    //update the solution graph
    var percentages = futureData
    for (var i = 0; i < percentages.length; i++) {
      percentages[i] = (percentages[i] - bottom) / onePercent;
    }
    //console.log("ACTUAL PERCENTAGES " + percentages)
    chart.series[1].setData(percentages);
    chart.series[1].update({ visible: true });

    //find difference between y values and percentages
      var sum = 0;
      for (var i = 0; i < percentages.length; i++) {
        var deviation = Math.abs(percentages[i] - pointsData[i].y);
        sum += deviation;
      }
      var averageDeviation = sum / percentages.length;

      // Assign a score value
      var score = (100 - averageDeviation).toFixed(2); // Example score calculation, adjust as needed

      const updatedData = [...accuracyData, { Accuracy: score }];
      setAccuracyData(updatedData);
      //console.log(updatedData)
        var intScore = Number(score)

        const tempEg = `fishbowl/leaderboard`;
        const docSnap = await getDoc(doc(db, tempEg));
        if(docSnap.exists()){
          updateDoc(doc(db, tempEg), {
            [nameInput] : intScore
          })
        }

      setNameInput("")
      getLeaderBoardData()

    setTimeout(() => {
      SetAccuracyPop(score)
      setPopOpen(true)

      //solution
      chart.series[1].setData(percentages);
      chart.series[1].update({ visible: true });

      chart.series[0].update({ visible: false });

      //your responce
      const yValues = pointsData.map((point) => point.y);
      chart.series[2].setData(yValues);
      chart.series[2].update({ visible: true });
    }, 5);
    
  };
  
  return (
    <div className='h-screen '>

      <Popup open={PopOpen} onClose={() => setPopOpen(false)} closeOnDocumentClick={false}>
        <div className='bg-gray-800 w-72 h-56 rounded-md'>
          <p className='font-bold flex-row flex justify-center align-middle pt-10 text-white'>
            You scored {accuracyPop}%
          </p>

          <input
              className='pt-5 pb-5 text-center w-full mt-3 bg-slate-500'
              placeholder="Name"
              value={nameInput}
              onChange={handleNameInput}
          />

          <button className='block mx-auto mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' onClick={handleNewPuzzle}>
            New Puzzle
          </button>
        </div>
      </Popup>

      <div className="flex flex-row">

        <div className="w-2/12 h-96">
          <Sidebar/>
        </div>

      
        <div className="w-7/12 mt-5 -ml-12">
          <Chart data={data} 
              mouseMoveEvent={false}
              panEvent={false}
              zoomEvent={false}
              clamp={false}
            />
        </div>


        <div className="w-5/12 pt- bg-blue-200">
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
                {
                  name: 'Your entry',
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

            <div>

      </div>

          </div>
        </div>

      </div>

      <div className="p-5 ml-64 text-2xl font-bold h-80 grid grid-cols-3 flex items-end">

          <div className='bg-yellow-800 h-1/3 text-center pt-3'>
            <p>3rd Place</p>
            <p>{first_second_third_place[2]} - {first_second_third_place_VAL[2]}%</p>
          </div>
          <div className='bg-amber-300 h-full text-center pt-3'>
            <p>1rd Place</p>
            <p>{first_second_third_place[0]} - {first_second_third_place_VAL[0]}%</p>
          </div>
          <div className='bg-zinc-400 h-2/3 text-center pt-3'>
            <p>2rd Place</p>
            <p>{first_second_third_place[1]} - {first_second_third_place_VAL[1]}%</p>
          </div>
      </div>


    </div>
  );
};

export default CustomGame;
