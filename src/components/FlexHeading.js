require('../styles/flex-heading.css')

import React from 'react';
import _ from 'lodash';

var FlexHeading = function (props) {
  return (
  <h1 className="flex-heading">{props.children}</h1>
  )
};

export default FlexHeading;
