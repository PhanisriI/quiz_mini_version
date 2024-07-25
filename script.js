const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
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
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
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

const questions = [
  {
    question: 'What is the capital city of France?',
    answers: [
      { text: 'Paris', correct: true },
      { text: 'Rome', correct: false }
    ]
  },
  {
    question: 'Select the synonym of astonish',
    answers: [
      { text: 'overwhelm', correct: true },
      { text: 'mundane', correct: false },
      { text: 'calm', correct: false },
      { text: 'empress', correct: false }
    ]
  },
  {
    question: 'What is the capital of Finland?',
    answers: [
      { text: 'Conakry', correct: false },
      { text: 'Helsinki ', correct: true },
      { text: 'Prague', correct: false },
      { text: 'None of the above', correct: false }
    ]
  },
  {
    question: 'What is the capital of china?',
    answers: [
      { text: 'Conakry', correct: false },
      { text: 'Helsinki ', correct: false },
      { text: 'Havana', correct: false },
      { text: 'Beijing', correct: true }
    ]
  },
  {
    question: 'What is the main ingredient in Guacamole?',
    answers: [
      { text: 'Chilli', correct: false },
      { text: 'Avacado', correct: true }
    ]
  }
]