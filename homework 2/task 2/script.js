const powerCalculator = {
    base: 2,

    calculate: function(Y) {
        return Math.pow(Y - 2, Y);
    }
};

function calculatePower() {
    const numberY = parseFloat(document.getElementById('numberY').value);

    if (isNaN(numberY) || numberY <= 2) {
        document.getElementById('result').innerHTML = "Пожалуйста, введите корректное число Y (больше 2).";
        document.getElementById('result').classList.add('visible');
        return;
    }

    const result = powerCalculator.calculate(numberY);
    document.getElementById('result').innerHTML = `Результат: ${(result).toFixed(2)}`;
    document.getElementById('result').classList.add('visible');
}
