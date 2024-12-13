<template>
    <div class="stroop-test">
      <div v-if="!gameStarted">
        <h1>Тест Струпа</h1>
        <p class="instruction">
          Выберите цвет, которым написано слово, а не значение слова.
        </p>
        
        <div class="buttons">
          <button @click="startTest" class="start-btn">Начать тест</button>
          <button @click="goBack" class="back-btn">Назад</button>
        </div>
      </div>
  
      <div v-else>
        <div class="timer">
          Время: {{ timeTaken.toFixed(2) }} сек
        </div>
  
        <div v-if="currentQuestion < questions.length" class="question">
          <div
            class="word"
            :style="{ color: questions[currentQuestion].textColor }"
          >
            {{ questions[currentQuestion].word }}
          </div>
  
          <div class="options">
            <button
              v-for="(color, index) in colorOptions"
              :key="index"
              :style="{ backgroundColor: color }"
              @click="checkAnswer(color)"
            >
              {{ colorNames[color] }}
            </button>
          </div>
        </div>
  
        <div v-else class="result">
          <h2>Результат</h2>
          <p>Вы правильно ответили на {{ score }} из {{ questions.length }}.</p>
          <p>Время выполнения: {{ timeTaken.toFixed(2) }} сек</p>
          <div class="buttons">
            <button @click="resetTest" class="start-btn">Пройти тест снова</button>
            <button @click="goBack" class="back-btn">Назад</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        gameStarted: false,
        currentQuestion: 0,
        score: 0,
        timeTaken: 0,
        timer: null,
        questions: [
          { word: 'Красный', textColor: 'blue' },
          { word: 'Синий', textColor: 'green' },
          { word: 'Зеленый', textColor: 'red' },
          { word: 'Желтый', textColor: 'purple' },
          { word: 'Фиолетовый', textColor: 'orange' },
        ],
        colorOptions: ['red', 'green', 'blue', 'yellow', 'purple', 'orange'],
        colorNames: {
          red: 'Красный',
          green: 'Зеленый',
          blue: 'Синий',
          yellow: 'Желтый',
          purple: 'Фиолетовый',
          orange: 'Оранжевый',
        },
      };
    },
    methods: {
      startTest() {
        this.gameStarted = true;
        this.timeTaken = 0;
        this.score = 0;
        this.currentQuestion = 0;
        this.shuffleQuestions();
        this.startTimer();
      },
  
      startTimer() {
        this.timer = setInterval(() => {
          this.timeTaken += 0.01;
        }, 10);
      },
  
      checkAnswer(selectedColor) {
        const correctColor = this.questions[this.currentQuestion].textColor;
        if (selectedColor === correctColor) {
          this.score++;
        }
        this.currentQuestion++;
  
        if (this.currentQuestion >= this.questions.length) {
          clearInterval(this.timer);
        }
      },
  
      shuffleQuestions() {
        this.questions = this.questions.sort(() => Math.random() - 0.5);
      },
  
      resetTest() {
        this.gameStarted = false;
        clearInterval(this.timer);
      },
  
      goBack() {
        this.$router.push('/');
      },
    },
  };
  </script>
  
  <style scoped>
  .stroop-test {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  
  h1 {
    font-size: 28px;
    color: #4a5568;
    margin-bottom: 20px;
  }
  
  .instruction {
    font-size: 16px;
    margin-bottom: 20px;
    line-height: 1.6;
    color: #718096;
  }
  
  .timer {
    font-size: 18px;
    margin-bottom: 20px;
    color: #2d3748;
  }
  
  .question {
    text-align: center;
  }
  
  .word {
    font-size: 48px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .options {
    display: flex;
    gap: 15px;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .buttons {
    display: flex;
    gap: 20px;
  }
  
  button {
    font-size: 16px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .start-btn {
    background-color: #3498db;
    color: white;
  }
  
  .start-btn:hover {
    background-color: #2980b9;
  }
  
  .reset-btn {
    background-color: #3498db;
    color: white;
  }
  
  .reset-btn:hover {
    background-color: #2980b9;
  }
  
  .back-btn {
    background: linear-gradient(135deg, #fbbf24, #f59e0b);
    color: white;
  }
  
  .back-btn:hover {
    background: linear-gradient(135deg, #f59e0b, #fbbf24);
  }
  </style>
  