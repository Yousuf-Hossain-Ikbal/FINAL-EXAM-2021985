const searchBox = document.getElementById('search-box');
const searchButton = document.getElementById('search-button');
const resultsContainer = document.querySelector('.results-container');


let currentPage = 1;
let totalResults = 0;

showAllBtn.textContent = 'Show All';
showAllBtn.classList.add('show-all-btn');

// Add event listener to `showAllBtn` outside of `fetchMeals`
showAllBtn.addEventListener('click', () => {
  currentPage += 1;
  fetchMeals(searchBox.value.trim(), currentPage);
});

searchButton.addEventListener('click', async () => {
  const searchTerm = searchBox.value.trim();

  if (searchTerm) {
    resultsContainer.innerHTML = ''; // Clear previous results
    currentPage = 1;
    await fetchMeals(searchTerm, currentPage);
  }
});

async function fetchMeals(searchTerm, page) {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.meals) {
    totalResults = data.meals.length;
    const mealsToShow = data.meals.slice(0, 5 * page); // Update to show meals based on page number
    renderMeals(mealsToShow);

    // Only append `showAllBtn` if more results can be shown
    if (totalResults > 5 * page && !resultsContainer.contains(showAllBtn)) {
      resultsContainer.appendChild(showAllBtn);
    } else if (resultsContainer.contains(showAllBtn)) {
      resultsContainer.removeChild(showAllBtn);
    }
  } else {
    resultsContainer.innerHTML = '<p>No results found.</p>';
  }
}

function renderMeals(meals) {
  meals.forEach(meal => {
    const result = document.createElement('div');
    result.classList.add('result');

    result.innerHTML = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <h3>${meal.strMeal}</h3>
      <p><b>ID:</b> ${meal.idMeal}</p>
      <p><b>Instructions:</b> ${meal.strInstructions.slice(0, 100)}...</p>
    `;

    resultsContainer.appendChild(result);
  });
}
