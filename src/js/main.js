
//tokens
var sectionToken = '.quiz-section';
//end tokens
var quiz = $("#quiz");
var sections = quiz.children(sectionToken);

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
var submitBtn = $('#submit');
var nextSectionBtn = $('#nextSection');
var nextQuestionBtn = $('#nextBtn');
var prevQuestionBtn = $('#prevBtn');
submitBtn.bind('click', submitQuiz);
submitBtn.hide();
nextQuestionBtn.bind('click', showNext);
prevQuestionBtn.bind('click', showPrev);
nextSectionBtn.bind('click', goToNextSection)
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
    console.log("next sec", section.next(sectionToken));
    section = section.next(sectionToken);
    //get all questions of this section
    questions = section.children();
    //hide all questions
    questions.hide();
    //show first question
    question = $(questions.get(0));
    updateButtonsStat();
    question.show();
    section.show();
    if(section.next(sectionToken).length == 0){
        nextSectionBtn.hide();
        submitBtn.show();
    }
}
//finish quiz
function submitQuiz(){

}
//util
function updateButtonsStat(){
    if(question.prev().length == 0){
        prevQuestionBtn.attr("disabled", "disabled");
    } else {
        prevQuestionBtn.removeAttr("disabled");
    }
    if(question.next().length == 0){
        nextQuestionBtn.attr("disabled", "disabled");
    } else {
        nextQuestionBtn.removeAttr("disabled");
    }
}