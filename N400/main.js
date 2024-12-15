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

// Variables for application state
let currentQuestionIndex = 0;
let shownQuestions = []; // for "without repetition" mode in learning
let interviewQuestions = []; // store the 10 randomly chosen questions for interview mode
let interviewCurrentIndex = 0;
let interviewScore = 0;
let isInterviewMode = false;
let isLearningMode = true;

// Initialization
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

// Functions

function handleAppModeChange() {
    // If interview mode selected, we switch behavior
    let selectedMode = getSelectedAppMode();
    if (selectedMode === 'interview') {
        isInterviewMode = true;
        isLearningMode = false;
        // In interview mode, question order controls can be hidden or ignored
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
    // In interview mode, hide the "show answer" and "next question" initially
    showAnswerBtn.style.display = 'none';
    nextQuestionBtn.style.display = 'none';
    // Also hide random/sequence controls as they aren't relevant in interview mode
    for (let r of modeRadios) {
        r.disabled = true;
    }
    for (let r of randomModeRadios) {
        r.disabled = true;
    }
    randomModeGroup.style.display = 'none';
}

function showLearningControls() {
    // In learning mode
    // show question order radios and show answer/next question buttons
    for (let r of modeRadios) {
        r.disabled = false;
    }
    for (let r of randomModeRadios) {
        r.disabled = false;
    }
    handleModeChange();
    showAnswerBtn.style.display = 'inline-block';
    nextQuestionBtn.style.display = 'inline-block';
    submitAnswerBtn.style.display = 'none';
    startOverBtn.style.display = 'none';
    scoreContainer.style.display = 'none';
    multipleChoiceContainer.style.display = 'none';
    answersContainer.style.display = 'none';
}

function initInterview() {
    // Pick 10 random distinct questions from the questions array
    interviewQuestions = getRandomQuestions(questions, 10);
    interviewCurrentIndex = 0;
    interviewScore = 0;
    scoreContainer.style.display = 'none';
    startOverBtn.style.display = 'none';
    submitAnswerBtn.style.display = 'inline-block';
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
    // Hide learning elements
    showAnswerBtn.style.display = 'none';
    nextQuestionBtn.style.display = 'none';
    answersContainer.style.display = 'none';
    
    let qObj = interviewQuestions[interviewCurrentIndex];

    questionText.textContent = `Question ${interviewCurrentIndex+1} of 10: ${qObj.question}`;
    multipleChoiceContainer.style.display = 'block';
    multipleChoiceContainer.innerHTML = '';

    // In interview mode: 
    // - Pick 1 correct answer from correctAnswers[0] (the first correct answer will be the "official" correct one)
    // - Pick 3 random wrong answers from qObj.wrongAnswers
    let correctAnswer = qObj.correctAnswers[0];
    let wrongs = getRandomWrongs(qObj.wrongAnswers, 3);
    let options = [correctAnswer, ...wrongs];
    shuffleArray(options);

    // Generate radio buttons for these 4 options
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

function getRandomWrongs(wrongAnswers, count) {
    // Returns a random subset of 'count' unique wrong answers
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
    // Check selected answer
    let selected = document.querySelector('input[name="interviewOption"]:checked');
    if (!selected) {
        alert('Please select an answer!');
        return;
    }

    let chosenAnswer = selected.value;
    let qObj = interviewQuestions[interviewCurrentIndex];
    // The official correct answer is qObj.correctAnswers[0]
    let officialCorrect = qObj.correctAnswers[0];

    if (chosenAnswer === officialCorrect) {
        interviewScore++;
    }

    interviewCurrentIndex++;

    // Check if we reached 6 correct answers (passing threshold)
    if (interviewScore >= 6) {
        endInterview(true);
        return;
    }

    // Check if we reached 10 questions
    if (interviewCurrentIndex === 10) {
        // End interview - check score
        let passed = interviewScore >= 6;
        endInterview(passed);
        return;
    }

    // Otherwise, show next question
    displayInterviewQuestion();
}

function endInterview(passed) {
    multipleChoiceContainer.style.display = 'none';
    submitAnswerBtn.style.display = 'none';
    startOverBtn.style.display = 'inline-block';

    scoreContainer.style.display = 'block';
    if (passed) {
        scoreContainer.textContent = `Congratulations! You passed with a score of ${interviewScore}/10.`;
    } else {
        scoreContainer.textContent = `You scored ${interviewScore}/10. Unfortunately, that's not enough to pass (need at least 6).`;
    }

    questionText.textContent = 'Interview Finished';
}

function startOver() {
    let selectedMode = getSelectedAppMode();
    if (selectedMode === 'interview') {
        initInterview();
    } else {
        // Return to learning mode original state
        isInterviewMode = false;
        isLearningMode = true;
        showLearningControls();
        resetQuestionCycle();
    }
}

function handleModeChange() {
    const selectedMode = getSelectedMode();
    if (selectedMode === 'random') {
        randomModeGroup.style.display = 'inline-block';
    } else {
        randomModeGroup.style.display = 'none';
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
    showAnswerBtn.style.display = 'inline-block';
    showAnswerBtn.textContent = 'Show Answer';
    nextQuestionBtn.style.display = 'inline-block';
    answersContainer.style.display = 'none';
    multipleChoiceContainer.style.display = 'none';
    submitAnswerBtn.style.display = 'none';
    startOverBtn.style.display = 'none';
    scoreContainer.style.display = 'none';
}

function displayQuestion(index) {
    let q = questions[index];
    questionText.textContent = q.question;
    // Prepare answers container but keep hidden until "Show Answer" is pressed
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

function toggleAnswerVisibility() {
    if (answersContainer.style.display === 'none') {
        answersContainer.style.display = 'block';
        showAnswerBtn.textContent = 'Hide Answer';
    } else {
        answersContainer.style.display = 'none';
        showAnswerBtn.textContent = 'Show Answer';
    }
}

function hideAnswer() {
    answersContainer.style.display = 'none';
    showAnswerBtn.textContent = 'Show Answer';
}

function nextQuestion() {
    const mode = getSelectedMode();
    if (mode === 'sequence') {
        currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
    } else {
        // Random
        currentQuestionIndex = getNextQuestionIndex();
    }
    displayQuestion(currentQuestionIndex);
    hideAnswer();
}

function getNextQuestionIndex() {
    const randomMode = getSelectedRandomMode();
    if (randomMode === 'with') {
        // Just return any random question index
        return Math.floor(Math.random() * questions.length);
    } else {
        // Without repetition
        if (shownQuestions.length === questions.length) {
            shownQuestions = [];
        }
        let availableIndices = questions.map((q, i) => i).filter(i => !shownQuestions.includes(i));
        let chosen = availableIndices[Math.floor(Math.random() * availableIndices.length)];
        shownQuestions.push(chosen);
        return chosen;
    }
}
