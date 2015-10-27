import React from 'react';
import _ from 'lodash';
import SearchResultsPanel from './SearchResultsPanel';
import { Grid } from 'react-bootstrap';


var SearchResults = function ({tracks, viewport}) {
  let chunkSize = Math.floor(viewport.height / 200);
  let chunks = _.chunk(tracks, chunkSize);
  return (
  <SearchResultsPanel key={`search-results-row`}
    viewport={viewport}
    gridItems={chunks[ 0 ]} />
  )
};

export default SearchResults;
