<template>
  <div class="stroop-test">
    <h1>Тест на обработку информации</h1>
    <div v-if="!testStarted" class="start-message">
      <button @click="startTest" class="start-btn">Начать тест</button>
      <button @click="goBack" class="back-btn">Назад</button>
    </div>
    <div v-else>
      <div class="instruction">Выберите больший круг, игнорируя цифры.</div>
      <div class="stimulus">
        <div
          v-for="(circle, index) in circles"
          :key="index"
          :class="['circle', { larger: circle.isLarger }]"
          :style="{
            width: circle.size + 'px',
            height: circle.size + 'px',
            fontSize: circle.size / 3 + 'px',
            top: circle.position.top + '%',
            left: circle.position.left + '%',
          }"
          @click="selectCircle(index)"
        >
          {{ circle.number }}
        </div>
      </div>
      <div v-if="testCompleted" class="test-completed">
        <h2>Тест завершён!</h2>
        <p>Правильных ответов: {{ correctAnswers }} из {{ maxTasks }}.</p>
        <p>Ваше время: {{ timeElapsed }} секунд.</p>
        <div class="buttons">
          <button @click="restartTest" class="reset-btn">Пройти тест ещё раз</button>
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
      testStarted: false,
      testCompleted: false,
      timeElapsed: 0,
      timerInterval: null,
      taskCount: 0,
      maxTasks: 10,
      correctAnswers: 0,
      circles: [],
      gridSize: 5,
    };
  },
  methods: {
    startTest() {
      this.resetTest();
      this.startTimer();
      this.generateStimuli();
    },
    generateStimuli() {
      const minSize = 80;
      const maxSize = 160;
      const gridSize = this.gridSize;
      const cellSize = 100 / gridSize; 
      const usedCells = []; 

      const getRandomCell = () => {
        let cell;
        do {
          const row = Math.floor(Math.random() * gridSize);
          const col = Math.floor(Math.random() * gridSize);
          cell = { row, col };
        } while (
          usedCells.some(
            (c) =>
              Math.abs(c.row - cell.row) <= 1 &&
              Math.abs(c.col - cell.col) <= 1
          )
        );
        usedCells.push(cell);
        return cell;
      };

      const randomSizes = [
        Math.floor(Math.random() * (maxSize - minSize) + minSize),
        Math.floor(Math.random() * (maxSize - minSize) + minSize),
      ].sort((a, b) => a - b);

      const randomNumbers = [
        Math.floor(Math.random() * 9) + 1,
        Math.floor(Math.random() * 9) + 1,
      ];

      const shuffledIndices = Math.random() > 0.5 ? [0, 1] : [1, 0];
      this.circles = shuffledIndices.map((i) => {
        const cell = getRandomCell();
        return {
          size: randomSizes[i],
          number: randomNumbers[i],
          isLarger: i === 1,
          position: {
            top: cell.row * cellSize + cellSize / 4,
            left: cell.col * cellSize + cellSize / 4,
          },
        };
      });
    },
    selectCircle(index) {
      const selectedCircle = this.circles[index];
      if (selectedCircle.isLarger) {
        this.correctAnswers++;
      }
      this.taskCount++;
      if (this.taskCount >= this.maxTasks) {
        this.completeTest();
      } else {
        this.generateStimuli();
      }
    },
    startTimer() {
      this.timerInterval = setInterval(() => {
        if (!this.testCompleted) {
          this.timeElapsed++;
        }
      }, 1000);
    },
    completeTest() {
      this.testCompleted = true;
      clearInterval(this.timerInterval);
    },
    restartTest() {
      this.startTest();
    },
    resetTest() {
      this.testStarted = true;
      this.testCompleted = false;
      this.timeElapsed = 0;
      this.taskCount = 0;
      this.correctAnswers = 0;
      this.circles = [];
      clearInterval(this.timerInterval);
    },
    goBack() {
      this.$router.push('/');
    },
  },
};
</script>
<style scoped>
.stroop-test {
  text-align: center;
  padding: 20px;
  position: relative;
}

.start-message {
  margin-top: 20px;
}

.instruction {
  font-size: 18px;
  margin: 20px 0;
  color: #333;
}

.stimulus {
  position: relative;
  width: 100%;
  height: 400px;
}

.circle {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  border: 2px solid #ccc;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.3s, background-color 0.3s;
}

.circle:hover {
  transform: scale(1.1);
  background-color: #f9f9f9;
}

.test-completed {
  margin-top: 30px;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  background-color: #4CAF50;
  color: white;
  border: none;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

.back-btn {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: white;
}

.back-btn:hover {
  background: linear-gradient(135deg, #f59e0b, #fbbf24);
}
</style>
