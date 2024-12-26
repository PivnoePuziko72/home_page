document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    const content = document.querySelector(".content");
    const toggleButton = document.createElement("button");
    toggleButton.id = "menuToggle";
    toggleButton.innerText = "Меню";
    document.body.appendChild(toggleButton);

    toggleButton.addEventListener("click", () => {
        sidebar.classList.toggle("active");
        content.classList.toggle("fullscreen");
    });
});

function calculateDeposit() {
    const amount = parseFloat(document.getElementById("amount").value);
    const [rate, paydays] = document.getElementById("option").value.split(" ").map(Number);
    const resultDiv = document.getElementById("result");

    if (isNaN(amount) || amount <= 0 || amount > 5000000) {
        resultDiv.innerText = "Помилка: Введіть суму від 1 до 5000000.";
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

function toggleMenu() {
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');
    sidebar.classList.toggle('open');
    content.classList.toggle('shifted');
}
