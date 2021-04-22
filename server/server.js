const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 3000;

let corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // For legacy browser support
}

const app = express();
app.use(cors(corsOptions))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const errorController = require('./controllers/error');

const userRoutes = require('./routes/user');
const arduinoRoutes = require('./routes/arduino');
const apiRoutes = require('./routes/api');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(userRoutes);
app.use(arduinoRoutes);
app.use(apiRoutes)

app.use(errorController.get404);

mongoose
    .connect(
        process.env.DATABASE_URI
    )
    .then(result => {
        app.listen(PORT);
        console.log(`Listening on port ${PORT}`);
    })
    .catch(err => {
        console.error(err)
    })
