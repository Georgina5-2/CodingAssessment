startQuizButton=document.querySelector('.btnSubmit');
quizRules=document.querySelector('.start-quiz');
quizButton=document.querySelector('.quiz-start-button');
submitInitials=document.getElementById("btnInitialsSubmit");
userDetails=document.querySelector('.input-initials');
usersAndHighScores=document.querySelector('.viewHighScores');
usersList=document.querySelector('.allScores');
goBack=document.getElementById("btnGoBack");
clearHighScores=document.getElementById("btnClearHighScores");
headerElement=document.getElementById("headings");

var score=0;

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
var inputInitials=document.querySelector('.input-initials');


function InitiateQuiz(event) {
    quizRules.setAttribute("style","content-visibility:hidden");
    multiChoice.setAttribute("style","content-visibility:visible");
    setTime();
    document.querySelector("#questionResult").innerHTML=""
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
    choiceElements.forEach(
        (choice) => choice.addEventListener("click", choiceAction)
      );
}

var secondsLeft = 60;
var timerInterval;

function setTime() {
    
    // Sets interval in variable
    timerInterval = setInterval(function()
    {   
        document.getElementById("time-left").innerHTML = secondsLeft ;
        secondsLeft-=1;
        if(secondsLeft===0)
            {
                    
                displayResultSection();
                clearInterval(timerInterval);
            }
    },1000); 
}


function choiceAction(event) {

    var userClickedChoice = this.dataset["choice"];
    var correctAnswer = document.getElementById("correctAnswer").value;

    if (userClickedChoice === correctAnswer) 
    {
        
    score=score+5;

       document.querySelector("#questionResult").innerHTML = "<p id='line'><hr></p> <p>Right</p>";
    } else {
        secondsLeft-=10;
        document.querySelector("#questionResult").innerHTML = "<p id='line'><hr></p> <p>Wrong</p>";
    }
    // setTimeout(function() {
    //     //Delay for 3 seconds
    //   }, 3000);
    console.log('Total Score:', score);
    var currentIndex = parseInt(questionElement.dataset["index"]);

    if (currentIndex < questions.length-1){
    setMultipleChoiceQuestion(currentIndex+1);
    }
    else{
        clearInterval(timerInterval);
        displayResultSection(score);
    }
  }

  function initialSubmission() {   
    var localStorageData
    var userInput=document.getElementById("typeInitials");

 
    if(userInput.value==="")
    {
        alert("Please enter your initials");
    }
    else
    {

        console.log('userInput :: ', userInput);

        var userObject=  {
            "Initials":userInput.value,
            "Score":score
        };
        console.log('userObject :: ', userObject);

        localStorageData = JSON.parse(localStorage.getItem("localStorageUserDetails"));
        console.log("initial value 1 localStorageData", localStorageData, typeof localStorageData);
        if (!localStorageData) {
            localStorageData=[];
        }
        console.log("initial value 2 localStorageData", localStorageData, typeof localStorageData);

        (localStorageData).push(userObject);
        
        localStorage.setItem("localStorageUserDetails", JSON.stringify(localStorageData));
        userDetails.setAttribute("style", "content-visibility:hidden");
        usersAndHighScores.setAttribute("style", "content-visibility:visible");
        headerElement.setAttribute("style","content-visibility:hidden");

       var userDetailsObject=JSON.parse(localStorage.getItem("localStorageUserDetails"));
        console.log('userDetailsObject :: ', userDetailsObject);
 
            var itemNumber= userDetailsObject.length;
            var li = document.createElement('li');
            var listItemText = (itemNumber) + '. ' + userDetailsObject[itemNumber-1].Initials + ' - ' + score;
            li.appendChild(document.createTextNode(listItemText));
            usersList.appendChild(li);
            userDetailsObject = [];
            console.log('userDetailsObject 2 :: ', userDetailsObject);
    }
    userInput.value="";

    }
    

function ClearHighScoresClick()  {
        
   localStorage.clear();
   usersList.innerHTML="";
   score=0;
}

 function GoBackClick(){
    score=0;
    secondsLeft=60;
    usersAndHighScores.setAttribute("style", "content-visibility:hidden");
    quizRules.setAttribute("style", "content-visibility:visible");
    headerElement.setAttribute("style", "content-visibility:visible");
    document.getElementById("time-left").innerHTML = "" ;
    

 }


  function displayResultSection() 
  {
     
     multiChoice.setAttribute("style","content-visibility:hidden");
     inputInitials.setAttribute("style","content-visibility:visible");
     document.getElementById("finalScore").innerHTML="<strong>Your final score is " + score + ".</strong>";
     submitInitials.addEventListener("click", initialSubmission);


   }

function init(){
    startQuizButton.addEventListener("click", InitiateQuiz);
}

init();

  
  
  