(function(){
  "use strict"

  document.onreadystatechange = function () {
    if (document.readyState != "interactive") {
      return;
    }

    var batch;
    var newBatch = document.getElementById("new-batch");
    newBatch.onclick = function() {
      batch = Batcher.createNewBatch(3);
      Batcher.render(batch);
      Helper.removeClass(document.getElementById("next-batch-question"), "grey-out");
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
    ViewBuilder.setAnswerSelectListener( answersList );
  }
}());
