const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const errorController = require('./controllers/error');

const userRoutes = require('./routes/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(userRoutes);

app.use(errorController.get404);

app.listen(4000);