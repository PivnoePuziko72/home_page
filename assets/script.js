document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    const hamburger = document.querySelector(".hamburger");

    // Переключение видимости боковой панели
    hamburger.addEventListener("click", () => {
        sidebar.classList.toggle("hidden");
        document.querySelector(".content").classList.toggle("shifted");
    });

    // Работа с поиском автомобилей
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-btn");
    const searchResults = document.getElementById("search-results");

    let vehicles = [];

    // Загрузка данных из JSON
    fetch("./assets/carsData.json")
        .then(response => response.json())
        .then(data => {
            vehicles = data.vehicles;
            console.log("Данные автомобилей загружены:", vehicles);
        })
        .catch(error => console.error("Ошибка загрузки JSON:", error));

    // Функция для поиска автомобилей
    function searchCars(query) {
        const filteredCars = vehicles.filter(car =>
            car.name.toLowerCase().includes(query.toLowerCase()) || 
            car.id.toLowerCase().includes(query.toLowerCase())
        );
        displayResults(filteredCars);
    }

    // Отображение результатов
    function displayResults(cars) {
        searchResults.innerHTML = ""; // Очистка результатов
        if (cars.length === 0) {
            searchResults.innerHTML = "<p>Автомобілі не знайдено.</p>";
            return;
        }

        cars.forEach(car => {
            const carElement = document.createElement("div");
            carElement.classList.add("car-item");
            carElement.innerHTML = `
                <img src="./assets/carsmodels/${car.id}.png" alt="${car.name}">
                <p><strong>Модель:</strong> ${car.id}</p>
                <p><strong>Название:</strong> ${car.name}</p>
            `;
            searchResults.appendChild(carElement);
        });
    }

    // Обработчик клика на кнопку поиска
    searchButton.addEventListener("click", () => {
        const query = searchInput.value.trim();
        searchCars(query);
    });

    // Существующие функции для депозита и крафта
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
                    "Льодяник": 3,
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
});
