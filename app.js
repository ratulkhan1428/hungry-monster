const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const ingredientCloseBtn = document.getElementById('ingredient-close-btn');

// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealIngredient);
ingredientCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showIngredient');
})

// get meal list that matches with the ingredients
function getMealList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class="meal-item" data-id="${meal.idMeal}">
                        <div class="meal-img">
                            <img src="${meal.strMealThumb}" alt="">
                        </div>
                        <div class="meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href="#" class="ingredient-btn">Get Ingredient</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else {
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    })
}


// get ingredient of the meal
function getMealIngredient(e) {
    e.preventDefault();
    if(e.target.classList.contains('ingredient-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealIngredientModal(data.meals));
    }
}

// creating a modal
function mealIngredientModal(meal) {
    console.log(meal);
    meal = meal[0];
    let html = `
        <div class="ingredient-meal-img">
            <img src="${meal.strMealThumb}" alt="">
        </div>
        <h2 class="ingredient-title">${meal.strMeal}</h2>
        <p class="ingredient-category">${meal.strCategory}</p>
        <div class="ingredient-instruct">
            <h3>Ingredients:</h3>
            <ul>
                <li>${meal.strIngredient1}</li>
                <li>${meal.strIngredient2}</li>
                <li>${meal.strIngredient3}</li>
                <li>${meal.strIngredient4}</li>
                <li>${meal.strIngredient5}</li>
            </ul>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showIngredient');
}