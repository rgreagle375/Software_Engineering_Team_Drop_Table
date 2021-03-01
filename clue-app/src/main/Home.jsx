import React, { Component } from "react";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            started: false,
        };
    }
    
    render() {
      return (
        <React.Fragment>
          <button onClick={() => { this.setState({started: true})}}>
            Start Game!
          </button>
          <button onClick={() => {this.setState({started: false})}}>
            Reset Game
          </button>
          <h2>
            {this.state.started ? 'started' : 'not started'}
          </h2>
        </React.Fragment>
      );
    }
  }

export default Home;