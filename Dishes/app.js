const dishesUnorderedList = document.getElementById("dishes_ul");
const dishesDropDownList = document.getElementById("courseSelect")
const allDishesButton = document.getElementById("allDishesButton");
const starterDishesButton = document.getElementById("starterDishesButton");
const entreeDishesButton = document.getElementById("entreeDishesButton");
const dessertDishesButton = document.getElementById("dessertDishesButton");

function MapDishesToListItems(dishes) {
  dishesUnorderedList.innerHTML = dishes.map(dish => 
    `<li>
      <img src=${dish.imageURL} class='dish_image'></img>
      <h3><b>${dish.title} - $${dish.price}</b</h4>
      <h5 class='dish_description'>${dish.description}</h5>
    </li>`).join('')
};

function FilterDishesDropDown() {
  const selectedCourse = dishesDropDownList.value;

  if (selectedCourse == "All Dishes") MapDishesToListItems(dishes);
  else MapDishesToListItems(dishes.filter(dish => dish.course == selectedCourse));
}

dishesDropDownList.addEventListener("change", () => FilterDishesDropDown());

MapDishesToListItems(dishes);