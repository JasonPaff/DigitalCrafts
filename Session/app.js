const express = require('express');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const app = express();

function authMiddleware(req, res, next) {

    if (req.session && req.session.username)
        next();
    else
        res.redirect('/');
}

app.use(express.urlencoded());
app.set('views', './views');

app.use(session({
    secret: 'THESECRETKEY', // secret key, make strong unique
    saveUnitialized: true,  // save cookie even if empty session
    resave: true            // periodically re-save cookie to keep session alive
}));

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/', (req, res) => {
    if (req.session) {
        req.session.name = req.body.name;
        req.session.age = req.body.age;
    }

    res.redirect('display');
});

app.get('/display', (req, res) => {
    res.render('display', { name: req.session.name, age: req.session.age});
});

app.listen(3000, () => {
    console.log('Server is running...');
});