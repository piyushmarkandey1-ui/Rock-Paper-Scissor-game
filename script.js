let userScore = 0;
let compScore = 0;

const choices         = document.querySelectorAll('.choice');
const msg             = document.querySelector('#msg');
const msgContainer    = document.querySelector('#msg-container');
const userScoreEl     = document.querySelector('#user-score');
const compScoreEl     = document.querySelector('#comp-score');
const battle          = document.querySelector('#battle');
const userBattleChoice = document.querySelector('#user-battle-choice');
const compBattleChoice = document.querySelector('#comp-battle-choice');
const resetBtn        = document.querySelector('#reset-btn');

// ── Helpers ──────────────────────────────────────────

const genCompChoice = () => {
    const options = ['rock', 'paper', 'scissors'];
    return options[Math.floor(Math.random() * 3)];
};

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const choiceImg = (name) => {
    const img = document.createElement('img');
    img.src = `${name}.png`;
    img.alt = capitalize(name);
    return img;
};

const bumpScore = (el) => {
    el.classList.remove('bump');
    void el.offsetWidth; // reflow to restart animation
    el.classList.add('bump');
    el.addEventListener('transitionend', () => el.classList.remove('bump'), { once: true });
};

// ── Battle display ────────────────────────────────────

const showBattle = (userChoice, compChoice, result) => {
    // Populate images
    userBattleChoice.innerHTML = '';
    compBattleChoice.innerHTML = '';
    userBattleChoice.appendChild(choiceImg(userChoice));
    compBattleChoice.appendChild(choiceImg(compChoice));

    // Reset animation classes
    userBattleChoice.classList.remove('win-anim', 'lose-anim');
    compBattleChoice.classList.remove('win-anim', 'lose-anim');

    if (result === 'win') {
        userBattleChoice.classList.add('win-anim');
        compBattleChoice.classList.add('lose-anim');
    } else if (result === 'lose') {
        userBattleChoice.classList.add('lose-anim');
        compBattleChoice.classList.add('win-anim');
    }

    battle.classList.remove('hide');
};

// ── Result message ────────────────────────────────────

const showMsg = (text, type) => {
    msg.textContent = text;
    msg.className = type; // 'win' | 'lose' | 'draw'
    msgContainer.classList.remove('hide');
    resetBtn.classList.remove('hide');
};

// ── Core game logic ───────────────────────────────────

const getResult = (user, comp) => {
    if (user === comp) return 'draw';
    if (
        (user === 'rock'     && comp === 'scissors') ||
        (user === 'paper'    && comp === 'rock')     ||
        (user === 'scissors' && comp === 'paper')
    ) return 'win';
    return 'lose';
};

const playRound = (userChoice) => {
    const compChoice = genCompChoice();
    const result     = getResult(userChoice, compChoice);

    // Highlight selected button briefly
    choices.forEach(c => c.classList.remove('selected'));
    document.getElementById(userChoice).classList.add('selected');

    showBattle(userChoice, compChoice, result);

    if (result === 'draw') {
        showMsg(`It's a draw! Both chose ${capitalize(userChoice)}.`, 'draw');
    } else if (result === 'win') {
        userScore++;
        userScoreEl.textContent = userScore;
        bumpScore(userScoreEl);
        showMsg(`You win! ${capitalize(userChoice)} beats ${capitalize(compChoice)}.`, 'win');
    } else {
        compScore++;
        compScoreEl.textContent = compScore;
        bumpScore(compScoreEl);
        showMsg(`You lose! ${capitalize(compChoice)} beats ${capitalize(userChoice)}.`, 'lose');
    }
};

// ── Reset ─────────────────────────────────────────────

const resetGame = () => {
    userScore = 0;
    compScore = 0;
    userScoreEl.textContent = '0';
    compScoreEl.textContent = '0';
    battle.classList.add('hide');
    msgContainer.classList.add('hide');
    resetBtn.classList.add('hide');
    choices.forEach(c => c.classList.remove('selected'));
};

// ── Event listeners ───────────────────────────────────

choices.forEach((c) => {
    c.addEventListener('click', () => playRound(c.getAttribute('id')));
});

resetBtn.addEventListener('click', resetGame);
