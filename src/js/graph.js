var sec1NumOfQ = 'section1NumberOfQuestions';
var sec2NumOfQ = 'section2NumberOfQuestions';
var sec3NumOfQ = 'section3NumberOfQuestions';
var sec1SolvedQ = 'section1NumberOfSolvedQuestions';
var sec2SolvedQ = 'section2NumberOfSolvedQuestions';
var sec3SolvedQ = 'section3NumberOfSolvedQuestions';
var sec2Partial = 'section2PartiallySolvedQuestions';
var totalScore = 'totalScore';
var totalMax = 'totalMax';
function intiStats(){
    //total question and percentage
    let totalQSpan = $('#total');
    let percentageSpan = $('#percentage');
    totalQSpan.html(parseInt(localStorage.getItem(sec1NumOfQ)) + parseInt(localStorage.getItem(sec2NumOfQ)) + parseInt(localStorage.getItem(sec3NumOfQ)));
    percentageSpan.html(parseInt(localStorage.getItem(totalScore)) / parseInt(localStorage.getItem(totalMax)) * 100 + "%");
    let myOptions= {
        responsive: false
    }
    //correct percentage graph
    var ctx = document.getElementById("correctOnly").getContext('2d');
    var numCorrectForEachSec = [parseInt(localStorage.getItem(sec1SolvedQ)), 
        parseInt(localStorage.getItem(sec2SolvedQ)), 
        parseInt(localStorage.getItem(sec3SolvedQ))];
    var numCorrectForEachSecColors = [];
    for(var i in numCorrectForEachSec){
        numCorrectForEachSecColors.push(dynamicColors());
    }
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ["Section 1", "Section 2", "Section 3"],
            datasets: [{
                data: numCorrectForEachSec,
                backgroundColor: numCorrectForEachSecColors
            }]
        },
        options: myOptions
    });

    //section 2 graph
    var ctx2 = document.getElementById("sec2").getContext('2d');
    var numOfSolved = parseInt(localStorage.getItem(sec2SolvedQ));
    var numOfPartiallySolved = parseInt(localStorage.getItem(sec2Partial));
    var numOfSec2Questions = parseInt(localStorage.getItem(sec2NumOfQ));
    var numOfUnsolved = numOfSec2Questions - numOfPartiallySolved - numOfSolved;
    var sec2Data = [numOfSolved, numOfPartiallySolved, numOfUnsolved]
    var sec2Colors = [];
    for(var i in sec2Data){
        sec2Colors.push(dynamicColors());
    }
    var myChart = new Chart(ctx2, {
        type: 'pie',
        data: {
            labels: ["Solved", "Partially Solved", "Unsolved"],
            datasets: [{
                data: sec2Data,
                backgroundColor: sec2Colors
            }]
        },
        options: myOptions
    });
}

function dynamicColors() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
};
