const express = require('express');
const axios = require('axios');
const _ = require('lodash');
const moment = require('moment');
const router = express.Router();

const filterData = (flightData, originCity, destinationCity, date1) => {
  let MultiFlights = [];
  let originflightsArray = [];
  let destinationflightsArray = [];
  const date = moment(date1).isValid()
    ? moment(date1).format('YYYY/MM/DD')
    : '';
  const directFlightData = flightData.filter(
    (item) =>
      item.origin === originCity &&
      item.destination === destinationCity &&
      (date ? item.date == date : true)
  );
  const indirectFlighData = flightData.filter((item) => {
    if (item.origin === originCity && item.destination === destinationCity) {
      return false;
    } else {
      return date ? item.date == date : item;
    }
  });
  let originFlighData = indirectFlighData.filter(
    (item) => item.origin === originCity
  );
  let destinationFlighData = indirectFlighData.filter(
    (item) => item.destination === destinationCity
  );
  originFlighData.sort((e, f) =>
    moment.duration(moment(`${e.date} ${e.arrivalTime}`)) >
    moment.duration(moment(`${f.date} ${f.arrivalTime}`))
      ? 1
      : -1
  );
  destinationFlighData.sort((e, f) =>
    moment.duration(moment(`${e.date} ${e.departureTime}`)) >
    moment.duration(moment(`${f.date} ${f.departureTime}`))
      ? 1
      : -1
  );
  for (let i = 0; i < originFlighData.length; i++) {
    for (let j = 0; j < destinationFlighData.length; j++) {
      let journeyTimestart = moment(
        `${originFlighData[i].date} ${originFlighData[i].arrivalTime}`
      );
      let journeyTimeend = moment(
        `${destinationFlighData[j].date} ${destinationFlighData[j].departureTime}`
      );
      let totaljourneyTime = journeyTimeend.diff(
        journeyTimestart,
        'DD/MM/YYYY HH:mm:ss'
      );
      totaljourneyTime = moment.duration(totaljourneyTime);
      if (
        originFlighData[i].destination === destinationFlighData[j].origin &&
        originFlighData[i].date === destinationFlighData[j].date &&
        totaljourneyTime.minutes() >= 30
      ) {
        if (
          !originflightsArray.includes(originFlighData[i].flightNo) &&
          !destinationflightsArray.includes(destinationFlighData[j].flightNo)
        ) {
          MultiFlights.push([originFlighData[i], destinationFlighData[j]]);
          originflightsArray.push(originFlighData[i].flightNo);
          destinationflightsArray.push(destinationFlighData[j].flightNo);
        }
      }
    }
  }
  return [...directFlightData, ...MultiFlights];
};
/* GET users listing. */
router.get('/flightdata', async (req, res) => {
  try {
    const resp = await axios.get(
      'https://tw-frontenders.firebaseio.com/advFlightSearch.json'
    );
    if (resp.data) {
      res.send(resp.data);
    } else throw new Error({ message: 'Something Went Wrong!!' });
  } catch (error) {
    _.nodeErrHandler(res, err);
  }
});

router.post('/search', async (req, res) => {
  try {
    const params = req.body;
    const {
      originCity,
      destinationCity,
      returnDate,
      departureDate,
    } = params.formData;
    const returnDataFlag = params.returnDataFlag;
    const resp = await axios.get(
      'https://tw-frontenders.firebaseio.com/advFlightSearch.json'
    );
    if (resp.data) {
      let returnFlightData = [];
      const filteredFlightData = filterData(
        resp.data,
        originCity,
        destinationCity,
        departureDate
      );
      if (returnDataFlag) {
        returnFlightData = filterData(
          resp.data,
          destinationCity,
          originCity,
          returnDate
        );
      }
      res.send({
        flightOneWayData: filteredFlightData,
        returnFlightData: returnFlightData,
      });
    } else throw new Error({ message: 'Something Went Wrong!!' });
  } catch (error) {
    _.nodeErrHandler(res, err);
  }
});

router.get('/dropdown', async (req, res) => {
  try {
    const resp = await axios.get(
      'https://tw-frontenders.firebaseio.com/advFlightSearch.json'
    );
    if (resp.data) {
      let unique = [...new Set(resp.data.map((item) => item.origin))];
      let data = unique.map((item) => {
        return { label: item, value: item };
      });
      res.send(data);
    } else throw new Error({ message: 'Something Went Wrong!!' });
  } catch (error) {
    _.nodeErrHandler(res, err);
  }
});

module.exports = router;
