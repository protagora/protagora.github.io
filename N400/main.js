// DOM elements
const questionText = document.getElementById('questionText');
const answersContainer = document.getElementById('answersContainer');
const multipleChoiceContainer = document.getElementById('multipleChoiceContainer');
const showAnswerBtn = document.getElementById('showAnswerBtn');
const nextQuestionBtn = document.getElementById('nextQuestionBtn');
const submitAnswerBtn = document.getElementById('submitAnswerBtn');
const startOverBtn = document.getElementById('startOverBtn');
const modeRadios = document.getElementsByName('mode');
const randomModeGroup = document.getElementById('randomModeGroup');
const randomModeRadios = document.getElementsByName('randomMode');
const appModeRadios = document.getElementsByName('appMode');
const scoreContainer = document.getElementById('scoreContainer');
const settingsButton = document.getElementById('settingsButton');
const settingsOverlay = document.getElementById('settingsOverlay');
const closeSettingsBtn = document.getElementById('closeSettingsBtn');
const closeXBtn = document.getElementById('closeXBtn');

// Theme switcher buttons
const autoThemeBtn = document.getElementById('autoThemeBtn');
const lightThemeBtn = document.getElementById('lightThemeBtn');
const darkThemeBtn = document.getElementById('darkThemeBtn');

// Variables for application state
let currentQuestionIndex = 0;
let shownQuestions = []; 
let interviewQuestions = []; 
let interviewCurrentIndex = 0;
let interviewScore = 0;
let isInterviewMode = false;
let isLearningMode = true;

document.addEventListener('DOMContentLoaded', () => {
    handleAppModeChange();
    handleModeChange();
    displayQuestion(currentQuestionIndex);

    // Event listeners
    showAnswerBtn.addEventListener('click', toggleAnswerVisibility);
    nextQuestionBtn.addEventListener('click', nextQuestion);
    submitAnswerBtn.addEventListener('click', submitInterviewAnswer);
    startOverBtn.addEventListener('click', startOver);

    for (let radio of modeRadios) {
        radio.addEventListener('change', handleModeChange);
    }
    for (let radio of randomModeRadios) {
        radio.addEventListener('change', handleRandomModeChange);
    }
    for (let radio of appModeRadios) {
        radio.addEventListener('change', handleAppModeChange);
    }

    // Settings overlay toggle
    settingsButton.addEventListener('click', () => {
        showSettings(true);
    });
    closeSettingsBtn.addEventListener('click', () => {
        showSettings(false);
    });
    closeXBtn.addEventListener('click', () => {
        showSettings(false);
    });

    // Close settings on ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && settingsOverlay.style.display === 'flex') {
            showSettings(false);
        }
    });

    // Theme switching
    autoThemeBtn.addEventListener('click', () => switchTheme('auto'));
    lightThemeBtn.addEventListener('click', () => switchTheme('light'));
    darkThemeBtn.addEventListener('click', () => switchTheme('dark'));

    // Initialize theme
    switchTheme('auto');
});

function showSettings(show) {
    settingsOverlay.style.display = show ? 'flex' : 'none';
}

/* Mode Handling */
function handleAppModeChange() {
    let selectedMode = getSelectedAppMode();
    if (selectedMode === 'interview') {
        isInterviewMode = true;
        isLearningMode = false;
        hideLearningControls();
        initInterview();
    } else {
        isInterviewMode = false;
        isLearningMode = true;
        showLearningControls();
        resetQuestionCycle();
    }
}

function getSelectedAppMode() {
    for (let r of appModeRadios) {
        if (r.checked) return r.value;
    }
    return 'learning';
}

function hideLearningControls() {
    if (showAnswerBtn) showAnswerBtn.style.display = 'none';
    if (nextQuestionBtn) nextQuestionBtn.style.display = 'none';
    for (let r of modeRadios) {
        r.disabled = true;
    }
    for (let r of randomModeRadios) {
        r.disabled = true;
    }
    if (randomModeGroup) {
        randomModeGroup.classList.add('disabled');
    }
    disableRandomOptions(true);
}

function showLearningControls() {
    for (let r of modeRadios) {
        r.disabled = false;
    }
    for (let r of randomModeRadios) {
        r.disabled = false;
    }
    handleModeChange();
    if (showAnswerBtn) showAnswerBtn.style.display = 'inline-block';
    if (nextQuestionBtn) nextQuestionBtn.style.display = 'inline-block';
    if (submitAnswerBtn) submitAnswerBtn.style.display = 'none';
    if (startOverBtn) startOverBtn.style.display = 'none';
    if (scoreContainer) scoreContainer.style.display = 'none';
    if (multipleChoiceContainer) multipleChoiceContainer.style.display = 'none';
    if (answersContainer) answersContainer.style.display = 'none';
}

/* Interview Mode */
function initInterview() {
    interviewQuestions = getRandomQuestions(questions, 10);
    interviewCurrentIndex = 0;
    interviewScore = 0;
    if (scoreContainer) scoreContainer.style.display = 'none';
    if (startOverBtn) startOverBtn.style.display = 'none';
    if (submitAnswerBtn) submitAnswerBtn.style.display = 'inline-block';
    displayInterviewQuestion();
}

function getRandomQuestions(fullList, count) {
    let result = [];
    let indices = [];
    while (indices.length < count) {
        let randIndex = Math.floor(Math.random() * fullList.length);
        if (!indices.includes(randIndex)) {
            indices.push(randIndex);
        }
    }
    for (let i of indices) {
        result.push(fullList[i]);
    }
    return result;
}

function displayInterviewQuestion() {
    if (showAnswerBtn) showAnswerBtn.style.display = 'none';
    if (nextQuestionBtn) nextQuestionBtn.style.display = 'none';
    if (answersContainer) answersContainer.style.display = 'none';

    let qObj = interviewQuestions[interviewCurrentIndex];
    questionText.textContent = `Question ${interviewCurrentIndex+1} of 10: ${qObj.question}`;
    if (multipleChoiceContainer) {
        multipleChoiceContainer.style.display = 'block';
        multipleChoiceContainer.innerHTML = '';

        let correctAnswer = qObj.correctAnswers[0];
        let wrongs = getRandomWrongs(qObj.wrongAnswers, 3);
        let options = [correctAnswer, ...wrongs];
        shuffleArray(options);

        let ul = document.createElement('ul');
        options.forEach(opt => {
            let li = document.createElement('li');
            let label = document.createElement('label');
            let radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'interviewOption';
            radio.value = opt;
            label.appendChild(radio);
            label.appendChild(document.createTextNode(opt));
            li.appendChild(label);
            ul.appendChild(li);
        });
        multipleChoiceContainer.appendChild(ul);
    }
}

function getRandomWrongs(wrongAnswers, count) {
    let shuffled = [...wrongAnswers];
    shuffleArray(shuffled);
    return shuffled.slice(0, count);
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
       const j = Math.floor(Math.random() * (i + 1));
       [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function submitInterviewAnswer() {
    let selected = document.querySelector('input[name="interviewOption"]:checked');
    if (!selected) {
        alert('Please select an answer!');
        return;
    }

    let chosenAnswer = selected.value;
    let qObj = interviewQuestions[interviewCurrentIndex];
    let officialCorrect = qObj.correctAnswers[0];

    if (chosenAnswer === officialCorrect) {
        interviewScore++;
    }

    interviewCurrentIndex++;

    if (interviewScore >= 6) {
        endInterview(true);
        return;
    }

    if (interviewCurrentIndex === 10) {
        let passed = interviewScore >= 6;
        endInterview(passed);
        return;
    }

    displayInterviewQuestion();
}

function endInterview(passed) {
    if (multipleChoiceContainer) multipleChoiceContainer.style.display = 'none';
    if (submitAnswerBtn) submitAnswerBtn.style.display = 'none';
    if (startOverBtn) startOverBtn.style.display = 'inline-block';
    if (scoreContainer) {
        scoreContainer.style.display = 'block';
        if (passed) {
            scoreContainer.textContent = `Congratulations! You passed with a score of ${interviewScore}/10.`;
        } else {
            scoreContainer.textContent = `You scored ${interviewScore}/10. Unfortunately, that's not enough to pass (need at least 6).`;
        }
    }
    questionText.textContent = 'Interview Finished';
}

function startOver() {
    let selectedMode = getSelectedAppMode();
    if (selectedMode === 'interview') {
        initInterview();
    } else {
        isInterviewMode = false;
        isLearningMode = true;
        showLearningControls();
        resetQuestionCycle();
    }
}

/* Mode and Randomization Handling */
function handleModeChange() {
    const selectedMode = getSelectedMode();
    if (selectedMode === 'random') {
        if (randomModeGroup) {
            randomModeGroup.classList.remove('disabled');
            disableRandomOptions(false);
        }
    } else {
        // Sequence selected, disable random mode group
        if (randomModeGroup) {
            randomModeGroup.classList.add('disabled');
            disableRandomOptions(true);
        }
    }
    if (isLearningMode) {
        resetQuestionCycle();
    }
}

function handleRandomModeChange() {
    if (isLearningMode) {
        resetQuestionCycle();
    }
}

function disableRandomOptions(disabled) {
    for (let r of randomModeRadios) {
        r.disabled = disabled;
    }
}

function getSelectedMode() {
    for (let r of modeRadios) {
        if (r.checked) return r.value;
    }
    return 'sequence';
}

function getSelectedRandomMode() {
    for (let r of randomModeRadios) {
        if (r.checked) return r.value;
    }
    return 'with';
}

function resetQuestionCycle() {
    currentQuestionIndex = 0;
    shownQuestions = [];
    displayQuestion(currentQuestionIndex);
    hideAnswer();

    if (multipleChoiceContainer) multipleChoiceContainer.style.display = 'none';
    if (showAnswerBtn) {
        showAnswerBtn.style.display = 'inline-block';
        showAnswerBtn.textContent = 'Show Answer';
    }
    if (nextQuestionBtn) nextQuestionBtn.style.display = 'inline-block';
    if (answersContainer) answersContainer.style.display = 'none';
    if (submitAnswerBtn) submitAnswerBtn.style.display = 'none';
    if (startOverBtn) startOverBtn.style.display = 'none';
    if (scoreContainer) scoreContainer.style.display = 'none';
}

function displayQuestion(index) {
    let q = questions[index];
    questionText.textContent = q.question;
    if (answersContainer) {
        answersContainer.innerHTML = '';
        let ul = document.createElement('ul');
        q.correctAnswers.forEach(a => {
            let li = document.createElement('li');
            li.textContent = a;
            ul.appendChild(li);
        });
        answersContainer.appendChild(ul);
        answersContainer.style.display = 'none';
    }
}

function toggleAnswerVisibility() {
    if (answersContainer && answersContainer.style.display === 'none') {
        answersContainer.style.display = 'block';
        showAnswerBtn.textContent = 'Hide Answer';
    } else if (answersContainer) {
        answersContainer.style.display = 'none';
        showAnswerBtn.textContent = 'Show Answer';
    }
}

function hideAnswer() {
    if (answersContainer) answersContainer.style.display = 'none';
    if (showAnswerBtn) showAnswerBtn.textContent = 'Show Answer';
}

function nextQuestion() {
    const mode = getSelectedMode();
    if (mode === 'sequence') {
        currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
    } else {
        currentQuestionIndex = getNextQuestionIndex();
    }
    displayQuestion(currentQuestionIndex);
    hideAnswer();
}

function getNextQuestionIndex() {
    const randomMode = getSelectedRandomMode();
    if (randomMode === 'with') {
        return Math.floor(Math.random() * questions.length);
    } else {
        if (shownQuestions.length === questions.length) {
            shownQuestions = [];
        }
        let availableIndices = questions.map((q, i) => i).filter(i => !shownQuestions.includes(i));
        let chosen = availableIndices[Math.floor(Math.random() * availableIndices.length)];
        shownQuestions.push(chosen);
        return chosen;
    }
}

/* Theme Switching */
function switchTheme(mode) {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    let theme;
    if (mode === 'auto') {
        theme = prefersDarkScheme.matches ? 'dark' : 'light';
    } else {
        theme = mode;
    }

    applyTheme(theme);
    updateButtonStyles(mode);
}

function applyTheme(theme) {
    document.body.className = theme === 'dark' ? 'dark-mode' : '';
}

function updateButtonStyles(activeMode) {
    [autoThemeBtn, lightThemeBtn, darkThemeBtn].forEach(btn => {
        if (btn.id === `${activeMode}ThemeBtn`) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}
