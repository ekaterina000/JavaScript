<template>
    <div class="wrapper">
        <h1>Погодное приложение</h1>
        <div class="region-selection">
            <h2>Средняя температура по региону</h2>
            <select v-model="selectedRegion">
                <option disabled value="">Выберите регион</option>
                <option value="europe">Европа</option>
                <option value="asia">Азия</option>
                <option value="america">Америка</option>
                <option value="russia">Россия</option>
            </select>
            <button @click="getAverageTemp">Получить среднюю температуру</button>
            <div v-if="averageTemp != null" class="average-temp">
                <p>Средняя температура в регионе: {{ averageTemp }}°C</p>
            </div>
        </div>
        <p class="error">{{ error }}</p>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            error: "",
            averageTemp: null,
            selectedRegion: "",
            regions: {
                europe: ["Лондон", "Париж", "Берлин"],
                asia: ["Токио", "Пекин", "Сеул"],
                america: ["Нью-Йорк", "Лос-Анджелес", "Чикаго"],
                russia: ["Москва", "Санкт-Петербург", "Казань"]
            }
        };
    },
    methods: {
        getAverageTemp() {
            if (!this.selectedRegion) {
                this.error = "Пожалуйста, выберите регион";
                return false;
            }

            this.error = "";
            const cities = this.regions[this.selectedRegion];
            const requests = cities.map(city =>
                axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0ba39c23e0dd0a5b63ccdd6354473356`)
            );

            Promise.all(requests)
                .then(responses => {
                    const temps = responses.map(res => res.data.main.temp);
                    this.averageTemp = (temps.reduce((sum, temp) => sum + temp, 0) / temps.length).toFixed(2);
                })
                .catch(() => {
                    this.error = "Не удалось получить данные от некоторых городов";
                });
        }
    }
};
</script>
<style scoped>
.error {
    color: #d03939;
    margin-top: 20px;
}

.wrapper {
    width: 900px;
    padding: 20px;
    border-radius: 20px;
    background: #1f0f24;
    text-align: center;
    color: #fff;
}

.wrapper h1 {
    margin-bottom: 30px;
}

.region-selection {
    margin-bottom: 30px;
}

.wrapper button {
    background: #e3bc4b;
    color: #fff;
    border-radius: 10px;
    border: 2px solid #b99935;
    padding: 10px 15px;
    margin: 10px;
    cursor: pointer;
    transition: transform 500ms ease;
}

.wrapper button:hover {
    transform: scale(1.1) translateY(-5px);
}

select {
    margin-top: 10px;
    padding: 5px;
    font-size: 16px;
}

.average-temp {
    margin-top: 20px;
    font-size: 18px;
    font-weight: bold;
}
</style>
