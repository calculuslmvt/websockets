const express = require('express');
const expressWs = require('express-ws')(express());
const app = expressWs.app;

const messages = ["Starting... "];
const clients = new Set(); 

app.ws('/api/ws', (ws, req) => {
    console.log('WebSocket connection established');
    clients.add(ws);

    ws.on("message", (msg)=> {
        console.log("message recieved: ", msg);

        clients.forEach((client) => {
            client.send(msg);
        }); 
    })
});



app.get('/api', (req, res)=> {
    res.send(messages); 
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

