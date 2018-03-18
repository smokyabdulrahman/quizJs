

var quiz = $("#quiz");
var sections = quiz.children('.quiz-section');

var numOfSections = sections.length;


//hide all sections
sections.hide();

//set current section
var section = $(sections.get(0));
section.show();

//get all questions of this section
var questions = section.children();
//hide all questions
questions.hide();

//show first question
var question = $(questions.get(0));
question.show();

//assgin event listeners to buttons
$('#nextBtn').bind('click', showNext);
$('#prevBtn').bind('click', showPrev);
$('#nextSection').bind('click', goToNextSection)
updateButtonsStat();

//show next question
function showNext() {
    question.hide();
    question = question.next();
    question.show();
    updateButtonsStat();
}
//show prev question
function showPrev() {
    question.hide();
    question = question.prev();
    question.show();
    updateButtonsStat();
}
//show next section
function goToNextSection(){
    section.hide();
    section = section.next();
    //get all questions of this section
    questions = section.children();
    //hide all questions
    questions.hide();
    //show first question
    question = $(questions.get(0));
    updateButtonsStat();
    question.show();
    section.show();
}

//util
function updateButtonsStat(){
    if(question.prev().length == 0){
        $('#prevBtn').attr("disabled", "disabled");
    } else {
        $('#prevBtn').removeAttr("disabled");
    }
    if(question.next().length == 0){
        $('#nextBtn').attr("disabled", "disabled");
    } else {
        $('#nextBtn').removeAttr("disabled");
    }
}