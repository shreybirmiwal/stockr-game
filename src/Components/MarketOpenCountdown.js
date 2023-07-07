import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone';

const StockMarketInfo = () => {
  const [nextOpeningTime, setNextOpeningTime] = useState('');
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const calculateCountdown = () => {
      const now = moment();
      const nyTime = now.tz('America/New_York');
      const dayOfWeek = nyTime.day();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

      if (isWeekend) {
        const nextMonday = nyTime.clone().day(8).hour(9).minute(30);
        const diff = nextMonday.diff(now);
        const duration = moment.duration(diff);
        const countdown = `${duration.days()} days, ${duration.hours()} hours, ${duration.minutes()} minutes`;
        setCountdown(countdown);
      } else if (nyTime.isBefore(nyTime.clone().hour(9).minute(30))) {
        const openingTime = nyTime.clone().hour(9).minute(30);
        const diff = openingTime.diff(now);
        const duration = moment.duration(diff);
        const countdown = `${duration.hours()} hours, ${duration.minutes()} minutes`;
        setCountdown(countdown);
      } else if (nyTime.isAfter(nyTime.clone().hour(16).minute(0))) {
        const nextDay = nyTime.clone().add(1, 'days').hour(9).minute(30);
        const diff = nextDay.diff(now);
        const duration = moment.duration(diff);
        const countdown = `${duration.days()} days, ${duration.hours()} hours, ${duration.minutes()} minutes`;
        setCountdown(countdown);
      } else {
        const closingTime = nyTime.clone().hour(16).minute(0);
        const diff = closingTime.diff(now);
        const duration = moment.duration(diff);
        const countdown = `${duration.hours()} hours, ${duration.minutes()} minutes`;
        setCountdown(countdown);
      }
    };

    const getNextOpeningTime = () => {
      const now = moment();
      const nyTime = now.tz('America/New_York');
      const dayOfWeek = nyTime.day();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

      if (isWeekend) {
        const nextMonday = nyTime.clone().day(8).hour(9).minute(30);
        setNextOpeningTime(nextMonday.format('LLLL'));
      } else if (nyTime.isBefore(nyTime.clone().hour(9).minute(30))) {
        const openingTime = nyTime.clone().hour(9).minute(30);
        setNextOpeningTime(openingTime.format('LLLL'));
      } else if (nyTime.isAfter(nyTime.clone().hour(16).minute(0))) {
        const nextDay = nyTime.clone().add(1, 'days').hour(9).minute(30);
        setNextOpeningTime(nextDay.format('LLLL'));
      } else {
        const closingTime = nyTime.clone().hour(16).minute(0);
        setNextOpeningTime(closingTime.format('LLLL'));
      }
    };

    calculateCountdown();
    getNextOpeningTime();

    const timer = setInterval(() => {
      calculateCountdown();
      getNextOpeningTime();
    }, 60000); // Update every minute

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div >
      <h2>NYSE open: {nextOpeningTime}</h2>

      <div className='bg-gray-800 p-5 text-white mt-5 mb-5'>
         <h2>{countdown} till blitz predictions lock 🔒 </h2>
      </div>
    </div>
  );
};

export default StockMarketInfo;
