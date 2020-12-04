import React from 'react';
import renderer from 'react-test-renderer';

import Multipleflights from './Multipleflights';

it('renders when there is one item', () => {
  const item = [
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
  ];
  const tree = renderer
    .create(<Multipleflights flightListing={item} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
