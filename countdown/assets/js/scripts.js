
jQuery(document).ready(function() {

    /*
        Background slideshow
    */


    /*
        Countdown initializer
    */
    var now = new Date();
    var finaldate = new Date("NOV 10 2021 14:00 UTC ")
    var countTo = finaldate.getTime() - now.getTime() + now.getTimezoneOffset()*60*1000  + now.valueOf();
    $('.timer').countdown(countTo, function(event) {
        var $this = $(this);
        switch(event.type) {
            case "seconds":
            case "minutes":
            case "hours":
            case "days":
            case "weeks":
            case "daysLeft":
                $this.find('span.'+event.type).html(event.value);
                break;
            case "finished":
                $this.hide();
                break;
        }
    });



});

