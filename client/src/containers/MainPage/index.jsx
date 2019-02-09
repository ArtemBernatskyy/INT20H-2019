import React, { Component } from 'react';

import { connect } from 'react-redux';

import { exampleAction } from 'redux/actions/exampleActions';
import logo from 'images/logo/logo.svg';


class MainPage extends Component {
  simpleAction = () => {
    this.props.exampleAction();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <pre>
           { JSON.stringify(this.props.example) }
          </pre>
          <button onClick={this.simpleAction}>Test redux action</button>
        </header>
      </div>
    );
  }
}


export default connect(
  state => ({
    example: state.example,
  }),
  { exampleAction },
)(MainPage);
