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

      const randomSizes = [
        Math.floor(Math.random() * (maxSize - minSize) + minSize),
        Math.floor(Math.random() * (maxSize - minSize) + minSize),
      ].sort((a, b) => a - b);

      const randomNumbers = [
        Math.floor(Math.random() * 9) + 1,
        Math.floor(Math.random() * 9) + 1,
      ];

      const shuffledIndices = Math.random() > 0.5 ? [0, 1] : [1, 0];

      const newCircles = [];
      for (let i = 0; i < 2; i++) {
        let newPosition;
        let overlap;

        do {
          newPosition = {
            top: Math.random() * 60 + 20, // Позиция внутри безопасной зоны (20% сверху и снизу от экрана)
            left: Math.random() * 60 + 20, // Позиция внутри безопасной зоны (20% слева и справа)
          };

          // Проверяем пересечения с другими кругами
          overlap = newCircles.some((circle) => {
            const distance = Math.sqrt(
              Math.pow(circle.position.top - newPosition.top, 2) +
              Math.pow(circle.position.left - newPosition.left, 2)
            );
            return distance < (circle.size + randomSizes[i]) / 2; // Проверка на пересечение с учётом радиусов
          });
        } while (overlap);

        newCircles.push({
          size: randomSizes[shuffledIndices[i]],
          number: randomNumbers[shuffledIndices[i]],
          isLarger: shuffledIndices[i] === 1,
          position: newPosition,
        });
      }

      this.circles = newCircles;
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
