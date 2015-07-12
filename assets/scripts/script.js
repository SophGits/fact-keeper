$(document).ready( function() {
  console.log("Script file here.");

  if(!!facts) {
    console.log(facts);
    $.each(facts, function(index, fact) {
      console.log("\n" + index + ": " + fact.question + "\n");
    })
  }

});