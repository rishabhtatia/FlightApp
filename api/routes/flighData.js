const express = require('express');
const axios = require('axios');
const _ = require('lodash');
const moment = require('moment');
const router = express.Router();

const calculateTimeDifference = (date1, time1, date2, time2) => {
  const journeyTimestart = moment(`${date1} ${time1}`);
  const journeyTimeend = moment(`${date2} ${time2}`);
  let totaljourneyTime = journeyTimeend.diff(
    journeyTimestart,
    'YYYY/MM/DD HH:mm:ss'
  );
  totaljourneyTime = moment.duration(totaljourneyTime);
  return {
    timeInMinutes: totaljourneyTime.asMinutes(),
    FormatedTime: `${totaljourneyTime.hours()}h:${totaljourneyTime.minutes()}m`,
  };
};

const filterData = (
  flightData,
  originCity,
  destinationCity,
  flightDate,
  passengers
) => {
  const numberOfPassengers = parseInt(passengers) ? parseInt(passengers) : 1;
  let MultiFlights = [];
  let originflightsArray = [];
  let destinationflightsArray = [];
  const date = moment(flightDate).isValid()
    ? moment(flightDate).format('YYYY/MM/DD')
    : '';
  let directFlightData = flightData.filter(
    (item) =>
      item.origin === originCity &&
      item.destination === destinationCity &&
      (date ? item.date == date : true)
  );
  directFlightData = directFlightData.map((item) => {
    const diff = calculateTimeDifference(
      item.date,
      item.departureTime,
      item.date,
      item.arrivalTime
    );
    return {
      ...item,
      journeyTime: diff.FormatedTime,
      price: item.price * numberOfPassengers,
    };
  });
  const indirectFlighData = flightData.filter((item) => {
    if (item.origin === originCity && item.destination === destinationCity) {
      return false;
    } else {
      return date ? item.date == date : item;
    }
  });
  let originFlightData = indirectFlighData.filter(
    (item) => item.origin === originCity
  );
  let destinationFlightData = indirectFlighData.filter(
    (item) => item.destination === destinationCity
  );
  originFlightData.sort((e, f) =>
    moment.duration(moment(`${e.date} ${e.arrivalTime}`)) >
    moment.duration(moment(`${f.date} ${f.arrivalTime}`))
      ? 1
      : -1
  );
  destinationFlightData.sort((e, f) =>
    moment.duration(moment(`${e.date} ${e.departureTime}`)) >
    moment.duration(moment(`${f.date} ${f.departureTime}`))
      ? 1
      : -1
  );
  for (let i = 0; i < originFlightData.length; i++) {
    for (let j = 0; j < destinationFlightData.length; j++) {
      let diff = calculateTimeDifference(
        originFlightData[i].date,
        originFlightData[i].arrivalTime,
        destinationFlightData[j].date,
        destinationFlightData[j].departureTime
      );
      if (
        originFlightData[i].destination === destinationFlightData[j].origin &&
        originFlightData[i].date === destinationFlightData[j].date &&
        diff.timeInMinutes >= 30
      ) {
        if (
          !originflightsArray.includes(originFlightData[i].flightNo) &&
          !destinationflightsArray.includes(destinationFlightData[j].flightNo)
        ) {
          const totaDurationofJourney = calculateTimeDifference(
            originFlightData[i].date,
            originFlightData[i].departureTime,
            destinationFlightData[j].date,
            destinationFlightData[j].arrivalTime
          );
          const journeyTimeStart = calculateTimeDifference(
            originFlightData[i].date,
            originFlightData[i].departureTime,
            originFlightData[i].date,
            originFlightData[i].arrivalTime
          );
          const journeyTimeEnd = calculateTimeDifference(
            destinationFlightData[j].date,
            destinationFlightData[j].departureTime,
            destinationFlightData[j].date,
            destinationFlightData[j].arrivalTime
          );
          MultiFlights.push([
            {
              ...originFlightData[i],
              price: originFlightData[i].price * numberOfPassengers,
              journeyTime: journeyTimeStart.FormatedTime,
              totaDurationofJourney: totaDurationofJourney.FormatedTime,
              layoverTime: diff.FormatedTime,
            },
            {
              ...destinationFlightData[j],
              price: destinationFlightData[j].price * numberOfPassengers,
              journeyTime: journeyTimeEnd.FormatedTime,
            },
          ]);
          originflightsArray.push(originFlightData[i].flightNo);
          destinationflightsArray.push(destinationFlightData[j].flightNo);
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
    _.nodeErrHandler(res, error);
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
      passengers,
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
        departureDate,
        passengers
      );
      if (returnDataFlag) {
        returnFlightData = filterData(
          resp.data,
          destinationCity,
          originCity,
          returnDate,
          passengers
        );
      }
      res.send({
        flightOneWayData: filteredFlightData,
        returnFlightData: returnFlightData,
      });
    } else throw new Error({ message: 'Something Went Wrong!!' });
  } catch (error) {
    _.nodeErrHandler(res, error);
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
    _.nodeErrHandler(res, error);
  }
});

module.exports = router;
