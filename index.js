let letters = document.querySelectorAll(".scoreboard-letter");
let word = "";
let guess = "";
let currentLetter = 1;
let currentAttempt = 0;

document.addEventListener("keydown", function (event) {
  const action = event.key;

  addLetter(action);
  setTimeout(check, 0);
});

function check() {
  if ((currentLetter - 1) % 5 == 0) {
    if (guess == word) {
      setTimeout(() => alert("you r smart. new word generated!!"), 100);
      reset();
      getword();
    } else {
      addColorTiles();
      guess = "";
      currentAttempt += 1;
    }
  }
  if (currentLetter == 21) {
    setTimeout(() => alert("you lose 😂😂. word was " + word), 100);
    reset();
    getword();
  }
}

function addColorTiles() {
  let answerletters = word.split("");

  for (let i = 5 * currentAttempt; i < 5 * (currentAttempt + 1); i++) {
    if (letters[i].textContent == answerletters[i - 5 * currentAttempt]) {
      letters[i].classList.add("correct");
      let num = answerletters.indexOf(letters[i].textContent);
      answerletters.splice(num, 1, 0);
    }
  }

  for (let i = 5 * currentAttempt; i < 5 * (currentAttempt + 1); i++) {
    if (answerletters.indexOf(letters[i].textContent) > -1) {
      letters[i].classList.add("notwrong");
      letters[i].classList.remove("correct");
      let num = answerletters.indexOf(letters[i].textContent);
      answerletters.splice(num, 1, 0);
    }
  }
}

function addLetter(letter) {
  guess += letter;
  letters[currentLetter - 1].textContent = letter;
  currentLetter += 1;
}

function reset() {
  currentLetter = 1;
  currentAttempt = 0;
  letters.forEach((letter) => {
    letter.textContent = "";
    letter.classList.remove("notwrong");
    letter.classList.remove("correct");
  });
}

async function getword() {
  let response = await fetch(
    "https://random-word-api.herokuapp.com/word?length=5"
  );
  let data = await response.json();
  return (word = data[0]);
}

getword();
