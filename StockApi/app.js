function getStocks() {
    let request = new XMLHttpRequest()
    request.open('GET', 'https://endurable-bead-polo.glitch.me/stocks')
    request.setRequestHeader('Content-Type', 'application/json')
    request.send()
    request.addEventListener('load', function () {
        showStocks(this.responseText)
    })
}

function showStocks(results) {
    let data = JSON.parse(results)
    let html = data.map((a) => 
        `<div>
            <h5>${a.symbol}</h5>
            <h5>${a.title}</h5>
            <h5>${a.price}</h5>
            <h5>${a.quantity}</h5>
        </div>`).join('')
    let div = document.getElementById("stockDisplayDiv")
    div.innerHTML = html
} 

function postStocks() {

}

getStocks()