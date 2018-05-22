import React, { Fragment, Component, createRef } from 'react';
import { func } from 'prop-types';

class Form extends Component {
  static propTypes = { onSubmit: func.isRequired };

  userRef = createRef();
  passRef = createRef();

  handleSubmit = e => {
    e.preventDefault();

    const { onSubmit } = this.props;
    const formData = {
      username: this.userRef.current.value,
      password: this.passRef.current.value
    };

    onSubmit && onSubmit(formData);
  }

  render() {
    return (
      <form className="form-signin" onSubmit={this.handleSubmit}>
        <label htmlFor="inputUsername" className="sr-only">Username</label>
        <input
          ref={this.userRef}
          type="text"
          id="inputUsername"
          className="form-control"
          placeholder="Username"
          required autoFocus
        />
        <label htmlFor="inputPassword" className="sr-only">Password</label>
        <input
          ref={this.passRef}
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          required
        />
        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>
    );
  }
}

export default Form;
