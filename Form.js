import React, { Component, createRef } from 'react';

class Form extends Component {
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
      <form method="post" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            ref={this.userRef}
            name="username"
            type="text"
            className="form-control"
            id="username"
            aria-describedby="usernameHelp"
            placeholder="Enter username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            ref={this.passRef}
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1" placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

export default Form;
