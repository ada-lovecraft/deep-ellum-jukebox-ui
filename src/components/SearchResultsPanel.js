import React from 'react';
import { Row, Col } from 'react-bootstrap';
import SearchResultsThumb from './SearchResultsThumb';
import _ from 'lodash';

var SearchResultsPanel = function ({gridItems, viewport}) {
  return (
  <div>
    {_.map(gridItems, function (item, index) {
       console.log(`item #${index}:`, item);
       return (
       <SearchResultsThumb item={item}
         key={item.id}
         viewport={viewport} />
       )
     })}
  </div>)
};

export default SearchResultsPanel;
