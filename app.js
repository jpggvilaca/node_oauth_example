import React, { Component, createRef } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.userRef = createRef();
    this.passRef = createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    axios.post('http://localhost:3000/register', {
      username: this.userRef.current.value,
      password: this.passRef.current.value
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <form method="post" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input ref={this.userRef} name="username" type="text" className="form-control" id="username" aria-describedby="usernameHelp" placeholder="Enter username" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input ref={this.passRef} type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
