const chuckNorrisFactParagraph = document.getElementById("chuckNorrisFactHeading")
const chuckNorrisFactButton = document.getElementById("chuckNorrisFactButton")

chuckNorrisFactButton.addEventListener('click', function() {

    let request = new XMLHttpRequest()

    request.addEventListener('load', function() {

        let result = JSON.parse(this.responseText)
         let joke = result.value.joke
        chuckNorrisFactParagraph.innerHTML = joke
    })
    
    request.open('GET', 'http://api.icndb.com/jokes/random')
    request.send()
})
