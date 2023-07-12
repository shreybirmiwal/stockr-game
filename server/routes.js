const express = require('express');
const router = express.Router()
var smc = require('stock-market-clock');

router.get('/first', (req, res) => {
    res.json({ message: "first"});
});


//if it is a trading day, show current chart
//return [true, nexttradingday]

//if it is not a trading day, show the next chart
// return [false, nexttradingday]

router.get('/trading_day', (req, res) => {

    //marketTimeData(isoString, skipFindNext=false)
    //console.log(smc.marketTimeData("2023-09-23T19:59:00.000Z"))
    res.json(smc.marketTimeData("2023-07-12T19:59:00.000Z"))
    
})

module.exports = router;