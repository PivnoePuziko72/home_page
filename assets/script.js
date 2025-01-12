document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    const hamburger = document.querySelector(".hamburger");

    // Переключение видимости боковой панели
    hamburger.addEventListener("click", () => {
        sidebar.classList.toggle("hidden");
        document.querySelector(".content").classList.toggle("shifted");
    });
});

// Существующие функции для депозита и крафта (не изменялись)

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

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-btn');
    const searchResults = document.getElementById('search-results');
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.querySelector('.sidebar');

    // Переменная для хранения данных из JSON
    let vehicles = [];

    // Загружаем данные из JSON
    fetch('./assets/carsData.json')
        .then(response => response.json())
        .then(data => {
            vehicles = data.vehicles; // Данные автомобилей
        })
        .catch(error => console.error('Ошибка при загрузке JSON:', error));

    // Функция поиска автомобилей
    function searchCars(query) {
        const filteredCars = vehicles.filter(car =>
            car.name.toLowerCase().includes(query.toLowerCase())
        );
        displayResults(filteredCars);
    }

    // Отображение результатов поиска
    function displayResults(cars) {
        searchResults.innerHTML = ''; // Очищаем текущие результаты
        if (cars.length === 0) {
            searchResults.innerHTML = '<p>Автомобілі не знайдено.</p>';
            return;
        }

        // Разбиваем автомобили на ряды по 3 штуки
        const rows = Math.ceil(cars.length / 3);
        for (let i = 0; i < rows; i++) {
            const row = document.createElement('div');
            row.classList.add('car-row'); // Добавляем класс для ряда

            // Добавляем автомобили в текущий ряд
            for (let j = i * 3; j < (i + 1) * 3 && j < cars.length; j++) {
                const car = cars[j];
                const carElement = document.createElement('div');
                carElement.classList.add('search-item');
                carElement.innerHTML = `
                    <img src="./assets/carsmodels/${car.id}.png" alt="${car.name}" /> <!-- Путь к изображению -->
                    <p>Модель: ${car.id}</p>
                    <p>${car.name}</p>
                `;
                row.appendChild(carElement);
            }

            searchResults.appendChild(row); // Добавляем ряд в общий контейнер
        }
    }

    // Поиск при нажатии на кнопку
    searchButton.addEventListener('click', () => {
        const query = searchInput.value;
        searchCars(query);
    });
});
