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
let findOrderFromEmailButton = document.getElementById("findOrderButton")
let findOrderFromEmailTextBox = document.getElementById("findOrderByEmailTextBox")
let sizeRadios = document.querySelectorAll("input[name='size']")

// event handlers
addNewOrderButton.onclick = () => addNewOrder()
findOrderFromEmailButton.onclick = () => getOrderFromEmail(findOrderFromEmailTextBox.value)
showAllOrdersButton.onclick = () => getAllOrders()
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
    coffeeItems.push(new CoffeeItem("Water", 0, 0, 0))
    return coffeeItems
}

// return all the orders
function getAllOrders() {
    let request = new XMLHttpRequest()
    request.onload = () => displayAllOrders(request.responseText)
    request.open('GET', apiUrl)
    request.send();
}

// display all the orders
function displayAllOrders(ordersArray) {  
    document.getElementById("viewOrdersDiv").innerHTML = 
    JSON.parse(ordersArray)
        .map(coffeeOrder =>
        `<ul style="list-style-type: none;">
        <li>${coffeeOrder.email}</li>
        <li>${coffeeOrder.type}</li>
        <li>${coffeeOrder.size}</li>
        <li>$${coffeeOrder.price}</li>
        <button id="deleteButton" onclick="deleteOrder('${coffeeOrder.email}')">Delete Order</button>
        </ul>`)
        .join('')
}

// return a single order using an email
function getOrderFromEmail(orderEmail) {
    if (!findOrderFromEmailTextBox.checkValidity()) return
    let request = new XMLHttpRequest()    
    request.onload = () => displaySingleOrder(request.responseText)
    request.open('GET', `${apiUrl}/${orderEmail}`)
    request.send();
}

// display a single order
function displaySingleOrder(orderResult) { 
    let coffeeOrder = JSON.parse(orderResult)
    if (coffeeOrder.message == "Order not found"){
        document.getElementById("viewOrdersDiv").innerHTML =
        `<p>Order for that email address does not exist</p>`    
    }
    else {
    document.getElementById("viewOrdersDiv").innerHTML =
        `<ul style="list-style-type: none;">
            <li>${coffeeOrder.email}</li>
            <li>${coffeeOrder.type}</li>
            <li>${coffeeOrder.size}</li>
            <li>$${coffeeOrder.price}</li>            
            <button id="deleteButton" onclick="deleteOrder('${coffeeOrder.email}')">Delete Order</button>
        </ul>`
    }
}

// delete an order using an email
function deleteOrder(orderEmail) {
    let request = new XMLHttpRequest()
    request.onload = () => getAllOrders()
    request.open('DELETE', `${apiUrl}/${orderEmail}`)
    request.send()
}

// add an order using the form data
function addNewOrder() {        
    if (!document.getElementById("addOrderEmailTextBox").checkValidity())  return    
    let request = new XMLHttpRequest()
    request.onload = () => getAllOrders()
    request.open('POST', apiUrl)
    request.setRequestHeader('Content-Type', 'application/json')  
    const [coffeeType, coffeePrice, coffeeSize, orderEmail] = getOrderFromForm()
    const body = {
        email: orderEmail,
        type: coffeeType,
        size: coffeeSize,
        price: coffeePrice,
    }
    request.send(JSON.stringify(body))
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