function getRandomQuestion( tag ) {
  if ( !!tag ) {
    console.log('Select random Q based on tag');
  }
  var index = Math.floor(Math.random() * facts.length);
  return facts[index].question;
}

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
  putAnswerNodesInList.call('', answersCorrect, 'correct');
  putAnswerNodesInList.call('', answersIncorrect, 'incorrect');

  mixedAnswersList = shuffle(mixedAnswersList);

  mixedAnswersList.forEach(function ( answer, index ) {
    answer.setAttribute("data-index", index);
    answersList.appendChild(answer);
  });
}


