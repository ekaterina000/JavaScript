function checkPalindrome() {
  const inputText = document.getElementById("input-text").value.trim();
  const resultDiv = document.getElementById("result");

  if (isPalindrome(inputText)) {
    resultDiv.textContent = `"${inputText}" is a palindrome!`;
    resultDiv.classList.remove("invalid");
    resultDiv.classList.add("valid");
  } else {
    resultDiv.textContent = `"${inputText}" is not a palindrome.`;
    resultDiv.classList.remove("valid");
    resultDiv.classList.add("invalid");
  }
}

function isPalindrome(str) {
  str = str.replace(/\s/g, '').toLowerCase();

  for (let i = 0; i < Math.floor(str.length / 2); i++) {
    if (str[i] !== str[str.length - 1 - i]) {
      return false;
    }
  }

  return true;
}
