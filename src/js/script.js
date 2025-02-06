// Vercel Analytics
(() => {
    const script = document.createElement('script');
    script.src = '/_vercel/insights/script.js';
    document.head.appendChild(script);
})();

// Vercel Speed Insights 
(() => {
    const script = document.createElement('script');
    script.src = '/_vercel/speed-insights/script.js';
    document.head.appendChild(script);
})();

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

    function copyToClipboard(text, resultDiv, type = 'default') {
        if (!text || text.trim() === '' || text.includes('Помилка:')) {
            const message = document.createElement('div');
            message.className = 'copy-message';
            message.textContent = "Нема що копіювати.";
            resultDiv.appendChild(message);
            setTimeout(() => {
                message.remove();
            }, 2000);
            return;
        }
    
        let copyText = text;
        if (type === 'deposit') {
            const match = text.match(/₴([\d.]+)/);
            copyText = match ? match[1] : '';
        }

        navigator.clipboard.writeText(copyText)
            .then(() => {
                const message = document.createElement('div');
                message.className = 'copy-message';
                message.textContent = "Результат скопійовано.";
                resultDiv.appendChild(message);
                setTimeout(() => {
                    message.remove();
                }, 2000);
            })
            .catch(() => {
                const message = document.createElement('div');
                message.className = 'copy-message';
                message.textContent = "Неможливо скопіювати.";
                resultDiv.appendChild(message);
                setTimeout(() => {
                    message.remove();
                }, 2000);
            });
    }
    
    // Matrix effect function
    function showMatrixEffect() {
        const matrixBg = document.querySelector('.matrix-bg');
        if (matrixBg) {
            matrixBg.style.display = 'block';
            matrixBg.classList.add('active');
            setTimeout(() => {
                matrixBg.classList.remove('active');
                matrixBg.style.display = 'none';
            }, 2000);
        }
    }

    // Flash cards
    const flashCards = document.querySelectorAll('.flash-card');
    flashCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('active');
        });
    });

    // Hamburger menu
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }

    // Copy buttons
    const copyDepositBtn = document.getElementById("copy-deposit-btn");
    if (copyDepositBtn) {
        copyDepositBtn.addEventListener("click", () => {
            const resultDiv = document.getElementById("result");
            const text = resultDiv.innerText;
            copyToClipboard(text, resultDiv, 'deposit');
        });
    }

    const copyCraftBtn = document.getElementById("copy-craft-btn");
    if (copyCraftBtn) {
        copyCraftBtn.addEventListener("click", () => {
            const resultDiv = document.getElementById("craft-result");
            const text = resultDiv.innerText;
            copyToClipboard(text, resultDiv);
        });
    }

// Пошук транспорту
    const searchButton = document.getElementById("search-btn");
    const searchInput = document.getElementById("search-input");
    const searchResults = document.getElementById("search-results");

    let vehicles = [];

    fetch("../json/carsData.json")
        .then(response => response.json())
        .catch(() => fetch("src/json/carsData.json").then(response => response.json()))
        .then(data => {
            vehicles = data.vehicles;
        })
        .catch(error => {
            console.error('Error loading vehicles:', error);
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
        if (typeof text !== 'string') return text;
        const regExp = new RegExp(`(${query})`, 'gi');
        return text.replace(regExp, '<span class="highlight">$1</span>');
    }

    function displayResults(cars, query) {
        searchResults.innerHTML = "";
        if (cars.length === 0) {
            searchResults.innerHTML = "<p>Не знайшов жодного результату за вашим запитом.</p>";
            return;
        }

        cars.forEach(car => {
            const carElement = document.createElement("div");
            carElement.classList.add("car-item");
            const highlightedName = query ? highlightText(car.name, query) : car.name;
            const highlightedId = query ? highlightText(car.id, query) : car.id;
            carElement.innerHTML = `
                <img src="../images/carsmodels/${car.id}.png" alt="${car.name}">
                <p><strong>Модель:</strong> ${highlightedId}</p>
                <p><strong>Назва:</strong> ${highlightedName}</p>
            `;
            searchResults.appendChild(carElement);
        });
    }

    // Calculate functions
    function calculateDeposit() {
        const amount = parseFloat(document.getElementById("amount").value);
        const optionValue = document.getElementById("option").value;
        const resultDiv = document.getElementById("result");

        if (isNaN(amount) || amount <= 0 || amount > 5000000) {
            resultDiv.innerText = "Помилка: Введіть суму від 1 до 5000000.";
            return;
        }

        const [rate, paydays] = optionValue.split(" ").map(Number);
        const finalRate = 1.0 + rate / 100;
        const result = amount * Math.pow(finalRate, paydays);
        resultDiv.innerText = `Підсумкова сума: ₴${result.toFixed(2)}`;
    }

    function calculateCraft() {
        const quantityInput = document.getElementById("quantity").value.trim();
        const recipeKey = document.getElementById("recipe").value;
        const recipe = recipes[recipeKey];
        const resultDiv = document.getElementById("craft-result");

        if (!recipe) return;

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

    // Button listeners
    const calculateDepositBtn = document.getElementById("calculate-deposit-btn");
    if (calculateDepositBtn) {
        calculateDepositBtn.addEventListener("click", () => {
            calculateDeposit();
            showMatrixEffect();
        });
    }

    const calculateCraftBtn = document.getElementById("calculate-craft-btn");
    if (calculateCraftBtn) {
        calculateCraftBtn.addEventListener("click", () => {
            calculateCraft();
            showMatrixEffect();
        });
    }

    if (searchButton) {
        searchButton.addEventListener("click", () => {
            const query = searchInput.value.trim();
            searchCars(query);
            showMatrixEffect();
        });
    }
});
