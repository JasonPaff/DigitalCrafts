const dogButton = document.getElementById("dogButton")
const dogImage = document.getElementById("dogImage")

dogButton.addEventListener('click', function() {
    
    let request = new XMLHttpRequest()

    request.addEventListener('load', function() {

        let result = JSON.parse(this.responseText)

        dogImage.setAttribute('src', result.message)
    })
    
    request.open('GET', 'https://dog.ceo/api/breeds/image/random')
    request.send()
})