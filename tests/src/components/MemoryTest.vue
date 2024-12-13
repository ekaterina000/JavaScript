<template>
    <div class="memory-test">
      <h1>Тест на память</h1>
      <div v-if="!gameStarted" class="start-message">
        <button @click="startGame" class="start-btn">Начать игру</button>
        <button @click="goBack" class="back-btn">Назад</button>
      </div>
      <div v-else>
        <div class="timer">Время: {{ timeElapsed }} секунд</div>
        <div class="cards-container">
          <div 
            v-for="(card, index) in cards" 
            :key="index"
            class="card"
            :class="{
              'flipped': card.flipped || card.matched,
              'matched': card.matched
            }"
            @click="flipCard(card, index)"
          >
            <div class="card-inner">
              <div class="card-front"></div>
              <div class="card-back">
                <span>{{ card.value }}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="gameOver" class="game-over">
          <h2>Игра окончена! Вы нашли все пары за {{ timeElapsed }} секунд.</h2>
          <div class="buttons">
            <button @click="restartGame" class="reset-btn">Пройти тест еще раз</button>
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
        cards: [],
        flippedCards: [],
        matchedCards: [],
        gameStarted: false,
        gameOver: false,
        timeElapsed: 0,
        timerInterval: null,
      };
    },
    methods: {
      startGame() {
        this.gameStarted = true;
        this.gameOver = false;
        this.timeElapsed = 0;
        this.cards = this.generateCards();
        this.showAllCardsFor5Seconds();
        this.startTimer();
      },
      generateCards() {
        const values = ['😊', '😂', '😍', '😎', '😜', '😢', '😱', '😈', '🤡', '😳'];
        const doubledValues = [...values, ...values];
        const shuffledCards = this.shuffle(doubledValues).map(value => ({
          value,
          flipped: false,
          matched: false,
        }));
        return shuffledCards;
      },
      shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      },
      showAllCardsFor5Seconds() {
        this.cards.forEach(card => (card.flipped = true));
        setTimeout(() => {
          this.cards.forEach(card => (card.flipped = false));
        }, 5000);
      },
      startTimer() {
        this.timerInterval = setInterval(() => {
          if (!this.gameOver) {
            this.timeElapsed++;
          }
        }, 1000);
      },
      flipCard(card, index) {
        if (card.flipped || card.matched || this.flippedCards.length === 2) return;
        card.flipped = true;
        this.flippedCards.push({ card, index });
        if (this.flippedCards.length === 2) {
          this.checkForMatch();
        }
      },
      checkForMatch() {
        const [firstCard, secondCard] = this.flippedCards;
        if (firstCard.card.value === secondCard.card.value) {
          this.cards[firstCard.index].matched = true;
          this.cards[secondCard.index].matched = true;
          this.matchedCards.push(firstCard.card.value);
          if (this.matchedCards.length === this.cards.length / 2) {
            this.endGame();
          }
        } else {
          setTimeout(() => {
            this.cards[firstCard.index].flipped = false;
            this.cards[secondCard.index].flipped = false;
          }, 1000);
        }
        this.flippedCards = [];
      },
      endGame() {
        this.gameOver = true;
        clearInterval(this.timerInterval);
      },
      restartGame() {
        this.startGame();
      },
      goBack() {
        this.$router.push('/');
      },
    },
  };
  </script>
  
  <style scoped>
  .memory-test {
    text-align: center;
    padding: 20px;
  }
  
  .start-message {
    margin-top: 20px;
  }
  
  .timer {
    font-size: 18px;
    margin-bottom: 20px;
  }
  
  .cards-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(5, 1fr);
    gap: 10px;
    margin-top: 20px;
    justify-items: center;
  }
  
  .card {
    position: relative;
    width: 80px;
    height: 80px;
    background-color: #f0f0f0;
    border-radius: 10px;
    cursor: pointer;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.5s;
    transform-style: preserve-3d;
  }
  
  .card.flipped .card-inner {
    transform: rotateY(180deg);
  }
  
  .card-front,
  .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    background-color: #ffffff;
    backface-visibility: hidden;
  }
  
  .card-back {
    transform: rotateY(180deg);
  }
  
  .game-over {
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
    margin-left: 20px;
  }
  
  .back-btn:hover {
    background: linear-gradient(135deg, #f59e0b, #fbbf24);
  }
  
  .start-btn {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .start-btn {
    margin-right: 20px;
  }
  </style>
  