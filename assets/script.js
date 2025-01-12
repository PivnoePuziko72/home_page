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
    const storedHashes = [
        "cdbd4e11c4bfcf81f9d05edaa2e7bb4c8ed54b8e5cd0cf2f111d8616c11db6e1",
        "bcf34e68ef75960b68bcf15436b3e1dc023b20f174c3ec74ad8b05c2634e2499" 
    ];

    const loginContainer = document.getElementById("login-container");
    const allcarsContainer = document.getElementById("allcars-container");
    const errorMessage = document.getElementById("error-message");

    async function hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hash = await crypto.subtle.digest("SHA-256", data);
        return Array.from(new Uint8Array(hash))
            .map(b => b.toString(16).padStart(2, "0"))
            .join("");
    }

    window.checkPassword = async () => {
        const inputPassword = document.getElementById("password-input").value;
        const hashedPassword = await hashPassword(inputPassword);

        if (storedHashes.includes(hashedPassword)) {
            loginContainer.style.display = "none";
            allcarsContainer.style.display = "block";
        } else {
            errorMessage.style.display = "block";
        }
    };
});

    } else {
        errorMessage.style.display = "block";
    }
}
