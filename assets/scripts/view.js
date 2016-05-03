document.onreadystatechange = function () {
  if (document.readyState != "interactive") {
    return;
  }

  // var newBatch = document.getElementById("new-batch");
  // newBatch.onclick = new Batch(4, 'yellow');

  var batch;
  var newBatch = document.getElementById("new-batch");
  newBatch.onclick = function() {
    batch = new Batch(3, 'yellow');
  }

  document.getElementById("next-batch-question").onclick = function() {
    if ( !batch ) {
      console.log("no batch yet");
    } else {
      batch.nextQuestion();
    }
  }
}


