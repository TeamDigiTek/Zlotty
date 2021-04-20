const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const socketio = require('socket.io');
const PORT = process.env.PORT || 3000;

const app = express();
const server = require('http').createServer(app);
app.io = socketio(server);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const errorController = require('./controllers/error');
const arduinoController = require('./controllers/arduino');

const userRoutes = require('./routes/user');
const arduinoRoutes = require('./routes/arduino');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(userRoutes);
app.use(arduinoRoutes);

app.use(errorController.get404);

app.io.on('connection', (socket) => {
    console.log('Connection established on id:', socket.id)
    socket.on('msg', (arg) => {
        let data = {"sensor": 0}
        arduinoController.postArduinoAPI(data)
    })
})

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});