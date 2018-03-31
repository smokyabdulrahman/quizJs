$(document).ready(function(){
    $('#form').hide();
    var quiz = 0;
    //add listner to all quiz buttons
    $('.quiz-btn').on('click', function(){
        quiznum = $(this).data('quiznum');
        $('#main').hide();
        $('form').attr('action', 'quiz' + quiznum + '.html');
        $('#form').show();
    });
});