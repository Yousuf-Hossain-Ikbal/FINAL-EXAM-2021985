// URL of the MealDB API endpoint
const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

// Function to fetch and display meal data
async function fetchMeals(query) {
    const response = await fetch(API_URL + query);
    const data = await response.json();
    displayMeals(data.meals);
}

// Function to display meal data
function displayMeals(meals) {
    const resultsContainer = document.getElementById('results-container');
    const showAllButton = document.getElementById('show-all-button');
    
    // Clear previous results
    resultsContainer.innerHTML = '';
    
    // Display meals
    if (meals) {
        // Limit to 5 meals initially
        const mealsToShow = meals.slice(0, 5);
        mealsToShow.forEach(meal => {
            const mealCard = document.createElement('div');
            mealCard.classList.add('meal-card');
            mealCard.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h3>${meal.strMeal}</h3>
                <p>${meal.strInstructions}</p>
            `;
            resultsContainer.appendChild(mealCard);
        });

        // Show "Show All" button if there are more meals
        if (meals.length > 5) {
            showAllButton.style.display = 'block';
            showAllButton.onclick = () => {
                // Display all meals
                resultsContainer.innerHTML = '';
                meals.forEach(meal => {
                    const mealCard = document.createElement('div');
                    mealCard.classList.add('meal-card');
                    mealCard.innerHTML = `
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                        <h3>${meal.strMeal}</h3>
                        <p>${meal.strInstructions}</p>
                    `;
                    resultsContainer.appendChild(mealCard);
                });
                // Hide "Show All" button
                showAllButton.style.display = 'none';
            };
        } else {
            showAllButton.style.display = 'none';
        }
    } else {
        // Display a message if no meals were found
        resultsContainer.innerHTML = '<p>No meals found for the given search query.</p>';
    }
}

// Event listener for search button
document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('search-input').value.trim();
    if (query) {
        fetchMeals(query);
    }
});
ssd
