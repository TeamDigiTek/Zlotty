const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

// Definer en state så Heroku ikke råber af os nå den ikke kan finde en .env fil.
// .env er en måde at udføre process.env uden at gå ind i computeren og sætte dem.
const state = "production"
if (state === "development") {
    const dotenv = require('dotenv').config();
}

// CORS er brugt for at tillade Cross-Origin Resource Sharing.
// Uden CORS så råber hjemmesiden af os når vi prøver at tilgå de andre gennem fetch med AJAX.
let corsOptions = {
    origin: 'https://zlotty.herokuapp.com/',
    optionsSuccessStatus: 200 // For legacy browser support
}

// Setup Express og CORS på tværs af vores router.
const app = express();
app.use(cors(corsOptions))

// Set Express til at bruge EJS istedet for HTML og sæt vores EJS mappe.
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Error controller i tilfældet af siden ikke eksistere eller ikke har en GET sat op.
const errorController = require('./controllers/error');

// Vores Express ruter så vi kan navigere hjemmesiden.
const userRoutes = require('./routes/user');
const arduinoRoutes = require('./routes/arduino');
const apiRoutes = require('./routes/api');

// Setup Express til at bruge BodyParser så vi kan tilgå request body lettere.
// Setup vores public mappe til CSS og JS. Dette sørger for at man ikke kan tilgå nogle mapper der ligger uden for denne.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Setup Express til at bruge vores ruter og vores error controller.
app.use(userRoutes);
app.use(arduinoRoutes);
app.use(apiRoutes)
app.use(errorController.get404);

// Opret forbindelse til vores database hos MongoDB Atlas.
// Database_uri er placeret i environment variables.
// Når vi har oprettet forbindelse til MongoDB, så start serveren.
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
