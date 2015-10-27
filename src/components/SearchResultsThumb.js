import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Hatchshow, BigText } from '../components';


class SearchResultsThumb extends React.Component {
  constructor(...args) {
    super(...args);
  }
  render() {
    let item = this.props.item;
    return (
    <Row className='search-results-grid-item' style={{  backgroundImage: `url('${item.coverLarge}')`}}>
      <Col xs={6}>
        <BigText>
          {_.map(item.albumArtist.split(' '), (text, index) => ( <span key={index}>{text}</span>))}
        </BigText>
      </Col>
      <Col xs={6}>
        {_.map(item.title.split(' '), (text, index) => ( <BigText key={index} text={text} /> ))}
      </Col>
    </Row>
    );
  }
}

export default SearchResultsThumb;
