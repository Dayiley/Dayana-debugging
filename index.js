const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

let targetNumber;
let attempts = 0;
//3. changed "const" to "let" declaration since this variable will be modified
let maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
setup();


function getRandomNumber(min, max) {
  
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);
  
  if (isNaN(guess) || guess < 1 || guess > 99) {
    alert("Please enter a number between 1 and 99.");
    return;
  }
  
  attempts = attempts + 1;
  console.log(`attempts ${attempts}`)

  hideAllMessages();

  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;

    correctMessage.style.display = '';
    correctMessage.style.color = 'green'

    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  if (guess !== targetNumber) {
    if (guess < targetNumber) {
      tooLowMessage.style.display = '';
    } else {
      //5.logic bug "toolowMessage" fixed
      tooHighMessage.style.display = '';
    }

    const remainingAttempts = maxNumberOfAttempts - attempts;
    console.log(`remining attempts ${remainingAttempts}`)

    numberOfGuessesMessage.style.display = '';
    
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;
    if(remainingAttempts === 1){
      numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> 1 guess remaining`;
    }
  }

  //1. typo fixed " ==== " => " === "
  if (attempts === maxNumberOfAttempts) {
    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  if (attempts === maxNumberOfAttempts && guess !== targetNumber) {
    tooLowMessage.style.display = 'none';
    tooHighMessage.style.display = 'none';
    maxGuessesMessage.style.display = '';
    maxGuessesMessage.innerHTML = `Game Over! The number was ${targetNumber}.`;
    maxGuessesMessage.style.color= 'red';
  }

  guessInput.value = '';

  resetButton.style.display = '';
}

function hideAllMessages() {
  //4. changed " <= " to " < ", cause (elementIndex =  messages.lenght) => (undefiend)
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    messages[elementIndex].style.display = 'none';
  }
}
//2. typo fixed "funcion" => "function"
function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  //6.fixed value of maxNumberOfAttempts to "5"
  maxNumberOfAttempts = 5;
  //7. update attempts variable
  attempts = 0;

  // Enable the input and submit button
  
  //8.typo Fixed "disabeld" => "disabled"
  submitButton.disabled = false;
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = 'none';
}

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);


