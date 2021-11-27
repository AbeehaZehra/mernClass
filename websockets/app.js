const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const port = process.env.PORT || 7500;

app.use(express.static(path.join(__dirname, 'public')));
http.listen(port, () => console.log(`Listening on port ${port}!`));

const {Server} = require('socket.io');
const io = new Server(http);

io.on("connection", socket => {
    console.log(`${socket.id} is now online`);
    // or with emit() and custom event names
    socket.emit("greetings", `Your socket id is ${socket.id}`);
  
    // handle the event sent with socket.send()
    socket.on("message", (data) => {
        io.emit("message", data);
    });

    socket.on("greetings", (data) => {
        //console.log(data);
      });
  });
