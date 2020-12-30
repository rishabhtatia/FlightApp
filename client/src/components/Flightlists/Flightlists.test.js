import React from 'react';
import renderer from 'react-test-renderer';

import Flightlists from './Flightlists';

it('renders when there is one item each for single and multi flights', () => {
  const item = [
    {
      arrivalTime: '10:20',
      date: '2020/11/01',
      departureTime: '8:10',
      destination: 'Delhi (DEL)',
      flightNo: 'AI-104',
      name: 'Air India',
      origin: 'Pune (PNQ)',
      price: 4681,
    },
    [
      {
        arrivalTime: '7:10',
        date: '2020/11/01',
        departureTime: '6:10',
        destination: 'Mumbai (BOM)',
        flightNo: 'AI-103',
        name: 'Air India',
        origin: 'Pune (PNQ)',
        price: 2537,
      },
      {
        arrivalTime: '11:30',
        date: '2020/11/01',
        departureTime: '9:00',
        destination: 'Delhi (DEL)',
        flightNo: 'AI-110',
        name: 'Air India',
        origin: 'Mumbai (BOM)',
        price: 4137,
      },
    ],
  ];
  const tree = renderer.create(<Flightlists data={item} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders when there is one item for single flight  and zero for multi flights', () => {
  const item = [
    {
      arrivalTime: '10:20',
      date: '2020/11/01',
      departureTime: '8:10',
      destination: 'Delhi (DEL)',
      flightNo: 'AI-104',
      name: 'Air India',
      origin: 'Pune (PNQ)',
      price: 4681,
    },
    [],
  ];
  const tree = renderer.create(<Flightlists data={item} />).toJSON();
  expect(tree).toMatchSnapshot();
});
