import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import { config } from './config';
import Form from './Form';
import ChargePointsMap from './ChargePointsMap';

import './index.css';

class App extends Component {
  state = {
    message: '',
    success: false,
    isLoggedIn: false
  };

  handleSubmit = data => {
    const { username, password } = data;

    axios.post('http://localhost:3000/login', { username, password })
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
        const { statusText } = error.response;

        this.setState({ message: statusText, success: false });
      });
  }

  render() {
    const { message, success, isLoggedIn } = this.state;
    const statusClassName = success ? 'success' : '';
    return (
      <Fragment>
        {message.length > 0 && <div className={`message-box ${statusClassName}`}>{message}</div>}
        {
          isLoggedIn
            ? <ChargePointsMap />
            : <Form onSubmit={this.handleSubmit} />
        }
      </Fragment>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
