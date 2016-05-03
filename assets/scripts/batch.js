"use strict"

function Batch(numQuestions, tag) {
  this.questions = [];
  this.totalQuestions = numQuestions || 5;

  if ( !!tag ) {
    console.log( "Selecting questions by " + tag );
  }

  for(var i = this.totalQuestions; i--;) {
    this.questions.push( getRandomQuestion() );
  }

  this.currentQuestionIndex = 0;

  console.log( "this questions: ", this.questions );
}

Batch.prototype.nextQuestion = function() {
  if( this.currentQuestionIndex >= this.questions.length ) {
    console.log("No more questions. At position " + this.currentQuestionIndex);
  } else {
    console.log("currentQuestionIndex: ", this.currentQuestionIndex);
    return this.currentQuestionIndex += 1;
  }
}

