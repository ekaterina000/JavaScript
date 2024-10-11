function calculateCalories() {
    const productNames = document.getElementById('productNames').value.split(' ');
    const productValues = document.getElementById('productValues').value.split(' ');
    const output = document.getElementById('lowest-calorie-product');

    let lowestCalorieProduct = '';
    let lowestCalories = Infinity;

    for (let i = 0; i < productNames.length; i++) {
        const [proteins, fats, carbs] = productValues[i].split('-').map(Number);
        const calories = 0.4 * proteins + 0.3 * fats + 0.3 * carbs;

        if (calories < lowestCalories) {
            lowestCalories = calories;
            lowestCalorieProduct = productNames[i];
        }
    }

    output.textContent = `${lowestCalorieProduct} (${lowestCalories.toFixed(2)} ккал)`;
}
