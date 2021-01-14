import React from "react";
import ReactDOM from "react-dom";
import loginImg from "../../assets/images/logo.png";
import httpClient from "../../tools/httpClient";

export class Register extends React.Component {
  static RegisterProps = {
    containerRef: React.createRef(),
  };

  constructor(props) {
    super(props);

    this.register = this.register.bind(this);
  }

  async register(e) {
    e.preventDefault();
    try {
      await httpClient.registerUser({
        username: "lolo",
        password: "abcd",
        confirmPassword: "abcd",
        name: "piss",
        surname: "mememe",
      });
    } catch (err) {
      //display error somehow
      console.error(err);
    }
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="username" />
            </div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" placeholder="name" />
            </div>
            <div className="form-group">
              <label htmlFor="surname">Surname</label>
              <input type="text" name="surname" placeholder="surname" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Repeat password</label>
              <input type="password" name="password" placeholder="password" />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn" onClick={this.register}>
            Register
          </button>
        </div>
      </div>
    );
  }
}