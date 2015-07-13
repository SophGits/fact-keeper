document.onreadystatechange = function () {
  if (document.readyState != "interactive") {
    return;
  }

  var randomButton = document.getElementById("random-question");
  randomButton.onclick = displayRandomQuestion;

  // set listener for answers
  var answersList = document.getElementsByClassName("answers-list")[0];
  if( answersList.addEventListener ) {
    answersList.addEventListener( 'click', toggleAnswerSelect, false );
  } else if ( answersList.attachEvent ) {
    answersList.attachEvent( 'onclick', toggleAnswerSelect );
  }

}

function toggleAnswerSelect(e) {
  // var index = e.target.dataset.index;
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

function displayRandomQuestion() {
  var index = Math.floor(Math.random() * facts.length);
  // get question and answers from facts data
  var question = facts[index].question;
  var answersCorrect = facts[index].answers;
  var answersIncorrect = facts[index].incorrectAnswers;

  var answersList = clearExistingAnswers()

  // question
  var questionSection = document.getElementsByClassName("question-section")[0];
  questionSection = questionSection.querySelectorAll("header")[0];
  questionSection.innerHTML = question;

  // put all answers in ul
  mixedAnswersList = [];

  function putAnswerNodesInList( answers, type ) {
    console.log(arguments);
    answers.forEach( function( item )  {
      var node = document.createElement('li');
      if ( type === "correct" ) {
        node.setAttribute("data-info", "correct");
      }
      node.innerHTML = item;
      mixedAnswersList.push(node);
    });
  }
  var context;
  putAnswerNodesInList.call(context, answersCorrect, 'correct');
  putAnswerNodesInList.call(context, answersIncorrect, 'incorrect');

  mixedAnswersList = shuffle(mixedAnswersList);

  mixedAnswersList.forEach(function ( answer, index ) {
    answer.setAttribute("data-index", index);
    answersList.appendChild(answer);
  });
}


function clearExistingAnswers() {
  var answersList = document.getElementsByClassName("answers-list")[0];
  while (answersList.firstChild) {
    answersList.removeChild(answersList.firstChild);
  }
  return answersList;
}

// Knoth Shuffle, from http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

