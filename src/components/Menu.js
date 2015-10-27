require('../styles/menu.css');
import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router';
import BurgerMenu from 'react-burger-menu';


class Menu extends React.Component {
  constructor(...args) {
    super(...args);
  }

  render() {
    let Menu = BurgerMenu.slide;
    return (
    <Menu>
      <h2>Deep Ellum Jukebox</h2>
      <Link to={'/'}>
      <Glyphicon glyph="home" /><span>Home</span>
      </Link>
      <Link to={'/search'}>
      <Glyphicon glyph="search" /><span>Search</span>
      </Link>
      <Link to={'/recent'}>
      <Glyphicon glyph="time" /><span>Recent</span>
      </Link>
    </Menu>
    );
  }
}

export default Menu;
