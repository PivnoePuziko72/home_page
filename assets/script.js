document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    const logo = document.querySelector(".sidebar img");

    // Переключение видимости боковой панели
    logo.addEventListener("click", () => {
        sidebar.classList.toggle("hidden");
        document.querySelector(".content").classList.toggle("shifted");
    });

    // Логотип всегда на виду
    sidebar.addEventListener("transitionend", () => {
        if (sidebar.classList.contains("hidden")) {
            logo.style.transform = "translateX(0)"; // Возвращаем в исходное положение
        } else {
            logo.style.transform = "none"; // Сбрасываем смещение
        }
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
