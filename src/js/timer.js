function Timer(timeToCountInMinutes){
    // Set the the time we're counting down to in seconds
    this.countDownDate = timeToCountInMinutes*60;
    var x; 
    // Update the count down every 1 second
    this.startCounting = function(cb){
        x = setInterval(() => {

            // Time calculations for days, hours, minutes and seconds
            var minutes = Math.floor((this.countDownDate % (60 * 60)) / 60);
            var seconds = Math.floor(this.countDownDate % (60));

            // Display the result in the element with id="timer"
            $('#timer').text(minutes + "m " + seconds + "s ");

            this.countDownDate--;
            // If the count down is finished, write some text 
            if (this.countDownDate < 0) {
                clearInterval(x);
                cb();
            }
        }, 1000);
    }
    this.stopCounting = function(){
        clearInterval(x);
        $('#timer').text('No Timer For This Section');
    }
}