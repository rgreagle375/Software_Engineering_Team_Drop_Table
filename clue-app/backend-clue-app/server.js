const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

// Connection string of MongoDb database hosted on Mlab or locally
var connection_string = "**********";
// will use db once we have mLab setup
const db = require("monk")(connection_string);

// this tutorial said to create a routes folder - https://www.valentinog.com/blog/socket-react/
const index = require("./routes/index");
// our localhost port - I think we need an env file to deploy
const port = process.env.PORT || 3001;
const app = express();

// I think we need to update this when we deploy (from same website as above)
app.use(index);
// our server instance
const server = http.createServer(app);
// This creates our socket using the instance of the server
const io = socketIO(server);
io.on("connection", socket => {
  console.log("New client connected" + socket.id);
  // initial data can be used to send state to new clients - doesn't do anything yet because we don't save state on the server
  socket.on("initial_data", (msg) => {
    console.log("testing 1, 2, 3");
    console.log('message' + msg);
    });
  // start_game is called when button is pressed
  socket.on("change_game_state", (started) => {
      console.log("change_game_state");
      io.sockets.emit("get_data", started);
  });
});

// setup listener on port 3001
server.listen(port, () => console.log(`Listening on port ${port}`));
