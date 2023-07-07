import React from 'react';
import MarketOpenCountdown from '../Components/MarketOpenCountdown';
import BlitzChartDraw from '../Components/BlitzChartDraw';

function BlitzGame() {
  return (
    <div className="m-10 flex flex-grow flex-col">
      <div className="mb-2">
        <MarketOpenCountdown />
      </div>
      <BlitzChartDraw ticker={"$SPY"} />
    </div>
  );
}

export default BlitzGame;