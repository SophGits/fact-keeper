document.onreadystatechange = function () {
  if (document.readyState != "interactive") {
    return;
  }

  // initialise fresh series of questions
  window.series = {
    "status": "new"
  };

  series.totalQuestions = 5;

  var randomButton = document.getElementById("random-question");
  randomButton.onclick = displayRandomQuestion;

  series.nextButton = document.getElementById("next-question");
  series.nextButton.onclick = displayNextQuestion;

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


function updateProgressCounter( score ) {
  document.getElementById("current-score").innerHTML = score;
}

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


function displayNextQuestion() {
  if( window.series.status === "new" ) {

    series["status"] = "in progress";
    series.nextButton.value = "Next question (2 of " + series.totalQuestions + ")" ;
    document.getElementById("total").innerHTML = series.totalQuestions;
    series.nextButton.className = series.nextButton.className + " active";

    // display question 1 of 3 | progress
    updateProgressCounter(1);
    displayRandomQuestion(); // starting question
    series.count = 1;
  } else {
    displayRandomQuestion();
    series.count += 1;
    updateProgressCounter(series.count);
    series.nextButton.value = "Next question (" + parseInt(series.count + 1) + " of " + series.totalQuestions + ")";
    // debugger
    if (  series.count === series.totalQuestions ) {
      series.nextButton.value = "Submit question " + series.count + " of " + series.totalQuestions;
    } else if (  series.count === series.totalQuestions +1 ) {
      updateProgressCounter(0);
      clearExistingAnswers();
      series.nextButton.className = series.nextButton.className.split(' ').filter( function( className ) {
        className != "active";
      }).join(' ');
      series.nextButton.value = "New Set of 5 Questions";
      series.count = 0;
      series.status = "new";
    }
  }
}