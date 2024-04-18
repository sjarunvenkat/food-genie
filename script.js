window.addEventListener("load", () => {
  let randomMeal = document.querySelector(".random-meal");
  let categoryResults = document.querySelector(".search-results");
  let categoryDishes = document.querySelector(".dishes");

  let modal = document.getElementById("instructionDialog");
  const instructionDialog = document.getElementById("instructionDialog");

  let inputCategory = document.getElementById("inputCategory");
  let btn = document.getElementById("btn");

  const randomMeal_url = "https://www.themealdb.com/api/json/v1/1/random.php";
  fetch(randomMeal_url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.meals[0]);
      let randomDisplay = `<h1>Today' Pick</h1>
      <img src=${data.meals[0].strMealThumb} width="250px" alt="">
      <p>${data.meals[0].strMeal}</p>`;

      let modalDisplay = `<h1>How to do ? </h1>
      <li>Dish Name : ${data.meals[0].strMeal} </li>
      <li> Instructions : ${data.meals[0].strInstructions}  </li>
      <li> YT Link : ${data.meals[0].strYoutube} </li>
      <li> Category : ${data.meals[0].strCategory} </li>`;

      let ingredientAndMeasure = ``;

      for (let i = 1; i <= 20; i++) {
        const ingredient = data.meals[`strIngredient${i}`];
        const measure = data.meals[`strMeasure${i}`];
        if (ingredient || measure) {
          ingredientAndMeasure += `<li> ${ingredient} : ${measure} </li>`;
        }
      }

      modal.innerHTML =
        modalDisplay +
        ingredientAndMeasure +
        `<button id="closeDialog">Close</button>`;
      randomMeal.innerHTML = randomDisplay;

      const closeDialog = document.getElementById("closeDialog");
      closeDialog.addEventListener("click", () => {
        instructionDialog.close();
      });

      randomMeal.addEventListener("click", () => {
        instructionDialog.showModal();
      });
    })
    .catch((error) => console.error(error));

  btn
    .addEventListener("click", () => {
      const mealCategorySearch_url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${inputCategory.value}`;
      fetch(mealCategorySearch_url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          let categoryNameDisplay = `<h1>${inputCategory.value}</h1>`;
          let categoryResultsDisplay = "";

          data.meals.forEach((meal) => {
            categoryResultsDisplay += `
            <div class="dish">
            <img src=${meal.strMealThumb} width="150px" alt="">
            <p>${meal.strMeal}</p>
        </div>`;
          });

          categoryResults.innerHTML = categoryNameDisplay;
          categoryDishes.innerHTML = categoryResultsDisplay;
        });
    })
    .catch((error) => console.error(error));
});
