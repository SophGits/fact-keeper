"use strict"

function Batch(numQuestions, tag) {
  this.totalQuestions = numQuestions || 5;
  document.getElementById("question-total").innerHTML = this.totalQuestions;

  this.questions = [];
  this.score = 0;
  this.targetScore = 0;

  if ( !!tag ) {
    console.log( "Selecting questions by " + tag );
    this.selectQuestionsByTag();
  } else {
    this.selectRandomQuestions();
  }

  this.currentQuestionIndex = 0;
}

Batch.prototype.selectRandomQuestions = function() {
  var rand;
  for(var i = this.totalQuestions; i--;) {
    rand = Math.floor(Math.random() * facts.length);
    this.questions.push( rand );
  }
}

Batch.prototype.selectQuestionsByTag = function() {
  // until select by tag is implemented, do:
  this.questions.push(3);
  this.questions.push(4);
  this.questions.push(5);
}

Batch.prototype.nextQuestion = function() {
  // console.log("currentQuestionIndex: ", this.currentQuestionIndex);
  if( this.currentQuestionIndex === this.questions.length -1) {
    console.log("No more questions. At position " + this.currentQuestionIndex);
  } else {
    if( this.currentQuestionIndex === this.questions.length -2) {
      addClass(document.getElementById("next-batch-question"), "grey-out");
    }
    this.validate();
    this.currentQuestionIndex += 1;
    this.render();
  }
}

Batch.prototype.validate = function() {
  // console.log("check if answers correct");

  var selectedAnswers = document.getElementsByClassName('selected');
  for( var i = selectedAnswers.length; i-- ;) {
    var answer = selectedAnswers[i].getAttribute("data-info");
    if ( answer != "correct" ) {
      selectedAnswers[i].style.color = "red";
    } else {
      selectedAnswers[i].style.color = "lawngreen";
      this.score += 1;
      this.updateScore();
    }
  }

  return;
}

Batch.prototype.updateScore = function() {
  document.getElementById("current-score").innerHTML = this.score;
}

Batch.prototype.render = function() {
  var question = facts[this.questions[this.currentQuestionIndex]].question;
  var answersCorrect = facts[this.questions[this.currentQuestionIndex]].answers;
  var answersIncorrect = facts[this.questions[this.currentQuestionIndex]].incorrectAnswers;

  // update target score
  this.targetScore = this.targetScore += answersCorrect.length;
  document.getElementById("target").innerHTML = this.targetScore;

  var answersList = clearExistingAnswers();

  // update progress
  document.getElementById("current-question-number").innerHTML = this.currentQuestionIndex + 1;

  // render question
  var questionSection = document.getElementsByClassName("question-section")[0];
  questionSection = questionSection.querySelectorAll("header")[0];
  questionSection.innerHTML = question;

  // make answer nodes - correct & incorrect
  var mixedAnswersList = [];
  putAnswerNodesInList.call('', answersCorrect, 'correct');
  putAnswerNodesInList.call('', answersIncorrect, 'incorrect');


  function putAnswerNodesInList( answers, type ) {
    // console.log(arguments);
    answers.forEach( function( item )  {
      var node = document.createElement('li');
      if ( type === "correct" ) {
        node.setAttribute("data-info", "correct");
      }
      node.innerHTML = item;
      mixedAnswersList.push(node);
    });
  }

  // shuffle and append each answer node
  mixedAnswersList = shuffle(mixedAnswersList);

  mixedAnswersList.forEach(function ( answer, index ) {
    answer.setAttribute("data-index", index);
    answersList.appendChild(answer);
  });

}


