var ViewBuilder = ( function( window, undefined ) {
  console.log('here')
  function setAnswerSelectListener( answersList ) {
    console.log('answersList: ', answersList)
    if( answersList.addEventListener ) {
      answersList.addEventListener( 'click', toggleAnswerSelect, false );
    } else if ( answersList.attachEvent ) {
      answersList.attachEvent( 'onclick', toggleAnswerSelect );
    }
  }

  function toggleAnswerSelect(e) {
    console.log('click???', e);
    var answerEl = e.target;
    var selectedIndex = answerEl.className.indexOf("selected");

    if ( !selectedIndex || selectedIndex >= 0 ) {
      Helper.removeClass(answerEl, "selected");
    } else {
      Helper.addClass(answerEl, "selected");
    }
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

  return {
    setAnswerSelectListener: setAnswerSelectListener,
    toggleAnswerSelect: toggleAnswerSelect,
    clearExistingAnswers: clearExistingAnswers
  };

} )( window );
