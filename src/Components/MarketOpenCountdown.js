import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone';

const StockMarketInfo = () => {
  const [nextOpeningTime, setNextOpeningTime] = useState('');

  useEffect(() => {
    const getNextOpeningTime = () => {
      const now = moment();
      const nyTime = now.tz('America/New_York');
      const dayOfWeek = nyTime.day();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

      if (isWeekend) {
        const nextMonday = nyTime.clone().day(8);
        const nextOpeningTime = nextMonday.format('LLLL');
        setNextOpeningTime(nextOpeningTime);
      } else if (nyTime.isBefore(nyTime.clone().hour(9).minute(30))) {
        const openingTime = nyTime.clone().hour(9).minute(30);
        const nextOpeningTime = openingTime.format('LLLL');
        setNextOpeningTime(nextOpeningTime);
      } else if (nyTime.isAfter(nyTime.clone().hour(16).minute(0))) {
        const nextDay = nyTime.clone().add(1, 'days').hour(9).minute(30);
        const nextOpeningTime = nextDay.format('LLLL');
        setNextOpeningTime(nextOpeningTime);
      } else {
        const closingTime = nyTime.clone().hour(16).minute(0);
        const nextOpeningTime = closingTime.format('LLLL');
        setNextOpeningTime(nextOpeningTime);
      }
    };

    getNextOpeningTime();
  }, []);

  return (
    <div>
      <h2>Next Opening Time of NYSE</h2>
      <p>{nextOpeningTime}</p>
    </div>
  );
};

export default StockMarketInfo;
