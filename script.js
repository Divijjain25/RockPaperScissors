const choices = ['rock', 'paper', 'scissors'];
const rock = document.getElementById('rock');
const paper = document.getElementById('paper');
const scissors = document.getElementById('scissors');
const computerScoreElement = document.getElementById('computer-score');
const userScoreElement = document.getElementById('your-score');
const resultMessage = document.getElementById('result-message');
const rulesBtn = document.getElementById('rules-btn');
const modal = document.getElementById('rules-modal');
const closeBtn = document.querySelector('.close-btn');

let computerScore = parseInt(localStorage.getItem('computerScore')) || 0;
let userScore = parseInt(localStorage.getItem('userScore')) || 0;

computerScoreElement.textContent = computerScore;
userScoreElement.textContent = userScore;

// Random computer choice
const getComputerChoice = () => choices[Math.floor(Math.random() * choices.length)];

// Game logic
const playGame = (userChoice) => {
    const computerChoice = getComputerChoice();

    const victoryScreen = document.getElementById('victory-screen');
const playAgainBtn = document.getElementById('play-again-btn');

// Show the victory screen when the user wins
const showVictoryScreen = () => {
  victoryScreen.classList.remove('hidden');
};

// Restart the game when "Play Again" is clicked
const resetGame = () => {
  computerScore = 0;
  userScore = 0;
  computerScoreElement.textContent = computerScore;
  userScoreElement.textContent = userScore;
  resultMessage.textContent = '';
  victoryScreen.classList.add('hidden');
  localStorage.clear();
};

// Modified game logic to show victory screen when the user wins
const playGame = (userChoice) => {
  const computerChoice = getComputerChoice();

  if (userChoice === computerChoice) {
    resultMessage.textContent = `It's a tie! You both chose ${userChoice}.`;
  } else if (
    (userChoice === 'rock' && computerChoice === 'scissors') ||
    (userChoice === 'paper' && computerChoice === 'rock') ||
    (userChoice === 'scissors' && computerChoice === 'paper')
  ) {
    userScore++;
    resultMessage.textContent = `You win! ${userChoice} beats ${computerChoice}.`;

    // Check if the user has won the game
    if (userScore === 5) {
      showVictoryScreen();
    }
  } else {
    computerScore++;
    resultMessage.textContent = `You lose! ${computerChoice} beats ${userChoice}.`;
  }

  computerScoreElement.textContent = computerScore;
  userScoreElement.textContent = userScore;

  localStorage.setItem('computerScore', computerScore);
  localStorage.setItem('userScore', userScore);
};

playAgainBtn.addEventListener('click', resetGame);



    // Determine the winner
    if (userChoice === computerChoice) {
        resultMessage.textContent = `It's a tie! You both chose ${userChoice}.`;
    } else if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        userScore++;
        resultMessage.textContent = `You win! ${userChoice} beats ${computerChoice}.`;
        showCelebration();
    } else {
        computerScore++;
        resultMessage.textContent = `You lose! ${computerChoice} beats ${userChoice}.`;
    }

    // Update scores
    computerScoreElement.textContent = computerScore;
    userScoreElement.textContent = userScore;

    // Save scores to local storage
    localStorage.setItem('computerScore', computerScore);
    localStorage.setItem('userScore', userScore);

    // Show selected choices
    displayChoices(userChoice, computerChoice);
};

// Show only selected choices after a round
const displayChoices = (userChoice, computerChoice) => {
    const choicesContainer = document.getElementById('choices-container');
    choicesContainer.innerHTML = `
        <div class="choice selected">
            <img src="${userChoice}.png" alt="${userChoice}">
        </div>
        <div class="choice selected">
            <img src="${computerChoice}.png" alt="${computerChoice}">
        </div>
    `;
};

// Celebration animation
const showCelebration = () => {
    const body = document.body;
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    body.appendChild(confetti);

    setTimeout(() => {
        body.removeChild(confetti);
    }, 2000);
};

// Event Listeners
rock.addEventListener('click', () => playGame('rock'));
paper.addEventListener('click', () => playGame('paper'));
scissors.addEventListener('click', () => playGame('scissors'));

rulesBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});
