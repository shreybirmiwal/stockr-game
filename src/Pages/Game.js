import React from 'react';
import Chart from '../chart/Chart';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&outputsize=full&apikey=demo')
      .then(response => response.json())
      .then(data => {
        const transformedData = this.transformData(data);
        this.setState({ data: transformedData });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  
  transformData(apiData) {
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
    const future20 = (transformedData.splice(-20))
    console.log(transformedData)
    console.log(future20)
    return transformedData;
  }
  

  render() {
    if (this.state.data === null) {
      return <div>Loading...</div>;
    }
    return(
      <div>
          <Chart data={this.state.data} />
          <div></div>
      </div>
    ) ;
  }
}

export default Game;
