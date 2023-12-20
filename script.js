const searchbox = document.querySelector(".searchbox");
const btn = document.querySelector(".button");
const recipecontainer = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeCloseBtn = document.querySelector(".recipe-closeBtn");

const fetchRecipes = async (queary) => {
  recipecontainer.innerHTML = "<h2>Searching Your Reacipes... </h2>";
  const data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${queary}`
  );

  const responce = await data.json();
  // console.log(responce.meals[0]);

  recipecontainer.innerHTML = "";
  responce.meals.forEach((meal) => {
    const recipediv = document.createElement("div");
    recipediv.classList.add("recipes");
    recipediv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3> "${meal.strMeal}" </h3>
        <p><span>"${meal.strArea}"</span> Dish </p>
        <p>Belong to <span>"${meal.strCategory}"</span> category</p>
        
        `;
    const button = document.createElement("button");
    button.textContent = "View Recipe";
    recipediv.appendChild(button);

    //  Adding eventlisetener to recipe button

    button.addEventListener("click", () => {
      openReacipePopup(meal);
    });
    recipecontainer.appendChild(recipediv);
  });
};

const fetchIngredents = (meal) => {
  let IngredentsList = "";
  for (let i = 1; i <= 20; i++) {
    const Ingredent = meal[`strIngredient${i}`];
    if (Ingredent) {
      const mesure = meal[`strMeasure${i}`];
      IngredentsList += `<li>${mesure} ${Ingredent}</li>`;
    } else {
      break;
    }
  }
  return IngredentsList;
};

const openReacipePopup = (meal) => {
  recipeDetailsContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredents</h3>
    <ul class="ingredientsList">${fetchIngredents(meal)}</ul>
    <div class="recipe-instructions">
    <h3>Instructions</h3>
    <p >${meal.strInstructions}</p>
    </div>
    `
  recipeDetailsContent.parentElement.style.display = "block";
};

recipeCloseBtn.addEventListener('click', ()=>{

    recipeDetailsContent.parentElement.style.display='none'
})

btn.addEventListener("click", (e) => {
  e.preventDefault();

  const searchInput = searchbox.value.trim();

  if(!searchInput){
    recipecontainer.innerHTML =`<h2>Enter the meal in search box</h2>`
    return;
  }
  fetchRecipes(searchInput);
});
