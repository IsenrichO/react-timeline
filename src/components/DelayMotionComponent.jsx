'use strict';
import React, { Component } from 'react';


// Helper `class` to delay a prop being passed by `period` ms:
export default class DelayMotion extends Component {
  static defaultProps = {
    period: 0
  };
  
  state = {
    value: this.props.initial
  };
  
  refresh(props) {
    let { value, period } = props;
    setTimeout(() => this.setState({
      value
    }), period);
  }
  
  componentDidMount() {
    this.refresh(this.props);
  }

  componentWillReceiveProps(next) {
    this.refresh(next);
  }

  render() {
    console.log(this.props.children);
    // return this.props.children(this.state.value);
    return this.props.children;
  }
};
