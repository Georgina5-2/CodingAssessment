startQuizButton=document.querySelector('.btnSubmit');
quizRules=document.querySelector('.start-quiz');
quizButton=document.querySelector('.quiz-start-button');


let score=0;
var highscore=0;
var highscoreList=[];

var questions=
[
    {
    QuestionId:1,
    Question : 'Commonly used data types DO NOT include:',
    Options: ['strings', 'booleans', 'alerts', 'numbers'],
    Answer: 'alerts',
    },
    {
    QuestionId:2,
    Question: 'The condition within if-else is enclosed within ___',
    Options: ['quotes', 'curly brackets', 'parantheses', 'square brackets'],
    Answer: 'curly brackets'
    },
    {
    QuestionId:3,
    Question: 'Arrays in Javascript can be used to store _____',
    Options: ['numbers and strings','arrays', 'booleans', 'all of the above'],
    Answer:'all of the above'
    },
    {
    QuestionId:4,
    Question: 'String values must be enclosed within _____ when being assigned to variables',
    Options: ['commas', 'curly brackets', 'quotes', 'parantheses'],
    Answer: 'quotes'
    },

    {
    QuestionId:5,
    Question:'A very useful tool during development and debugging for printing content to the debugger is',
    Options: ['Javascript', 'Terminal/Bash', 'for loops', 'console.log'],
    Answer: 'console.log'
    }
];



var multiChoice=document.querySelector('.flex-multi-choice');
var questionElement=document.querySelector('.flex-multi-choice .question');
var choiceElements=document.querySelectorAll('.flex-multi-choice .choice');

function InitiateQuiz(event) {
    quizRules.setAttribute("style","content-visibility:hidden");
    multiChoice.setAttribute("style","content-visibility:visible");
    setMultipleChoiceQuestion(0);
}


function setMultipleChoiceQuestion(index) {


    questionElement.innerHTML=questions[index].Question;
    questionElement.setAttribute("data-index", index)
    for(i=0;i<4;i++)
    {
        var displayChoice= questions[index].Options[i];
        choiceElements[i].innerHTML= '<span>' + (i+1) + '. ' + displayChoice + '</span>';
        choiceElements[i].setAttribute("data-choice", displayChoice)
    }
    document.getElementById("correctAnswer").value = questions[index].Answer;

}

  function choiceAction(event) {


    var userClickedChoice = this.dataset["choice"];
    var correctAnswer = document.getElementById("correctAnswer").value;

    if (userClickedChoice === correctAnswer) 
    {
        
    score=score+5;

       document.querySelector("#questionResult").innerHTML = "<p id='line'><hr></p> <p>Right</p>";
    } else {
        
        document.querySelector("#questionResult").innerHTML = "<p id='line'><hr></p> <p>Wrong</p>";
    }
    // setTimeout(function() {
    //     //Dealy for 3 seconds
    //   }, 3000);
    console.log('Total Score:', score);
    var currentIndex = parseInt(questionElement.dataset["index"]);
    console.log('currentIndex', currentIndex)
    console.log('questions length', questions.length)

    if (currentIndex < questions.length-1){
    setMultipleChoiceQuestion(currentIndex+1);
    }
  }

  function displayResultSection(score) {

    console.log('Total Score:'+ score);
    highscoreList.push(score);
    console.log('Highscores:', highscoreList);

  }


  startQuizButton.addEventListener("click", InitiateQuiz);
  choiceElements.forEach(
    (choice) => choice.addEventListener("click", choiceAction)
  );
  displayResultSection(score);
  