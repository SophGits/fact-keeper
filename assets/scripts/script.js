document.onreadystatechange = function () {
  if (document.readyState != "interactive") {
    return
  }

  var randomButton = document.getElementById("random-question");
  randomButton.onclick = displayRandomQuestion;

  // set listener for answers
  var answersList = document.getElementById("answers-list");
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
    answerEl.className = answerEl.className.split(' ').filter(function(className) {
      className != "selected";
    }).join(" ");
  } else {
    answerEl.className = "selected";
  }
}

function displayRandomQuestion() {
  var randomIndex = Math.floor(Math.random() * facts.length);

  var randomFact = facts[randomIndex]
  var question = randomFact.question;
  var answersCorrect = randomFact.answers;
  var answersIncorrect = randomFact.incorrectAnswers;

  // question
  var questionSection = document.getElementById("question-section");
  questionSection = questionSection.querySelectorAll("header")[0];
  questionSection.innerHTML = question;

  // put all answers in ul
  var mixedAnswersList = answersCorrect.map(function( item ) {
  var answerOptions = clearAnswerOptions();


function clearAnswerOptions() {
  answers = document.getElementById("answers-list");
  answers.innerHTML = "";
  return answers;
}
    var node = document.createElement('li');
    node.setAttribute("data-info", "correct");
    node.innerHTML = item;
    return node;
  }).concat(
    answersIncorrect.map(function( item ) {
      var node = document.createElement('li');
      node.innerHTML = item;
      return node;
    })
  );

  mixedAnswersList = shuffle(mixedAnswersList);
  mixedAnswersList = shuffle(mixedAnswersList);

  mixedAnswersList.forEach(function ( answer, index ) {
    answer.setAttribute("data-index", index);
    answersList.appendChild(answer);
  });
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

