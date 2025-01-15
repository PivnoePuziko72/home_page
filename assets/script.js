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
                "Гілка сосни": 15,
                "Льодяник": 3,
                "Подарунковий папір": 3,
                "Апельсин": 2,
                "Червона фарба": 3
            }
        }
    };

    hamburger.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

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
    
    document.getElementById("calculate-deposit-btn").addEventListener("click", calculate_deposit);

    function calculateCraft() {
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

    searchButton.addEventListener("click", () => {
        const query = searchInput.value.trim();
        searchCars(query);
    });

    document.getElementById("calculate-craft-btn").addEventListener("click", calculateCraft);

    hamburger.addEventListener("mousemove", (event) => {
        const rect = hamburger.getBoundingClientRect();
        const offsetX = event.clientX - rect.left - rect.width / 2;
        const offsetY = event.clientY - rect.top - rect.height / 2;
        const distance = Math.sqrt(offsetX ** 2 + offsetY ** 2);

        if (distance < 100) {
            const maxMove = 20;
            const moveX = Math.max(-maxMove, Math.min(maxMove, offsetX));
            const moveY = Math.max(-maxMove, Math.min(maxMove, offsetY));
            hamburger.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });
});
