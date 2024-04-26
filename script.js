// Define elements
const searchBox = document.getElementById('search-box');
const searchButton = document.getElementById('search-button');
const resultsContainer = document.querySelector('.results-container');
const showAllBtn = document.createElement('button');
showAllBtn.textContent = 'SHOW ALL';
showAllBtn.classList.add('show-all-btn');

let currentPage = 1;
let totalResults = 0;
const pageSize = 5; // Define the number of meals to show initially

// Add event listeners
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

// Function to fetch meals from API
async function fetchMeals(searchTerm, page) {
    try {
        // API URL with the search term
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}&page=${page}`;
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok && data.meals) {
            totalResults = data.meals.length;

            // Calculate the range of meals to show based on the current page and page size
            const startIndex = (page - 1) * pageSize;
            const endIndex = startIndex + pageSize;

            // Slice the meals array based on the current page
            const mealsToShow = data.meals.slice(startIndex, endIndex);

            // Render the meals
            renderMeals(mealsToShow);

            // Check if there are more results and handle the "SHOW ALL" button
            if (totalResults > endIndex && !resultsContainer.contains(showAllBtn)) {
                resultsContainer.appendChild(showAllBtn);
            } else if (resultsContainer.contains(showAllBtn) && totalResults <= endIndex) {
                resultsContainer.removeChild(showAllBtn);
            }
        } else {
            // If no results found
            resultsContainer.innerHTML = '<p>No results found.</p>';
        }
    } catch (error) {
        // Error handling
        resultsContainer.innerHTML = '<p>Error fetching data. Please try again later.</p>';
        console.error(error);
    }
}

// Function to render meals in the results container
function renderMeals(meals) {
    meals.forEach(meal => {
        const result = document.createElement('div');
        result.classList.add('result');

        result.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <h3>${meal.strMeal}</h3>
            <p><b>ID:</b> ${meal.idMeal}</p>
            <p><b>Instructions:</b> ${meal.strInstructions.slice(0, 100)}...</p>
            <p class="instructions-link"><a href="${meal.strSource}" target="_blank">See Details</a></p>
        `;

        resultsContainer.appendChild(result);
    });
}



