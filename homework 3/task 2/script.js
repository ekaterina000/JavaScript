let targetNumber;
let score = 0;
let attempts = 0;

function generateTargetNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkGuess() {
  const guessInput = document.getElementById("guess-input");
  const resultText = document.getElementById("result-text");
  const scoreText = document.getElementById("score-text");
  const attemptsText = document.getElementById("attempts-text");

  const guess = parseInt(guessInput.value);
  attempts++;

  if (guess === targetNumber) {
    resultText.textContent = "Correct! You guessed the number.";
    resultText.classList.remove("incorrect");
    resultText.classList.add("correct");
    score += 10 - attempts;
    scoreText.textContent = `Score: ${score}`;
    attemptsText.textContent = `Attempts: ${attempts}`;
    guessInput.value = "";
    generateNewTargetNumber();
  } else {
    resultText.textContent = "Incorrect. Try again.";
    resultText.classList.remove("correct");
    resultText.classList.add("incorrect");
    scoreText.textContent = `Score: ${score}`;
    attemptsText.textContent = `Attempts: ${attempts}`;
    guessInput.value = "";
  }
}

function generateNewTargetNumber() {
  const minNumber = 1;
  const maxNumber = 15;
  targetNumber = generateTargetNumber(minNumber, maxNumber);
  attempts = 0;
}

generateNewTargetNumber();
