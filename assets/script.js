var startButton = document.getElementById('start-button')
var nextButton = document.getElementById('next-button')
var qContainerElement = document.getElementById('q-container')
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')
var scoreEl = document.getElementById('score-num')
var score = 0

var timer = document.getElementById("time-left")
var timerCount = 30;
var time;

var submitButton = document.getElementById('submit-button')
var userName = document.getElementById("user-name")



var shuffledQuestions, currentQuestionIndex
// Start button
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuest()
})

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random - .5)
    currentQuestionIndex = 0
    timerCount = 30
    score = 0
    qContainerElement.classList.remove('hide')
    timer.textContent = timerCount
    scoreEl.textContent = score
    setNextQuest()
    startTimer()
}
// Sets up the next question and answers
function setNextQuest() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}
// Timer start
function startTimer () {
    clearInterval(time)
    time = setInterval(function() {
        timerCount--;
        timer.textContent = timerCount;

        if(timerCount <= 0) {
            clearInterval(time)
        }

    }, 1000)
    }
// Sets up the next set of questions/answers by creating new buttons
function showQuestion(question) {
    questionElement.innerText = question.question
    question.answer.forEach(answer => {
        var button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("button")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}
// Clears the color change on the body element and removes old buttons
function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}
// Makes the desired changes when the user clicks on an answer
function selectAnswer(e) {
    var selectedButton = e.target
    var correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    if (correct) {
        score ++
    } else {
        timerCount -= 5
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
        button.classList.add('disable')
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
    } else {
        startButton.innerText = "Restart"
        startButton.classList.remove('hide')
    }
    scoreEl.textContent = score
}
// Highlights the correct and incorrect answers and the background changes according to if the user answered correctly or not
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}
// Clears the color change on the buttons
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

// Saves user score into local storage and logs it into the console
submitButton.addEventListener('click', submitScore)

function submitScore(event) {
    event.preventDefault()
    var scoreArray = [userName.value, score + " points"]
    localStorage.setItem("Scores", JSON.stringify(scoreArray))
    console.log(localStorage.getItem("Scores"))
    alert("Check out scores in the console!")
}

var questions = [
{
    question: "Is this a test?",
    answer: [
        {text: "Uhhh, duh", correct: true},
        {text: "Psh nah this the real deal dawg", correct: false},
        {text: "Maybe, maybe not. What's actually real tho?", correct: false},
        {text: "Sike you're in a simulation!", correct: false}
    ]
},
{
    question: "Who wrote this one?",
    answer: [
        {text: "Chat GPT", correct: false},
        {text: "Chuyi", correct: true},
        {text: "Trey", correct: false},
        {text: "One of the TA's I don't know", correct: false}
    ]
},
{
    question: "Mama, ooooooh",
    answer: [
        {text: "No no no no no no no!", correct: false},
        {text: "Mamma mia mamma mia mamma mia let me go", correct: false},
        {text: "Anyway the wind blows", correct: false},
        {text: "Didn't mean to make you cry", correct: true}
    ]
},
{
    question: "The sky is?",
    answer: [
        {text: "Green", correct: false},
        {text: "Red", correct: false},
        {text: "Blue", correct: true},
        {text: "Gray", correct: false}
    ]
},
{
    question: "Who run the world?",
    answer: [
        {text: "Girls", correct: true},
        {text: "Boys", correct: false},
        {text: "Men", correct: false},
        {text: "Women", correct: false}
    ]
}
]