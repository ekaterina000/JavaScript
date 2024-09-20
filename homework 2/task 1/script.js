function checkTriangleExistence(a, b, c) {
    if (a + b > c && a + c > b && b + c > a) {
        return "Треугольник существует";
    } else {
        return "Треугольник не существует";
    }
}

function checkTriangle() {
    const sideA = parseFloat(document.getElementById('sideA').value);
    const sideB = parseFloat(document.getElementById('sideB').value);
    const sideC = parseFloat(document.getElementById('sideC').value);

    if (isNaN(sideA) || isNaN(sideB) || isNaN(sideC) || sideA <= 0 || sideB <= 0 || sideC <= 0) {
        document.getElementById('result').innerHTML = "Пожалуйста, введите корректные значения сторон.";
        document.getElementById('result').classList.add('visible');
        return;
    }

    const result = checkTriangleExistence(sideA, sideB, sideC);
    document.getElementById('result').innerHTML = result;
    document.getElementById('result').classList.add('visible');
}
