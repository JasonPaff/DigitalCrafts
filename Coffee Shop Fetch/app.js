// small coffee item class
class CoffeeItem {
    constructor(coffeeType, smallPrice, mediumPrice, largePrice) {
        this.coffeeType = coffeeType
        this.smallPrice = smallPrice
        this.mediumPrice = mediumPrice
        this.largePrice = largePrice
    }

    // return the price based on the drink size given
    getPrice (drinkSize){
        switch (drinkSize){
            case "Small":
                return this.smallPrice
            case "Medium":
                return this.mediumPrice
            case "Large":
                return this.largePrice
        }
    }
}

// api url
let apiUrl = 'https://troubled-peaceful-hell.glitch.me/orders'

// html elements
let addNewOrderButton = document.getElementById("addOrderButton")
let showAllOrdersButton = document.getElementById("showAllOrdersButton")
let hideAllOrdersButton = document.getElementById("hideAllOrdersButton")
let sizeRadios = document.querySelectorAll("input[name='size']")

// event handlers
addNewOrderButton.onclick = () => addNewOrder()
showAllOrdersButton.onclick = () => ingredientTest()
hideAllOrdersButton.onclick = () => document.getElementById("viewOrdersDiv").innerHTML = ""

// create the coffee type selector elements dynamically from the coffee objects
for (let coffeeItem of getCoffeeItems())
    document.getElementById("coffeeSelect")
            .innerHTML += `<option>${coffeeItem.coffeeType}</option>`

// create the coffee items the shop sells
function getCoffeeItems(){
    let coffeeItems = []
    coffeeItems.push(new CoffeeItem("Black Coffee", 1.00, 1.50, 2))
    coffeeItems.push(new CoffeeItem("Sugar & Cream", 2, 2.5, 3))
    coffeeItems.push(new CoffeeItem("Hot Chocolate", 2, 2.5, 3))
    coffeeItems.push(new CoffeeItem("Mochachino", 3, 3.5, 4))
    coffeeItems.push(new CoffeeItem("Espresso", 2, 3.5, 5))
    return coffeeItems
}


// return all the orders
function ingredientTest() {
    fetch(apiUrl)
    .then(response => response.json()) 
    .then(result => displayAllOrders(result))
}

// display all the orders
function displayAllOrders(ordersArray) {  
    document.getElementById("viewOrdersDiv").innerHTML = 
    ordersArray.map(coffeeOrder =>
        `<ul style="list-style-type: none;">
        <li>${coffeeOrder.email}</li>
        <li>${coffeeOrder.type}</li>
        <li>${coffeeOrder.size}</li>
        <li>$${coffeeOrder.price}</li>
        <button id="deleteButton" onclick="deleteOrder('${coffeeOrder.email}')">Delete Order</button>
        </ul>`)
        .join('')
}

// delete an order using an email
function deleteOrder(orderEmail) {
    fetch(`${apiUrl}/${orderEmail}`, {
        method: "DELETE",
        headers: { "Content-Type":"application/json" },
    })
    .then(() => ingredientTest())
}

// add an order using the form data
function addNewOrder() {        
    if (!document.getElementById("addOrderEmailTextBox").checkValidity())  
        return

    const [coffeeType, coffeePrice, coffeeSize, orderEmail] = getOrderFromForm()
    fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify({
            email: orderEmail,
            type: coffeeType,
            size: coffeeSize,
            price: coffeePrice,
        }),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(() => ingredientTest())
}

// return order data from the form
function getOrderFromForm() {
    let type = document.getElementById("coffeeSelect").value
    let email = document.getElementById("addOrderEmailTextBox").value

    // get the coffee size from the selected radio button
    let sizeRadio = [...sizeRadios].filter(a => a.checked)
    let size = sizeRadio[0].value    

    //  get the coffee price from the selected type and size
     let coffeeItem = getCoffeeItems().filter(c => c.coffeeType == type)
     let price = coffeeItem[0].getPrice(size)

    return [type, price, size, email]
}