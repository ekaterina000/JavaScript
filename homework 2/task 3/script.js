let balance = 1000;

function performOperation() {
    const amount = parseFloat(document.getElementById('amount').value);
    const operation = document.getElementById('operation').value;
    const resultDiv = document.getElementById('result');

    if (isNaN(amount) || amount <= 0) {
        resultDiv.innerHTML = "Пожалуйста, введите корректную сумму.";
        resultDiv.classList.add('visible');
        return;
    }

    if (operation === 'deposit') {
        balance += amount;
        resultDiv.innerHTML = `Вы внесли ${amount.toFixed(2)}. Текущий баланс: ${balance.toFixed(2)}.`;
    } else if (operation === 'withdraw') {
        if (amount > balance) {
            resultDiv.innerHTML = "Недостаточно средств на счёте.";
        } else {
            balance -= amount;
            resultDiv.innerHTML = `Вы сняли ${amount.toFixed(2)}. Текущий баланс: ${balance.toFixed(2)}.`;
        }
    }

    resultDiv.classList.add('visible');
}
