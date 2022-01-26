fetch('https://troubled-peaceful-hell.glitch.me/orders')
.then(function(response) {
    return response.json() // promise 
}).then(function(result) {
    console.log(result) // objects 
})