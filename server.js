const WebSocket = require("ws");
const express = require("express");
const http = require("http");

let app = express();
let server = http.createServer(app);
const wss = new WebSocket.Server( {server} );

app.get("/", function(request, response){
    response.send(`
        <!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>DRAW</title>
    </head>
    <body>
       <button onclick="connectToServer()">Connection</button>
       <br>
       <button onclick="disconnectFromServer()">Disconnect</button>
    </body>
    <script>
        let wss = undefined;
        function connectToServer(){
            wss = new WebSocket("${request.ip}");
        }

        function disconnectFromServer(){
            if(wss != undefined){
                wss.close();
            }
        }
    </script>
</html>
        `);
    });

wss.on('connection', (ws) => {
    console.log('Клиент подключился через WebSocket');

    // Обработка сообщений от клиента
    ws.on('message', (message) => {
        console.log(`Сообщение от клиента: ${message}`);
        ws.send(`Ответ от сервера: ${message}`);
    });

    // Обработка отключения клиента
    ws.on('close', () => {
        console.log('Клиент отключился');
    });
});

server.listen(4444, () => {
    console.log(`Server started`);
});

