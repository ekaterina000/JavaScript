const cities = ['Самара', 'Санкт-Петербург', 'Саратов', 'Москва', 'Магадан', 'Ижевск'];

function checkCity() {
    const cityInput = document.getElementById('cityInput').value.trim();
    const firstLetter = cityInput[0].toUpperCase();

    const cityResult = document.getElementById('city-result');

    if (cities.includes(cityInput)) {
        const sameLetterCities = cities.filter(city => city[0].toUpperCase() === firstLetter);
        cityResult.textContent = `Города, начинающиеся с буквы "${firstLetter}": ${sameLetterCities.join(', ')}`;
    } else {
        cityResult.textContent = 'Такого города нет в списке';
    }
}
