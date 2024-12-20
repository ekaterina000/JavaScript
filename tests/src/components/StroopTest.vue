<template>
  <div class="test-view">
    <div class="test-container">
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

        <div v-else class="results">
          <h2>Результаты</h2>
          <p>Вы правильно ответили на {{ score }} из {{ questions.length }} вопросов.</p>
          <p>Время выполнения: {{ timeTaken.toFixed(2) }} сек</p>
          <div class="buttons">
            <button @click="resetTest" class="start-btn">Пройти снова</button>
            <button @click="goBack" class="back-btn">Назад</button>
          </div>
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
      questions: [],
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
      this.generateQuestions();
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
    generateQuestions() {
      this.questions = [];
      const usedCombinations = new Set();

      while (this.questions.length < 15) {
        const wordColor = this.getRandomColor();
        let textColor;
        do {
          textColor = this.getRandomColor();
        } while (textColor === wordColor || usedCombinations.has(`${wordColor}-${textColor}`));

        usedCombinations.add(`${wordColor}-${textColor}`);
        this.questions.push({
          word: this.colorNames[wordColor],
          textColor: textColor,
        });
      }
    },
    getRandomColor() {
      const randomIndex = Math.floor(Math.random() * this.colorOptions.length);
      return this.colorOptions[randomIndex];
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
  max-width: 600px;
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

.timer {
  font-size: 18px;
  margin-bottom: 20px;
  color: #2d3748;
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
  flex-wrap: wrap;
}

button {
  padding: 12px 18px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #ffffff;
}

.start-btn,
.back-btn {
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 8px;
}

.start-btn {
  background: linear-gradient(135deg, #42a5f5, #478ed1);
}

.start-btn:hover {
  transform: scale(1.05);
}

.back-btn {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
}

.back-btn:hover {
  background: linear-gradient(135deg, #f59e0b, #fbbf24);
}
</style>
