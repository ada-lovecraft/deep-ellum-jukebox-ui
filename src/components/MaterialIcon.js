import React from 'react';
import {FontIcon, Styles} from 'material-ui';
let {Colors} = Styles;

class MaterialIcon extends React.Component {
  render() {
    return (
      <FontIcon className='material-icons' color={Colors[this.props.color]}>{this.props.icon}</FontIcon>
    );

  }
}

export default MaterialIcon;
