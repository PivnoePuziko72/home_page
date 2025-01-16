document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    const hamburger = document.querySelector(".hamburger");
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
                "Гілка сосни": 10,
                "Льодяник": 3,
                "Подарунковий папір": 3,
                "Апельсин": 2,
                "Червона фарба": 3
            }
        }
    };

    // Flash cards functionality
    const flashCards = document.querySelectorAll('.flash-card');
    flashCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('active');
        });
    });

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }

    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-btn");
    const searchResults = document.getElementById("search-results");

    let vehicles = [];

    fetch("./assets/carsData.json")
        .then(response => response.json())
        .then(data => {
            vehicles = data.vehicles;
        })
        .catch(error => {
            console.error("Ошибка загрузки данных автомобилей:", error);
        });

    function searchCars(query) {
        const filteredCars = vehicles.filter(car => {
            const carName = car.name ? String(car.name).toLowerCase() : "";
            const carId = car.id ? String(car.id).toLowerCase() : "";
            return carName.includes(query.toLowerCase()) || 
                   carId.includes(query.toLowerCase());
        });
        displayResults(filteredCars, query);
    }

    function highlightText(text, query) {
        if (typeof text !== 'string') {
            return text;
        }
        const regExp = new RegExp(`(${query})`, 'gi');
        return text.replace(regExp, '<span class="highlight">$1</span>');
    }

    function displayResults(cars, query) {
        searchResults.innerHTML = "";
        if (cars.length === 0) {
            searchResults.innerHTML = "<p>Автомобілі не знайдено.</p>";
            return;
        }

        cars.forEach(car => {
            const carElement = document.createElement("div");
            carElement.classList.add("car-item");
            const highlightedName = query && query.trim() !== "" ? highlightText(car.name, query) : car.name;
            const highlightedId = query && query.trim() !== "" ? highlightText(car.id, query) : car.id;
            carElement.innerHTML = `
                <img src="./images/carsmodels/${car.id}.png" alt="${car.name}">
                <p><strong>Модель:</strong> ${highlightedId}</p>
                <p><strong>Назва:</strong> ${highlightedName}</p>
            `;
            searchResults.appendChild(carElement);
        });
    }

    function calculate_deposit() {
        const amount = parseFloat(document.getElementById("amount").value);
        const optionValue = document.getElementById("option").value;
        const [rate, paydays] = optionValue.split(" ").map(Number);
        const resultDiv = document.getElementById("result");

        if (isNaN(amount) || amount <= 0 || amount > 5000000) {
            resultDiv.innerText = "Помилка: Введіть суму від 1 до 5000000.";
            return;
        }

        const finalRate = 1.0 + rate / 100;
        const result = amount * Math.pow(finalRate, paydays);
        resultDiv.innerText = `Підсумкова сума: ₴${result.toFixed(2)}`;
    }

    const calculateDepositBtn = document.getElementById("calculate-deposit-btn");
    if (calculateDepositBtn) {
        calculateDepositBtn.addEventListener("click", calculate_deposit);
    }

    function calculateCraft() {
        const quantityInput = document.getElementById("quantity").value.trim();
        const recipeKey = document.getElementById("recipe").value;
        const recipe = recipes[recipeKey];
        const resultDiv = document.getElementById("craft-result");

        if (!/^\d+$/.test(quantityInput)) {
            resultDiv.innerText = "Помилка: Допускаються лише цілі числа без всяких какашок.";
            return;
        }

        const quantity = parseInt(quantityInput);
        
        if (quantity < 1) {
            resultDiv.innerText = "Помилка: Число повинно бути більше за 0.";
            return;
        }

        let resultText = `Необхідні ресурси для "${recipe.name.toLowerCase()}" у кількості ${quantity}:\n`;
        for (const [ingredient, amount] of Object.entries(recipe.ingredients)) {
            resultText += `\n- ${ingredient}: ${amount * quantity} шт.`;
        }
        resultDiv.innerText = resultText;
    }

    const calculateCraftBtn = document.getElementById("calculate-craft-btn");
    if (calculateCraftBtn) {
        calculateCraftBtn.addEventListener("click", calculateCraft);
    }

    if (searchButton) {
        searchButton.addEventListener("click", () => {
            const query = searchInput.value.trim();
            searchCars(query);
        });
    }
});