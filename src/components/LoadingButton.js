import React from 'react';
import { Button } from 'react-bootstrap';


class LoadingButton extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {isLoading: false}
  }


  render() {
    let isLoading = this.state.isLoading;
    let style = this.props.bsStyle || 'default';
    let loadingText = this.props.loadingText;
    return (
    <Button bsStyle={style}
      disabled={isLoading}
      onClick={!isLoading ? this.handleClick : null}>
      {isLoading ? loadingText : this.props.children}
    </Button>
    );
  }
}

export default LoadingButton;
