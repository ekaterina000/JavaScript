<template>
    <div class="reaction-test">
      <h1>Нажмите на фигуру как можно быстрее!</h1>
      <p class="instruction">У вас есть только 30 секунд. Чем быстрее вы нажмете, тем лучше ваш результат!</p>
  
      <div class="game-board">
        <div
          v-for="i in 30"
          :key="i"
          class="square"
          :class="{ active: i === activeSquare }"
          @click="handleClick(i)"
        ></div>
      </div>
  
      <div class="score-board">
        <p>Очки: {{ score }}</p>
        <p>Время: {{ elapsedTime.toFixed(2) }} сек</p>
        <p v-if="gameOver">
          Игра окончена! Ваше среднее время реакции: {{ averageReactionTime.toFixed(2) }} сек
        </p>
      </div>
  
      <div v-if="gameOver" class="end-buttons">
        <button @click="resetGame" class="reset-btn">Начать заново</button>
        <button @click="goBack" class="back-btn">Назад</button>
      </div>
    </div>
  </template>
<script>
export default {
  data() {
    return {
      gameOver: false,
      score: 0,
      elapsedTime: 0,
      activeSquare: null,
      gameInterval: null,
      startTime: null,
      reactionTimes: [],
      squareStartTime: null,
    };
  },
  computed: {
    averageReactionTime() {
      if (this.reactionTimes.length === 0) return 0;
      const total = this.reactionTimes.reduce((sum, time) => sum + time, 0);
      return total / this.reactionTimes.length;
    },
  },
  mounted() {
    this.startGame();
  },
  methods: {
    startGame() {
      this.gameOver = false;
      this.score = 0;
      this.elapsedTime = 0;
      this.reactionTimes = [];
      this.startTime = Date.now();
      this.generateRandomSquare();
      this.gameInterval = setInterval(this.updateTime, 100);
    },
    updateTime() {
      this.elapsedTime = (Date.now() - this.startTime) / 1000;
      if (this.elapsedTime >= 30) {
        this.endGame();
      }
    },
    generateRandomSquare() {
      const randomIndex = Math.floor(Math.random() * 21) + 1;
      this.activeSquare = randomIndex;
      this.squareStartTime = Date.now();
    },
    handleClick(index) {
      if (index === this.activeSquare) {
        const reactionTime = (Date.now() - this.squareStartTime) / 1000;
        this.reactionTimes.push(reactionTime);
        this.score++;
        this.generateRandomSquare();
      }
    },
    endGame() {
      this.gameOver = true;
      clearInterval(this.gameInterval);
    },
    resetGame() {
      clearInterval(this.gameInterval);
      this.startGame();
    },
    goBack() {
      this.$router.push('/');
    },
  },
};
</script>





<style scoped>
.reaction-test {
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

.game-board {
  display: grid;
  grid-template-columns: repeat(7, 60px);
  grid-gap: 10px;
  margin-bottom: 20px;
}

.square {
  width: 60px;
  height: 60px;
  background-color: #e2e8f0;
  border: 1px solid #cbd5e0;
  border-radius: 8px;
  transition: background-color 0.2s;
  cursor: pointer;
}

.square.active {
  background-color: #68d391;
}

.score-board {
  margin-bottom: 20px;
}

.end-buttons {
  display: flex;
  gap: 15px;
}

.reset-btn {
  background-color: #3182ce;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.reset-btn:hover {
  background-color: #2b6cb0;
}

.back-btn {
  background: linear-gradient(135deg, #f6ad55, #ed8936);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.back-btn:hover {
  background: linear-gradient(135deg, #ed8936, #f6ad55);
}
</style>
  