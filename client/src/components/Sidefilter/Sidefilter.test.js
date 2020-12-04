import React from 'react';
import renderer from 'react-test-renderer';

import Sidefilter from './Sidefilter';

it('rendering with nothing passed', () => {
  const tree = renderer.create(<Sidefilter />).toJSON();
  expect(tree).toMatchSnapshot();
});
