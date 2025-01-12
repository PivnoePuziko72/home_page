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

// Хэш пароля для "odessit2008"
const VALID_HASHES = [
    "c8d4eea9c081a092dc20e82d0fbc8ec5a4c0b1cbba4b06d4885a25bc633293cb",
    "d5c1b409fcb58b1dc7c4e1d29de2182b5b8bb93d2e8d8efb9f4de670d5c7a437"
];

function hashPassword(password) {
    return crypto.subtle.digest("SHA-256", new TextEncoder().encode(password)).then(buffer => {
        return Array.from(new Uint8Array(buffer))
            .map(byte => byte.toString(16).padStart(2, "0"))
            .join("");
    });
}

async function checkPassword() {
    const passwordInput = document.getElementById("password-input").value;
    const errorMessage = document.getElementById("error-message");
    const loginContainer = document.getElementById("login-container");
    const allcarsContainer = document.getElementById("allcars-container");

    const hashedPassword = await hashPassword(passwordInput);

    if (VALID_HASHES.includes(hashedPassword)) {
        loginContainer.style.display = "none";
        allcarsContainer.style.display = "block";
    } else {
        errorMessage.style.display = "block";
    }
}
