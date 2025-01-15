document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    const hamburger = document.querySelector(".hamburger");

    // Устанавливаем начальное положение гамбургера
    hamburger.style.position = "fixed";  // Используем fixed, чтобы гамбургер не листался при прокрутке
    hamburger.style.left = "20px";
    hamburger.style.top = "20px";
    hamburger.style.zIndex = "1000"; // Убедимся, что гамбургер будет на переднем плане

    hamburger.addEventListener('click', () => {
        sidebar.classList.toggle('open'); // Переключаем класс open для отображения/скрытия
    });

    // Работа с поиском автомобилей
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-btn");
    const searchResults = document.getElementById("search-results");

    let vehicles = []; // Переменная для хранения данных автомобилей

    // Загрузка данных из JSON
    fetch("./assets/carsData.json")
        .then(response => response.json())
        .then(data => {
            vehicles = data.vehicles;
        })
        .catch(error => {
            console.error("Ошибка загрузки данных автомобилей:", error);
        });

    // Функция для поиска автомобилей
    function searchCars(query) {
        const filteredCars = vehicles.filter(car => {
            const carName = car.name ? String(car.name).toLowerCase() : ""; // Проверяем, что car.name существует
            const carId = car.id ? String(car.id).toLowerCase() : "";       // Проверяем, что car.id существует

            return carName.includes(query.toLowerCase()) || 
                   carId.includes(query.toLowerCase());
        });

        displayResults(filteredCars, query); // Отображаем результаты поиска
    }

    // Функция для выделения найденных фрагментов
    function highlightText(text, query) {
        if (typeof text !== 'string') {
            return text; // Если text не строка, возвращаем его без изменений
        }
        const regExp = new RegExp(`(${query})`, 'gi');  // Регулярное выражение для поиска фрагмента
        return text.replace(regExp, '<span class="highlight">$1</span>'); // Заменяем совпадение на выделенный фрагмент
    }

    // Отображение результатов поиска
    function displayResults(cars, query) {
        searchResults.innerHTML = ""; // Очистка результатов
        if (cars.length === 0) {
            searchResults.innerHTML = "<p>Автомобілі не знайдено.</p>";
            return;
        }

        cars.forEach(car => {
            const carElement = document.createElement("div");
            carElement.classList.add("car-item");

            // Если запрос не пустой, то выделяем найденные фрагменты
            const highlightedName = query && query.trim() !== "" ? highlightText(car.name, query) : car.name;
            const highlightedId = query && query.trim() !== "" ? highlightText(car.id, query) : car.id;

            carElement.innerHTML = `
                <img src="./assets/carsmodels/${car.id}.png" alt="${car.name}">
                <p><strong>Модель:</strong> ${highlightedId}</p>
                <p><strong>Назва:</strong> ${highlightedName}</p>
            `;
            searchResults.appendChild(carElement);
        });
    }

    // Обработчик клика на кнопку поиска
    searchButton.addEventListener("click", () => {
        const query = searchInput.value.trim();
        searchCars(query); // Запускаем поиск
    });

    // Существующие функции для депозита
    document.getElementById("calculate-btn").addEventListener("click", () => {
        const amount = parseFloat(document.getElementById("amount").value);
        const [rate, paydays] = document.getElementById("option").value.split(" ").map(Number);
        const resultDiv = document.getElementById("result");
        
        if (isNaN(amount) || amount <= 0 || amount > 5000000) {
            resultDiv.innerText = "Помилка: Введіть суму від 1 до 5000000.";
            return;
            
        const finalRate = 1.0 + rate / 100;
        const result = amount * Math.pow(finalRate, paydays);

        resultDiv.innerText = `Підсумкова сума: ₴${result.toFixed(2)}`;
    }

    // Существующая функция для крафта
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

    // JavaScript для "убегающего" гамбургера
    hamburger.addEventListener("mousemove", (event) => {
        const rect = hamburger.getBoundingClientRect(); // Координаты гамбургера
        const offsetX = event.clientX - rect.left - rect.width / 2; // Смещение по X
        const offsetY = event.clientY - rect.top - rect.height / 2; // Смещение по Y

        // Расстояние между мышью и центром кнопки
        const distance = Math.sqrt(offsetX ** 2 + offsetY ** 2);

        if (distance < 100) { // Если курсор приближается
            // Ограничиваем движение гамбургера на 20 пикселей
            const maxMove = 20;
            const moveX = Math.max(-maxMove, Math.min(maxMove, offsetX));
            const moveY = Math.max(-maxMove, Math.min(maxMove, offsetY));
        }
    });
});
