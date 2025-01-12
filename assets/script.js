document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    const hamburger = document.querySelector(".hamburger");

    // Открытие/закрытие сайдбара при клике на гамбургер
    hamburger.addEventListener('click', () => {
        sidebar.classList.toggle('open'); // Переключаем класс 'open' для отображения/скрытия
    });

    // Работа с поиском автомобилей
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-btn");
    const searchResults = document.getElementById("search-results");

    let vehicles = []; // Массив для хранения данных автомобилей

    // Загрузка данных автомобилей из JSON
    fetch("./assets/carsData.json")
        .then(response => response.json())
        .then(data => {
            vehicles = data.vehicles;

            // Функция для поиска автомобилей по запросу
            function searchCars(query) {
                const filteredCars = vehicles.filter(car => {
                    const carName = car.name ? String(car.name).toLowerCase() : ""; // Проверяем наличие названия
                    const carId = car.id ? String(car.id).toLowerCase() : "";       // Проверяем наличие ID

                    return carName.includes(query.toLowerCase()) || 
                           carId.includes(query.toLowerCase());
                });

                displayResults(filteredCars); // Отображаем найденные результаты
            }

            // Функция для отображения результатов поиска
            function displayResults(cars) {
                searchResults.innerHTML = ""; // Очистка результатов перед выводом новых
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
                        <p><strong>Назва:</strong> ${car.name}</p>
                    `;
                    searchResults.appendChild(carElement); // Добавляем элемент с результатами на страницу
                });
            }

            // Обработчик клика по кнопке поиска
            searchButton.addEventListener("click", () => {
                const query = searchInput.value.trim(); // Берем введенный запрос
                searchCars(query); // Запускаем поиск
            });
        });

    // Функция для расчета депозита
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

    // Функция для расчета крафта
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
