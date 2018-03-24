//get name + email
// let params = (new URL(document.location)).searchParams;
// let name = params.get("name");
// let email = params.get("email");
//set localStorage vars
var sec1NumOfQ = 'section1NumberOfQuestions';
var sec2NumOfQ = 'section2NumberOfQuestions';
var sec3NumOfQ = 'section3NumberOfQuestions';
var sec1SolvedQ = 'section1NumberOfSolvedQuestions';
var sec2SolvedQ = 'section2NumberOfSolvedQuestions';
var sec3SolvedQ = 'section3NumberOfSolvedQuestions';
var sec2Partial = 'section2PartiallySolvedQuestions';
var totalScore = 'totalScore';
var totalMax = 'totalMax';

localStorage.setItem(sec1NumOfQ, 0);
localStorage.setItem(sec2NumOfQ, 0);
localStorage.setItem(sec3NumOfQ, 0);
localStorage.setItem(sec1SolvedQ, 0);
localStorage.setItem(sec2SolvedQ, 0);
localStorage.setItem(sec3SolvedQ, 0);
localStorage.setItem(sec2Partial, 0);


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
var timer = new Timer(0);
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
    timer.stopCounting();
    section.hide();
    console.log("next sec", section.next(sectionToken));
    section = section.next(sectionToken);
    checkIfHasTimer(section);
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

function checkIfHasTimer(section){
    let time = section.data('minutes');
    if(time){
        timer = new Timer(time);
        timer.startCounting(doneCounting);
    }
}
//finish quiz
function submitQuiz(){
    //stop timer
    timer.stopCounting();
    //hide section
    section.hide();
    //hide btns
    submitBtn.hide();
    nextQuestionBtn.hide();
    nextSectionBtn.hide();
    prevQuestionBtn.hide();
    $('#timer').hide();
    //calc stats
    var score = 0;
    var totalMax = 0;
    sections.each(function(){
        //for each MCQ section
        if($(this).hasClass('mcq')){
            // for each question in this section
            $(this).children().each(function(){
                //for each option in this question
                if($(this).hasClass(singleAnswer)){
                    score += validateSingleAnswer($(this));
                    totalMax++;
                    incrementQNumOfSec(1);
                }
                else if($(this).hasClass(multAnswer)){
                    let {maxScore, result} = validateMultAnswer($(this));
                    score += result;
                    totalMax += maxScore;
                    incrementQNumOfSec(2);
                    isSolvedPartially(maxScore, result);
                }
            })
        }
        //for each DragnDrop section
        else if($(this).hasClass('dragndrop')){
            //for each option in this question
            $(this).children().each(function(){
                score += parseInt($(this).data('points'));
                let len = $(this).children('.drop').length;
                totalMax += len;
                incrementQNumOfSec(3);
                if(len == $(this).data('points')){
                    incrementSolvedOfSec(3);
                }
            })            
        }
        
    });
    setTotalMax(totalMax);
    setScore(score);
    intiStats();
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
            incrementSolvedOfSec(1);
        }
    })
    return score;
}

function validateMultAnswer(question){
    var result = 0;
    let maxScore = 0;
    question.children().each(function(){
        if($(this).attr('value') == 1){maxScore++}
        if($(this).attr('value') == 1 && $(this).is(':checked')){
            result++;
        }
        else if($(this).attr('value') == 0 && $(this).is(':checked')){
            result--;
        }
    })
    if(maxScore === result){incrementSolvedOfSec(2)}
    return {maxScore, result};
}

function isSolvedPartially(maxPoints, points){
    if(points > 0 && maxPoints > points){
        //add 1 to the partially solved questions var form part 2
        localStorage.setItem(sec2Partial, parseInt(localStorage.getItem(sec2Partial))+1);
    }
}

function doneCounting(){
    if(section.next(sectionToken).length != 0){
        goToNextSection();
    }
    else{
        submitQuiz();
    }
}

function incrementSolvedOfSec(secNum){
    if(secNum === 1){
        localStorage.setItem(sec1SolvedQ, parseInt(localStorage.getItem(sec1SolvedQ))+1);
    }
    else if (secNum === 2){
        localStorage.setItem(sec2SolvedQ, parseInt(localStorage.getItem(sec2SolvedQ))+1);
    }
    else if (secNum === 3){
        localStorage.setItem(sec3SolvedQ, parseInt(localStorage.getItem(sec3SolvedQ))+1);
    }
}

function incrementQNumOfSec(secNum){
    if(secNum === 1){
        localStorage.setItem(sec1NumOfQ, parseInt(localStorage.getItem(sec1NumOfQ))+1);
    }
    else if (secNum === 2){
        localStorage.setItem(sec2NumOfQ, parseInt(localStorage.getItem(sec2NumOfQ))+1);
    }
    else if (secNum === 3){
        localStorage.setItem(sec3NumOfQ, parseInt(localStorage.getItem(sec3NumOfQ))+1);
    }
}

function setTotalMax(max){
    localStorage.setItem(totalMax, max);
}

function setScore(score){
    localStorage.setItem(totalScore, score);
}