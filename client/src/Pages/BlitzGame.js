import React from 'react';
import MarketOpenCountdown from '../Components/MarketOpenCountdown';
import BlitzChartDraw from '../Components/BlitzChartDraw';


useEffect(() => {

    /* 
      - When market closes, load up next chart
      - Load for each document in firebase
      
    */

      fetch('/api/trading_day')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Log the response data
        // Continue with your code
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle error
      });
}, []);


function BlitzGame() {
  return (
    <div className="m-10 flex flex-grow flex-col">
      <div className="mb-2">
        <MarketOpenCountdown />
      </div>
      <BlitzChartDraw ticker={"SPY"} currentDate={"2023-07-07"} />
    </div>
  );
}

export default BlitzGame;