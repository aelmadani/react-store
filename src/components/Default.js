import React, { Component } from "react";

export default class Default extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="text-center">
        <h1>404</h1>
        <h2>Error</h2>
        <h3>
          The requested URL{" "}
          <span className="text-danger">{this.props.location.pathname}</span>{" "}
          was not found
        </h3>
      </div>
    );
  }
}
