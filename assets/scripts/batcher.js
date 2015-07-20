var Batcher = ( function(window, undefined) {
  function createNewBatch(numQuestions, tag) {
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

    return this;
  }

  function selectRandomQuestions() {
    var rand;
    for(var i = this.totalQuestions; i--;) {
      rand = Math.floor(Math.random() * facts.length);
      this.questions.push( rand );
    }
  }

  function selectQuestionsByTag() {
    // until select by tag is implemented, do:
    this.questions.push(3);
    this.questions.push(4);
    this.questions.push(5);
  }

  function nextQuestion() {
    // console.log("currentQuestionIndex: ", this.currentQuestionIndex);
    if( this.currentQuestionIndex === this.questions.length -1) {
      console.log("No more questions. At position " + this.currentQuestionIndex);
    } else {
      if( this.currentQuestionIndex === this.questions.length -2) {
        Helper.addClass(document.getElementById("next-batch-question"), "grey-out");
      }
      this.validate();
      this.currentQuestionIndex += 1;
      this.render(this);
    }
  }

  function validate() {
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

  function updateScore() {
    document.getElementById("current-score").innerHTML = this.score;
  }

  function render(batch) {
    var question = facts[batch.questions[batch.currentQuestionIndex]].question;
    var answersCorrect = facts[batch.questions[batch.currentQuestionIndex]].answers;
    var answersIncorrect = facts[batch.questions[batch.currentQuestionIndex]].incorrectAnswers;

    // update target score
    batch.targetScore = batch.targetScore += answersCorrect.length;
    document.getElementById("target").innerHTML = batch.targetScore;

    var answersList = ViewBuilder.clearExistingAnswers();

    // update progress
    document.getElementById("current-question-number").innerHTML = batch.currentQuestionIndex + 1;

    // render question
    var questionSection = document.getElementsByClassName("question-section")[0];
    questionSection = questionSection.querySelectorAll("header")[0];
    questionSection.innerHTML = question;

    answers = putAnswerNodesInList(answersCorrect, answersIncorrect);

    // shuffle and append each answer node
    mixedAnswersList = Shuffler.shuffle(answers);

    mixedAnswersList.forEach(function ( answer, index ) {
      answer.setAttribute("data-index", index);
      answersList.appendChild(answer);
    });
  }

  function putAnswerNodesInList(correctAnswers, incorrectAnswers) {
    var correctAnswersArray = correctAnswers.map( function( item )  {
      var node = createNode(item)
      setLiAsCorrect(node)
      return node;
    });

    var incorrectAnswersArray = incorrectAnswers.map( function( item )  {
      return createNode(item);
    });

    return correctAnswersArray.concat(incorrectAnswersArray);
  }

  function createNode(item) {
    var node = document.createElement('li');
    node.innerHTML = item;
    return node;
  }

  function setLiAsCorrect(node) {
    return node.setAttribute("data-info", "correct");
  }

  return {
    createNewBatch : createNewBatch,
    selectRandomQuestions: selectRandomQuestions,
    selectQuestionsByTag: selectQuestionsByTag,
    nextQuestion: nextQuestion,
    validate: validate,
    updateScore: updateScore,
    render: render
  };
})( );



