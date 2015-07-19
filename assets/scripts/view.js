"use strict"

document.onreadystatechange = function () {
  if (document.readyState != "interactive") {
    return;
  }

  var batch;
  var newBatch = document.getElementById("new-batch");
  newBatch.onclick = function() {
    batch = new Batch(3);
    batch.render();
    removeClass(document.getElementById("next-batch-question"), "grey-out");
  }

  document.getElementById("next-batch-question").onclick = function() {
    if ( !batch ) {
      console.log("no batch yet");
    } else {
      batch.nextQuestion();
    }
  }

  // set listener for answers
  var answersList = document.getElementsByClassName("answers-list")[0];
  setAnswerSelectListener( answersList );

}

function setAnswerSelectListener( answersList ) {
  if( answersList.addEventListener ) {
    answersList.addEventListener( 'click', toggleAnswerSelect, false );
  } else if ( answersList.attachEvent ) {
    answersList.attachEvent( 'onclick', toggleAnswerSelect );
  }
}

function toggleAnswerSelect(e) {
  var answerEl = e.target;
  var selectedIndex = answerEl.className.indexOf("selected");

  if( !!answerEl.className && selectedIndex < 0 ){
    answerEl.className = answerEl.className + " selected";
  } else if ( selectedIndex >= 0 ) {
    answerEl.className = answerEl.className.split(' ').filter(function( className ) {
      className != "selected";
    }).join(' ');
  } else {
    answerEl.className = "selected";
  }
} // toggleAnswerSelect


function clearExistingAnswers() {
  var questionSection = document.getElementsByClassName("question-section")[0];
  questionSection = questionSection.querySelectorAll("header")[0];
  questionSection.innerHTML = "Start again";


  var answersList = document.getElementsByClassName("answers-list")[0];
  while (answersList.firstChild) {
    answersList.removeChild(answersList.firstChild);
  }
  return answersList;
}
