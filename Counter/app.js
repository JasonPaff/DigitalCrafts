const express = require('express');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const app = express();

let counter = 0;

app.use(express.urlencoded());

app.use(session({
    secret: 'THESECRETKEY', // secret key, make strong unique
    saveUninitialized: true,  // save cookie even if empty session
    resave: true            // periodically re-save cookie to keep session alive
}));

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.get('/', (req, res) => {
    req.session.counter = counter;
    res.render('index');
});

app.post('/', (req, res) => {
    if (req.session)
        counter++;

    if (req.session)
        res.render('index', {counter: counter});
});

app.listen(3000, () => {
    console.log('Server is running...');
});