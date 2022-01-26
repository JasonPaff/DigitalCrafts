// noinspection JSUnresolvedVariable

const express = require('express');
const app = express();

app.get('/Moves/:genre', (req, res) => {
    const genre = req.params.genre;
    res.send(`Get all moves for ${genre}`);
})

// /movies/action/2022
app.get('/movies/:genre/:year', (req, res) => { })
// /movies/action/year/2022
app.get('/movies/:genre/year/:year', (req, res) => { })

// start the server on port 3000
app.listen(3000, function () {
    console.log('Server is running...')
});