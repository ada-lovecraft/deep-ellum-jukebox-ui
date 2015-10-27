import React from 'react';
import LocationStore from '../stores/LocationStore';
import LocationActions from '../actions/LocationActions';

class LocationsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = LocationStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentWillUnmount() {
    LocationStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  componentDidMount() {
    LocationStore.listen(this.onChange);
    LocationActions.fetchLocations();
  }

  render() {
    if (this.state.errorMessage) {
      return (
        <div>Something is wrong</div>
      );
    }

    if (!this.state.locations.length) {
      return (
        <div>
          <img src="/my-cool-spinner.gif" />
        </div>
      )
    }

    return (
      <ul>
        {this.state.locations.map((location) => {
          return (
            <li>{location.name}</li>
          );
        })}
      </ul>
    );
  }
}

LocationsComponent.defaultProps = {

};

export default LocationsComponent;
