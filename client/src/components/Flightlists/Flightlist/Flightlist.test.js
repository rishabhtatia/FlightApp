import React from 'react';
import renderer from 'react-test-renderer';

import Flightlist from './Flighlist';

it('renders when there is one item', () => {
  const item = {
    arrivalTime: '10:20',
    date: '2020/11/01',
    departureTime: '8:10',
    destination: 'Delhi (DEL)',
    flightNo: 'AI-104',
    name: 'Air India',
    origin: 'Pune (PNQ)',
    price: 4681,
  };
  const tree = renderer.create(<Flightlist data={item} />).toJSON();
  expect(tree).toMatchSnapshot();
});
