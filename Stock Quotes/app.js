const showQuotesButton = document.getElementById("showQuotesButton");
const showQuotesDiv = document.getElementById("showQuotesDiv");
const symbolTextBox = document.getElementById("symbolTextBox");

function displayStockQuote(stock){
    showQuotesDiv.innerHTML = 
        `<div>
            <h2>${stock.name}</h2> 
            <h3>${stock.price}</h3>
        </div>`
}

function fetchStockQuote(symbol, stockQuoteFetched){
    window.setInterval(function () {
        const quote = getStockQuote(symbol);         
        stockQuoteFetched(quote);
    }, 2000)
}

showQuotesButton.addEventListener("click", () => fetchStockQuote(symbolTextBox.value, quote => displayStockQuote(quote)));