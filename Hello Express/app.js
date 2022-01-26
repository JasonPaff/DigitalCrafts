const express = require('express');
const app = express();

app.get('/', (request, response) => {
    let user = {username: 'JasonPaff', age: 37}
    request.json(user);
})

// start the server on port 3000
app.listen(3000, function () {
    console.log('Server is running...')
});