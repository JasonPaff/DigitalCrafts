const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');

const trips = [];

app.use(express.urlencoded());

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
app.post('/add-trips', (req, res) => {
    const {title, destination, dateDeparted, dateReturned} = req.body;

    //TODO: input validation on title, destination, dateDeparted, dateReturned

    // id is length of array plus one
    let id = trips.length + 1;

    // add new trip to collection
    trips.push({id: id, title: title, destination: destination, dateDeparted: dateDeparted, dateReturned: dateReturned});

    // reload page
    res.redirect('/add-trips');
});

// delete a trip
app.post('/delete-trips', (req, res) => {
    const tripString = req.body.selector;

    // parse ID from trip string
    const id = tripString.substring(0, tripString.indexOf('.'));

    // TODO: error check for empty trips array before splicing

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
app.post('/update-trips', (req, res) => {
    // parse ID from trip string
    const tripString = req.body.selector;
    const id = tripString.substring(0, tripString.indexOf('.'));

    // TODO: error check for empty trips array before pulling

    // trip to update
    const trip = trips[id - 1];

    // display update trip view, pass in trip to update
    res.render('update-trip', { id: trip.id, title: trip.title, destination: trip.destination,
        dateDeparted: trip.dateDeparted, dateReturned: trip.dateReturned });
});

// update a trip
app.post('/update-trip', (req, res) => {
    // index is always one less than the id
    const index = req.body.id - 1;

    // TODO: error check for empty trips array before updating

    // update trip
    trips[index] = { id: req.body.id, title: req.body.title, destination: req.body.destination,
        dateDeparted: req.body.dateDeparted, dateReturned: req.body.dateReturned };

    // return to update trips
    res.render('update-trips', {trips: trips});
});

// search for a trip
app.post('/search-trips', (req, res) => {
    const destination = req.body.destination;

    // find the trips that match the destination city
    let matchingTrip = trips.filter(trip => {
        if (trip.destination === destination)
            return trip;
    });

    // display matching trips
    res.render('display-trips', {trips: matchingTrip})
});

// display main window
app.get('/', (req, res) => {
    res.render('index');
});

// display trips
app.get('/display-trips', (req, res) => {
    res.render('display-trips', {trips: trips});
});

// search trips
app.get('/search-trips', (req, res) => {
    res.render('search-trips');
});

// add trips
app.get('/add-trips', (req, res) => {
    res.render('add-trips');
});

// update trips
app.get('/update-trips', (req, res) => {
    res.render('update-trips', {trips: trips});
});

// delete trips
app.get('/delete-trips', (req, res) => {
    res.render('delete-trips', {trips: trips});
});