const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const session = require('express-session');

const trips = [];
const users = [{username: 'Jason', password: 'password'}];

function authenticator(req, res, next) {
    if (req.session && req.session.username)
        next();
    else
        res.redirect('/');
}

app.use(express.urlencoded());

app.use(session({
    secret: 'THESECRETKEY', // secret key, make strong unique
    saveUnitialized: true,  // save cookie even if empty session
    resave: true            // periodically re-save cookie to keep session alive
}));

// setting up mustache as a templating engine
app.engine('mustache', mustacheExpress());
// the pages are located in the views directory
app.set('views', './views');
// extension for all the pages
app.set('view engine', 'mustache');

// start server
app.listen(3000, () => {
    console.log('Server is running...');
});

// add a new trip
app.post('/add-trips', authenticator, (req, res) => {
    const {title, destination, dateDeparted, dateReturned} = req.body;

    //TODO: input validation on title, destination, dateDeparted, dateReturned

    // id is length of array plus one
    let id = trips.length + 1;

    // add new trip to collection
    trips.push({
        id: id, username: req.session.username, title: title, destination: destination, dateDeparted: dateDeparted, dateReturned: dateReturned
    });

    // reload page
    res.redirect('/add-trips');
});

// delete a trip
app.post('/delete-trips', authenticator, (req, res) => {
    // TODO: error check for empty trips array before splicing

    // parse ID from trip string
    const tripString = req.body.selector;
    const id = tripString.substring(0, tripString.indexOf('.'));

    // delete trip from collection, index is 1 less than the id
    trips.splice(id - 1, 1);

    // adjust all IDs above the splice down by one to account for deletion
    trips.forEach(trip => {
        if (trip.id > id) {
            trip.id -= 1;
        }
    });

    // reload page
    res.redirect('/delete-trips');
});

// update a trip
app.post('/update-trips', authenticator, (req, res) => {
    // parse ID from trip string
    const tripString = req.body.selector;
    const id = tripString.substring(0, tripString.indexOf('.'));

    // TODO: error check for empty trips array before pulling

    // trip to update
    const trip = trips[id - 1];

    // display update trip view, pass in trip to update
    res.render('update-trip', {
        id: trip.id,
        username: req.session.username,
        title: trip.title,
        destination: trip.destination,
        dateDeparted: trip.dateDeparted,
        dateReturned: trip.dateReturned
    });
});

// update a trip
app.post('/update-trip', authenticator, (req, res) => {
    // index is always one less than the id
    const index = req.body.id - 1;

    // TODO: error check for empty trips array before updating

    // update trip
    trips[index] = {
        id: req.body.id,
        username: req.session.username,
        title: req.body.title,
        destination: req.body.destination,
        dateDeparted: req.body.dateDeparted,
        dateReturned: req.body.dateReturned
    };

    // return to update trips
    res.render('update-trips', {trips: trips});
});

// search for a trip
app.post('/search-trips', authenticator, (req, res) => {
    const destination = req.body.destination;

    // find the trips that match the destination city
    let matchingTrip = trips.filter(trip => {
        if (trip.destination === destination) return trip;
    });

    // display matching trips
    res.render('display-trips', {trips: matchingTrip})
});

// display main window
app.get('/', (req, res) => {
    res.render('login');
});

app.get('/index', authenticator, (req, res) => {
    res.render('index');
})

// display trips
app.get('/display-trips', authenticator, (req, res) => {
    let filteredTrips = trips.find(trip => trip.username === req.session.username);

    res.render('display-trips', {trips: filteredTrips});
});

// search trips
app.get('/search-trips', authenticator, (req, res) => {
    res.render('search-trips');
});

// add trips
app.get('/add-trips', authenticator, (req, res) => {
    res.render('add-trips');
});

// update trips
app.get('/update-trips', authenticator, (req, res) => {
    let filteredTrips = trips.find(trip => trip.username === req.session.username);
    res.render('update-trips', {trips: filteredTrips});
});

// delete trips
app.get('/delete-trips', authenticator, (req, res) => {
    let filteredTrips = trips.find(trip => trip.username === req.session.username);
    res.render('delete-trips', {trips: filteredTrips});
});

// register new user
app.post('/register', (req, res) => {
    const newUserName = req.body.registerUsername;
    const newUserPassword = req.body.registerPassword;

    let user = users.find(user => user.username === newUserName);

    if (user) {
        res.render('login', {registerMessage: 'User already exists'});
    } else {
        users.push({username: newUserName, password: newUserPassword});
        res.render('login', {registerMessage: 'User created you may login now'});
    }
});

app.post('/login', (req, res) => {
    const userName = req.body.username;
    const userPassword = req.body.password;

    let user = users.find(user => user.username === userName && user.password === userPassword);

    if (user) {
        if (req.session)
            req.session.username = userName;
        res.redirect('index');
    } else {
        res.render('login', {loginMessage: 'Username or password is incorrect'});
    }
});

app.get('/log-out', (req, res) => {
    console.log(req.session.username);
    if (req.session && req.session.username)
        delete req.session['username'];
    console.log(req.session.username);
    res.redirect('/');
});