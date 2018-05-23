import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import { config } from '../config';
import Form from './components/Form';
import ChargePointsMap from './components/ChargePointsMap';

import './index.css';

class App extends Component {
  state = {
    message: '',
    success: false,
    isLoggedIn: false
  };

  handleSubmit = data => {
    const { username, password } = data;

    axios.post(config.localUrl, { username, password })
      .then(response => {
        if (response.data.error) {
          const message = `Error: ${response.data.error_description}`;

          this.setState({ message, success: false });
        } else {
          const { firstName, lastName } = response.data;
          const message = `Hi ${firstName} ${lastName}!`;

          this.setState({ isLoggedIn: true, message, success: true });
        }
      })
      .catch(error => {
        let statusText = '';

        if (error.response && error.response.statusText) {
          statusText = error.response.statusText;
        } else {
          statusText = 'Something went wrong...';

          console.warn('Is the webserver running?');
        }

        this.setState({ message: statusText, success: false });
      });
  }

  renderContent = () => {
    const { isLoggedIn } = this.state;
    const mapProps = {
      defaultZoom: 8,
      defaultCenter: { lat: 52.367984, lng: 4.897242 }
    };
    let result = null;

    if (isLoggedIn) {
      // User successfully logged in, so then we load the map endpoints
      const chargePoints = require('../mock-chargepoints.json');

      result = (
        <Fragment>
          <h2 className="map-header">List of chargepoints</h2>
          <ChargePointsMap mapProps={mapProps} userData={chargePoints} />
        </Fragment>
      );
    } else {
      result = <Form onSubmit={this.handleSubmit} />
    }

    return result;
  }

  render() {
    const { message, success, isLoggedIn } = this.state;
    const statusClassName = success ? 'success' : '';

    return (
      <Fragment>
        {
          !isLoggedIn
            ? <h3 className="h3 mb-3 font-weight-normal">Please sign in</h3>
            : null
        }

        {message.length
            ? <div className={`message-box ${statusClassName}`}>{message}</div>
            : null
        }

        {this.renderContent()}
      </Fragment>
    );
  }
}

export default App;
