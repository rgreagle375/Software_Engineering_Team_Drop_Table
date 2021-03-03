import React, { Component } from "react";

// running locally
//import openSocket, from "socket.io-client";
//const socket = openSocket('http://localhost:3001', {transports: ['websocket']});

// deploy 
import { io } from "socket.io-client";
const socket = io();

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            started: false,
        }; 
    }

    getData = started => {
      console.log('get data: ' + started);
      this.setState({ started });
    }

    changeGameState = started => {
      console.log("change game state clicked ", started);
      socket.emit("change_game_state", started);
      this.setState({ started });
    }

    componentDidMount() {
      var state_current = this;
      socket.emit("initial_data", "test, test, test");
      // start listener for retrieving data
      socket.on("get_data", state_current.getData);
    }

    componentWillUnmount() {
      socket.off("get_data", this.getData);
    }

    render() {
      return (
        <React.Fragment>
          <button onClick={() => this.changeGameState(true)}>
            Start Game!
          </button>
          <button onClick={() => this.changeGameState(false)}>
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