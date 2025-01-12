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

const searchInput = document.querySelector('#searchInput');
const resultsContainer = document.querySelector('#resultsContainer');

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filteredCars = carsData.filter(car => {
        return car.name.toLowerCase().includes(query) || car.model.includes(query);
    });

    displayResults(filteredCars);
});

function displayResults(cars) {
    resultsContainer.innerHTML = '';
    cars.forEach(car => {
        const carElement = document.createElement('div');
        carElement.classList.add('car');

        const carImage = document.createElement('img');
        carImage.src = `assets/carsmodels/${car.model}.png`;
        carElement.appendChild(carImage);

        const carDetails = document.createElement('div');
        carDetails.classList.add('car-details');
        carDetails.innerHTML = `
            <p>Model: ${car.model}</p>
            <p>Name: ${car.name}</p>
        `;
        carElement.appendChild(carDetails);

        resultsContainer.appendChild(carElement);
    });
}

        errorMessage.style.display = "block";
        setTimeout(() => (errorMessage.style.display = "none"), 3000);
    }
}
