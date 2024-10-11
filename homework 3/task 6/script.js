function analyzePrices() {
    const input = document.getElementById('input').value;
    const output = document.getElementById('output');
    output.innerHTML = '';

    let items = input.split(';').map(item => {
        let [name, prices] = item.split(':');
        let priceArray = prices.split(',').map(price => parseFloat(price.trim()));
        let avgPrice = priceArray.reduce((a, b) => a + b, 0) / priceArray.length;
        return { name: name.trim(), avgPrice: avgPrice };
    });

    items.sort((a, b) => a.avgPrice === b.avgPrice ? a.name.localeCompare(b.name) : a.avgPrice - b.avgPrice);

    items.forEach(item => {
        let div = document.createElement('div');
        div.textContent = item.name;
        output.appendChild(div);
    });
}

