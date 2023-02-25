import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
  render() {
    return (
      <button
        className={this.props.className}
        onClick={() => this.props.handleClick(this.props.value)}
      >
        {this.props.value}
      </button>
    );
  }
}

export default Button;
