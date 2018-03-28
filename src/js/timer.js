function Timer(timeToCountInMinutes){
    // Set the the time we're counting down to in seconds
    this.countDown = timeToCountInMinutes*60;
    var x; 
    // Update the count down every 1 second
    this.startCounting = function(cb){
        let countFrom = this.countDown;
        x = setInterval(() => {

            // Time calculations for days, hours, minutes and seconds
            var minutes = Math.floor((countFrom % (60 * 60)) / 60);
            var seconds = Math.floor(countFrom % (60));

            // Display the result in the element with id="timer"
            $('#timer-data').text(minutes + "m " + seconds + "s ");

            countFrom--;
            //change color
            $('#timer-data').css('color', getColorForPercentage(countFrom/this.countDown));
            // If the count down is finished, write some text 
            if (countFrom < 0) {
                clearInterval(x);
                cb();
            }
        }, 1000);
    }
    
    this.stopCounting = function(){
        clearInterval(x);
        $('#timer-data').text('No Timer For This Section');
    }

    let percentColors = [
        { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
        { pct: 0.5, color: { r: 0xff, g: 0x80, b: 0 } },
        { pct: 1.0, color: { r: 0x00, g: 0x80, b: 0 } } ];
    
    let getColorForPercentage = function(pct) {
        for (var i = 1; i < percentColors.length - 1; i++) {
            if (pct < percentColors[i].pct) {
                break;
            }
        }
        var lower = percentColors[i - 1];
        var upper = percentColors[i];
        var range = upper.pct - lower.pct;
        var rangePct = (pct - lower.pct) / range;
        var pctLower = 1 - rangePct;
        var pctUpper = rangePct;
        var color = {
            r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
            g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
            b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
        };
        return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
        // or output as hex if preferred
    }  
}