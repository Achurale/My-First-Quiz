var startButton = document.getElementById('start-button')
var nextButton = document.getElementById('next-button')
var qContainerElement = document.getElementById('q-container')
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')
var timer = document.getElementById('time-left')
var header = document.getElementById('header')
var score = document.getElementById('score-num')

console.log(timer.innerText)
console.log(header.innerText)
console.log("oh hi there")
console.log(score.innerText)

var shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuest()
    // keepScore()
})

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random - .5)
    currentQuestionIndex = 0
    qContainerElement.classList.remove('hide')
    setNextQuest()
}

function setNextQuest() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

// function keepScore() {
//     if () {}
// }

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

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    var selectedButton = e.target
    var correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
    } else {
        startButton.innerText = "Restart"
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
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
}

]