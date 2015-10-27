import React from 'react';
import _ from 'lodash';
import shallowEqual from 'shallowequal';

export default function watchViewport(Component, breakpoints) {

  return class WatchViewport extends React.Component {
  constructor(props) {
    super(props);
    let viewport = {width: 320, height: 568, name: ''};
    viewport = this.getViewport();

    this.state = {viewport: viewport}
  }

  componentDidMount() {
    this.debouncedOnResize = _.debounce(() => {
      this.onResize();
    }, 100);

    window.addEventListener('resize', this.debouncedOnResize, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.debouncedOnResize);
  }

  getViewport() {
    let viewportName = '';
    let windowWidth = window.innerWidth;

    if ( breakpoints ) {
      Object.keys(breakponts).some(breakpoint => {
        if ( windowWidth <= breakpoints[ breakpoint ] ) {
          viewportName = breakpoint;
          return true;
        }
      });
    }

    return {
      width: windowWidth,
      height: window.innerHeight,
      name: viewportName
    };
  }

  onResize() {
    let viewport = this.getViewport()

    if ( this.state.viewport.width !== viewport.width ||
      this.state.viewport.height !== viewport.height ) {
      this.setState({viewport: viewport});
    }

  }

  render() {
    return <Component {...this.props} viewport={this.state.viewport} />
  }
  }
}
