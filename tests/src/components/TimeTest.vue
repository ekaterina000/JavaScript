<template>
    <div class="test-view">
      <div class="test-container">
        <h1>Тест на восприятие времени</h1>
        <p class="instruction">
          Выберите количество времени, нажмите на кнопку и повторно нажмите, когда, по вашему мнению, это время прошло.
        </p>
  
        <div class="buttons">
          <button
            v-for="time in availableTimes"
            :key="time"
            :disabled="isRunning && selectedTime !== time"
            @click="handleButtonClick(time)"
            :class="{ active: isRunning && selectedTime === time }"
          >
            {{ time }} сек
          </button>
        </div>
  
        <div v-if="results.length" class="results">
          <h2>Ваши результаты</h2>
          <ul>
            <li v-for="(result, index) in results" :key="index">
              <span>Цель:</span> <strong>{{ result.target }} сек</strong>,
              <span>Фактически:</span> <strong>{{ result.actual.toFixed(2) }} сек</strong>
            </li>
          </ul>
          <button class="calculate-btn" @click="calculateResult">
            Посмотреть итог
          </button>
        </div>
  
        <button class="back-btn" @click="goBack">Назад</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        availableTimes: [3, 5, 7, 10],
        selectedTime: null,
        startTime: null,
        isRunning: false,
        results: [],
      };
    },
    methods: {
      handleButtonClick(time) {
        if (!this.isRunning) {
          this.selectedTime = time;
          this.startTime = performance.now();
          this.isRunning = true;
        } else if (this.selectedTime === time) {
          const endTime = performance.now();
          const elapsedTime = (endTime - this.startTime) / 1000;
          this.results.push({ target: this.selectedTime, actual: elapsedTime });
          this.isRunning = false;
          this.selectedTime = null;
        }
      },
      calculateResult() {
        const avgError = this.results.reduce((sum, res) => sum + Math.abs(res.target - res.actual), 0) / this.results.length;
        alert(`Ваше среднее отклонение: ${avgError.toFixed(2)} секунд`);
      },
      goBack() {
        this.$router.push('/');
      }
    },
  };
  </script>
  
  <style>
  .test-view {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    padding: 0 15px;
  }
  
  .test-container {
    background: #ffffff;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    width: 100%;
    text-align: center;
  }
  
  h1 {
    font-size: 28px;
    color: #4a5568;
    margin-bottom: 10px;
  }
  
  .instruction {
    font-size: 16px;
    margin-bottom: 20px;
    line-height: 1.6;
    color: #718096;
  }
  
  .buttons {
    display: flex;
    gap: 15px;
    justify-content: center;
    margin-bottom: 30px;
  }
  
  button {
    padding: 12px 18px;
    font-size: 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    color: #ffffff;
    background: linear-gradient(135deg, #42a5f5, #478ed1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  button:hover {
    transform: scale(1.05);
  }
  
  button:disabled {
    background: #cbd5e0;
    cursor: not-allowed;
    box-shadow: none;
  }
  
  button.active {
    background: linear-gradient(135deg, #f56565, #e53e3e);
  }
  
  .results {
    margin-top: 20px;
    text-align: left;
  }
  
  .results h2 {
    font-size: 20px;
    margin-bottom: 15px;
    color: #4a5568;
  }
  
  .results ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .results li {
    margin-bottom: 10px;
    font-size: 14px;
    color: #718096;
  }
  
  .results li strong {
    color: #2d3748;
  }
  
  .calculate-btn {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    color: #ffffff;
    background: linear-gradient(135deg, #48bb78, #38a169);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .calculate-btn:hover {
    background: linear-gradient(135deg, #38a169, #48bb78);
    transform: scale(1.05);
  }
  
  .back-btn {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    color: #ffffff;
    background: linear-gradient(135deg, #fbbf24, #f59e0b);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .back-btn:hover {
    background: linear-gradient(135deg, #f59e0b, #fbbf24);
    transform: scale(1.05);
  }
  </style>
  