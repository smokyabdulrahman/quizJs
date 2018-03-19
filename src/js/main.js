
//tokens
var sectionToken = '.quiz-section';
//only one choice is valid
var singleAnswer = 'single';
//multiple choice
var multAnswer = 'mult';
//end tokens
var quiz = $("#quiz");
var sections = quiz.children(sectionToken);

var numOfSections = sections.length;

//hide all sections
sections.hide();

//set current section
var section = $(sections.get(0));
section.show();

//start timer for first section
checkIfHasTimer(section);

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
    checkIfHasTimer(section);
    question.show();
    section.show();
}

function checkIfHasTimer(section){
    let time = section.data('minutes');
    if(time){
        timer = new Timer(time);
        timer.startCounting(doneCounting);
    }
}
//finish quiz
function submitQuiz(){
    var score = 0;
    //for each section
    sections.each(function(){
        // for each question in this section
        $(this).children().each(function(){
            //for each option in this question
            if($(this).hasClass(singleAnswer)){
                score += validateSingleAnswer($(this));
            }
            else if($(this).hasClass(multAnswer)){
                score += validateMultAnswer($(this));
            }
        })
    });
    console.log("score", score);
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
    if(section.next(sectionToken).length == 0){
        nextSectionBtn.hide();
        submitBtn.show();
    }
}

function validateSingleAnswer(question){
    var score = 0;
    question.children().each(function(){
        if($(this).attr('value') == 1 && $(this).is(':checked')){
            score++;
        }
    })
    return score;
}

function validateMultAnswer(question){
    var score = 0;
    question.children().each(function(){
        if($(this).attr('value') == 1 && $(this).is(':checked')){
            score++;
        }
        else if($(this).attr('value') == 0 && $(this).is(':checked')){
            score--;
        }
    })
    return score;
}

function doneCounting(){
    if(section.next(sectionToken).length != 0){
        goToNextSection();
    }
    else{
        submitQuiz();
    }
}