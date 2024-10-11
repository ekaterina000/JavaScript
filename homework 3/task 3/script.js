function analyzeProductProfits() {
  const productProfitsInput = document.getElementById("product-profits");
  const highestProfitProductElement = document.getElementById("highest-profit-product");

  const productProfits = {};
  const lines = productProfitsInput.value.trim().split("\n");
  for (const line of lines) {
    const [product, profit] = line.split(",").map(item => item.trim());
    if (product in productProfits) {
      productProfits[product] += parseInt(profit);
    } else {
      productProfits[product] = parseInt(profit);
    }
  }

  let highestProfitProduct = "";
  let highestProfit = 0;
  for (const [product, profit] of Object.entries(productProfits)) {
    if (profit > highestProfit) {
      highestProfitProduct = product;
      highestProfit = profit;
    }
  }

  highestProfitProductElement.textContent = `${highestProfitProduct} ${highestProfit}`;
}
