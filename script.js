document.addEventListener('DOMContentLoaded', () => {
    const words = ['cody', 'fabian', 'christian', 'michel', 'nathan'];
    let chosenWord = words[Math.floor(Math.random() * words.length)];
    let attempts = 6;
    let guessedLetters = [];
    let correctGuesses = new Set(chosenWord.split(''));

    const wordContainer = document.getElementById('word-container');
    const lettersContainer = document.getElementById('letters-container');
    const attemptsElement = document.getElementById('attempts');
    const messageElement = document.getElementById('message');
    const restartButton = document.getElementById('restart-button');

    function updateWordDisplay() {
        wordContainer.innerHTML = chosenWord.split('').map(letter => guessedLetters.includes(letter) ? letter : '_').join(' ');
    }

    function updateAttemptsDisplay() {
        attemptsElement.textContent = attempts;
    }

    function checkGameStatus() {
        if (attempts === 0) {
            messageElement.textContent = 'Vous avez perdu !';
            lettersContainer.querySelectorAll('button').forEach(button => button.disabled = true);
        } else if (correctGuesses.size === 0) {
            messageElement.textContent = 'Vous avez gagné !';
            lettersContainer.querySelectorAll('button').forEach(button => button.disabled = true);
        }
    }

    function createLetterButtons() {
        for (let i = 0; i < 26; i++) {
            const letter = String.fromCharCode(97 + i);
            const button = document.createElement('button');
            button.textContent = letter;
            button.addEventListener('click', () => {
                button.disabled = true;
                guessedLetters.push(letter);
                if (chosenWord.includes(letter)) {
                    correctGuesses.delete(letter);
                    updateWordDisplay();
                } else {
                    attempts--;
                    updateAttemptsDisplay();
                }
                checkGameStatus();
            });
            lettersContainer.appendChild(button);
        }
    }

    function restartGame() {
        chosenWord = words[Math.floor(Math.random() * words.length)];
        attempts = 6;
        guessedLetters = [];
        correctGuesses = new Set(chosenWord.split(''));
        wordContainer.innerHTML = '';
        lettersContainer.innerHTML = '';
        messageElement.textContent = '';
        updateWordDisplay();
        updateAttemptsDisplay();
        createLetterButtons();
    }

    restartButton.addEventListener('click', restartGame);

    updateWordDisplay();
    updateAttemptsDisplay();
    createLetterButtons();
});
