document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    const hamburger = document.querySelector(".hamburger");

    // Переключение видимости боковой панели
    hamburger.addEventListener("click", () => {
        sidebar.classList.toggle("hidden");
    });
});

// Существующие функции
function calculateDeposit() {
    const amount = parseFloat(document.getElementById("amount").value);
    const [rate, paydays] = document.getElementById("option").value.split(" ").map(Number);
    const resultDiv = document.getElementById("result");

    if (isNaN(amount) || amount <= 0) {
        resultDiv.innerText = "Помилка: Введіть суму від 1 до 5000000.";
        return;
    }
    if (amount > 5000000) {
        resultDiv.innerText = "Помилка: Максимальна сума депозиту — 5000000.";
        return;
    }

    if (isNaN(rate) || rate <= 0) {
        resultDiv.innerText = "Помилка: Неправильний відсотковий розмір.";
        return;
    }
    if (isNaN(paydays) || paydays <= 0) {
        resultDiv.innerText = "Помилка: Неправильна кількість днів.";
        return;
    }

    const finalRate = 1.0 + rate / 100;
    const result = amount * Math.pow(finalRate, paydays);

    resultDiv.innerText = `Підсумкова сума: ₴${result.toFixed(2)}`;
}

function calculateCraft() {
    const recipes = {
        glintwein: {
            name: "Глінтвейн",
            ingredients: {
                "Мускатний горіх": 1,
                "Вино": 4,
                "Лимон": 5,
                "Імбир": 1
            }
        },
        gift: {
            name: "Подарунок",
            ingredients: {
                "Гілка сосни": 15,
                "Льодяник": 5,
                "Подарунковий папір": 3,
                "Апельсин": 2,
                "Червона фарба": 3
            }
        }
    };

    const quantity = parseInt(document.getElementById("quantity").value);
    const recipeKey = document.getElementById("recipe").value;
    const recipe = recipes[recipeKey];
    const resultDiv = document.getElementById("result");

    if (isNaN(quantity) || quantity <= 0) {
        resultDiv.innerText = "Помилка: Введіть коректну кількість.";
        return;
    }

    let resultText = `Рецепт: ${recipe.name}\n\nНеобхідні ресурси:`;
    for (const [ingredient, amount] of Object.entries(recipe.ingredients)) {
        resultText += `\n- ${ingredient}: ${amount * quantity} шт.`;
    }

    resultDiv.innerText = resultText;
}

document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    const hamburger = document.querySelector(".hamburger");

    // Переключение видимости боковой панели
    hamburger.addEventListener("click", () => {
        sidebar.classList.toggle("hidden");
        document.querySelector(".content").classList.toggle("shifted");
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    const hamburger = document.querySelector(".hamburger");

    // Логика работы кнопки-гамбургера
    hamburger.addEventListener("click", () => {
        sidebar.classList.toggle("hidden");
        document.querySelector(".content").classList.toggle("shifted");
    });
});

// Список паролей
const validPasswords = ["odessit2008", "admins05uagta4ever"];

// Проверка пароля
function checkPassword() {
    const passwordInput = document.getElementById("password-input").value;
    const errorMessage = document.getElementById("error-message");
    const loginContainer = document.getElementById("login-container");
    const allCarsContainer = document.getElementById("allcars-container");

    if (validPasswords.includes(passwordInput)) {
        loginContainer.style.display = "none";
        allCarsContainer.style.display = "block";
    } else {

import carsData from './carsData.json';

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-btn');
    const searchResults = document.getElementById('search-results');

    // Массив автомобилей (для примера)
    const cars = [
        { name: 'Tesla Model S', model: 'TeslaS', image: 'images/tesla_model_s.jpg' },
        { name: 'BMW 3 Series', model: 'BMW3', image: 'images/bmw_3_series.jpg' },
        { name: 'Audi A4', model: 'AudiA4', image: 'images/audi_a4.jpg' },
        // Добавьте другие автомобили
    ];

    // Функция поиска
    function searchCars(query) {
        const filteredCars = cars.filter(car =>
            car.name.toLowerCase().includes(query.toLowerCase())
        );
        displayResults(filteredCars);
    }

    // Отображение результатов
    function displayResults(cars) {
        searchResults.innerHTML = '';
        if (cars.length === 0) {
            searchResults.innerHTML = '<p>Автомобілі не знайдено.</p>';
            return;
        }

        cars.forEach(car => {
            const carElement = document.createElement('div');
            carElement.classList.add('search-item');
            carElement.innerHTML = `
                <img src="${car.image}" alt="${car.name}">
                <p>${car.name}</p>
            `;
            searchResults.appendChild(carElement);
        });
    }

    // Поиск по нажатию на кнопку
    searchButton.addEventListener('click', () => {
        const query = searchInput.value;
        searchCars(query);
    });

    // Поиск при изменении ввода
    searchInput.addEventListener('input', () => {
        const query = searchInput.value;
        searchCars(query);
    });
});
