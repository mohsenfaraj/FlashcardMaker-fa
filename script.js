var showanswer = document.getElementById("showanswer");
showanswer.onclick = function() {
  showanswerfunc();
};
document.getElementById("startbtn").onclick = function() {
  startquiz();
};
var startform = document.getElementById("start-form");
var questionform = document.getElementById("question-form");
var resultform = document.getElementById("result-form");
var questiontitle = document.getElementById("questiontitle");
var trueanswershtml = document.getElementById("true-answers");
var wronganswershtml = document.getElementById("wrong-answers");
var questiontext = "";
var questionanswer = "";
function startquiz() {
  var isreverse = document.getElementById("reversecheckbox").checked;
  var trueanswers = [];
  var wronganswers = [];
  var rawtext = document.getElementById("questions").value;
  //abort process if Entry is Empty
  if (rawtext == "") {
    alert("شما باید حداقل یک خط ورودی داشته باشید!");
    return 0;
  }
  var questions = rawtext.split("\n");
  console.log(questions);
  //create a shuffled question object
  var shuffeledq = shuffle(questions);
  //hide the start form and show the question form
  startform.style.display = "none";
  questionform.style.display = "block";
  //cq : current question
  var ncq = 0;
  generateq(ncq);
  // if user clicks true button
  var trueanswerbtn = document.getElementById("trueanswerbtn");
  trueanswerbtn.onclick = function() {
    if (isreverse == false) addtorightchoices(questiontext, questionanswer);
    else addtorightchoices(questionanswer, questiontext);
  };
  // if user clicks wrong button
  var falseanswerbtn = document.getElementById("falseanswerbtn");
  falseanswerbtn.onclick = function() {
    if (isreverse == false) addtowrongchoices(questiontext, questionanswer);
    else addtowrongchoices(questionanswer, questiontext);
  };

  //if user clicks home button
  document.getElementById("returntostart").onclick = function() {
    resultform.style.display = "none";
    questionform.style.display = "none";
    startform.style.display = "block";
    trueanswershtml.value = "";
    wronganswershtml.value = "";
  };

  // Generates Question and updates questiontitle and answer button
  function generateq(ncq) {
    // if ncq is more than shuffledq Cancel the operation and goto results
    if (ncq > shuffeledq.length - 1) {
      resultpage();
      return 0;
    }
    showanswer.value = "نمایش پاسخ";
    showanswer.disabled = false;
    var cq = shuffeledq[ncq].split(":");
    // this is for checking if user enable "reverse mode" or not
    if (isreverse == false) {
      questiontext = cq[0];
      questionanswer = cq[1];
    }
    if (isreverse == true) {
      questiontext = cq[1];
      questionanswer = cq[0];
    }
    questiontitle.innerHTML = questiontext;
  }

  // add right word to list to obtain later
  function addtorightchoices(questiontxt, questionansw) {
    trueanswers.push(questiontxt + ":" + questionansw);
    ncq++;
    generateq(ncq);
  }

  // add wrong word to a list to obtain later
  function addtowrongchoices(questiontxt, questionansw) {
    wronganswers.push(questiontxt + ":" + questionansw);
    ncq++;
    generateq(ncq);
  }

  //this is for showing result page and results.
  function resultpage() {
    questionform.style.display = "none";
    resultform.style.display = "block";
    for (let n = 0; n <= trueanswers.length - 1; n++) {
      trueanswershtml.value += trueanswers[n] + "\n";
    }
    for (let n = 0; n <= wronganswers.length - 1; n++) {
      wronganswershtml.value += wronganswers[n] + "\n";
    }
    var grade =
      (trueanswers.length / (trueanswers.length + wronganswers.length)) * 100;
    document.getElementById("gradep").innerText =
      " شما نمره " + grade + " را در این آزمون کسب کرده اید.";
  }
}

Object.size = function(obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};
function shuffle(sourceArray) {
  for (var i = 0; i < sourceArray.length - 1; i++) {
    var j = i + Math.floor(Math.random() * (sourceArray.length - i));

    var temp = sourceArray[j];
    sourceArray[j] = sourceArray[i];
    sourceArray[i] = temp;
  }
  return sourceArray;
}
function showanswerfunc() {
  showanswer.value = questionanswer;
  showanswer.disabled = true;
}
