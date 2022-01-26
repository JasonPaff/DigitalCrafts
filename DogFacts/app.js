const dogFactHeading = document.getElementById("dogFactHeading")
const dogFactButton = document.getElementById("dogFactButton")

dogFactButton.addEventListener('click', function() {

    let request = new XMLHttpRequest()

    request.addEventListener('load', function() {

        let result = JSON.parse(this.responseText)

        let randomFactNumber = parseInt(Math.random() * ((result.length - 1) - 1))

        dogFactHeading.innerHTML = result[randomFactNumber].fact
    })
    
    request.open('GET', 'https://island-bramble.glitch.me/dog-facts')
    request.send()
})
