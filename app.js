// Global Variables
let playing = false;
let score;
let trialsLeft;
let icons = ['art_palette', 'book', 'brush_wide', 'brush', 'bulletin_board', 'camera', 'clip', 'cloud', 'coffe', 'device', 'dropper', 'eraser', 'folder', 'fountain_pen', 'graphic_design', 'headphones', 'image', 'laptop', 'lightbulb_idea', 'monitor', 'pencil_tip', 'product', 'ruler', 'sunglasses', 'tablet', 'thumbs_down', 'thumbs_up', 'watermark', 'zoom'];
let step;
let action; 

// Functions
$(function(){
    $("#toggleGame").click(function() {
        if(playing) {
            location.reload();
        } else {
            playing = true; /*Change status to playing*/
            score = 0; /* Reset score to 0  */
            $('#liveScore').html(score); /* Change live score to zero */
            $("#scoreElement").removeClass("invisible"); /*Show score element */
            $('#livesRemaining').removeClass("invisible"); /* Show Lives remaining element */
            trialsLeft = 3;
            addHearts();
            $('#toggleGame').text("RESET");
            $('#toggleGame').css("background-color", "red");
            sendIcon();
        }
    });
});

$('#icon1').mouseover(function(){
    score++;
    $('#liveScore').html(score);
    $("#finalScore").html(score);
    document.getElementById("sliceSound").play();
    // Stop fruit
    clearInterval(action);
    $("#icon1").hide("explode", 500);
    setTimeout(sendIcon, 550);
});

// Send Icon
const sendIcon = function() {
    chooseIcon();
    $("#icon1").show();
    $("#icon1").css({'left': Math.random()*450, 'top': -50});
    step = 1+ Math.round(Math.random()*5);
    action = setInterval(function() {
        $("#icon1").css('top', $("#icon1").position().top + step);
        if($("#icon1").position().top > $("#gameWindow").height()) {
            if(trialsLeft > 1) {
                $("#icon1").show();
                chooseIcon();
                $("#icon1").css({'left': Math.random()*450, 'top': -50});
                step = 1+ Math.round(Math.random()*5);
                trialsLeft--;
                addHearts();

            } else {
                $("#finalScore").html  = score;
                $("#gameOverWindow").css('visibility', 'visible');
                $('#livesRemaining').addClass("invisible");
                clearInterval(action);
            };  
        } else {};
    }, 10);
    
};

const chooseIcon = function() {
    $("#icon1").attr('src', './ColoredLineIcons/png/512/' + icons[Math.floor(Math.random()*icons.length)] + '.png');
}

const addHearts = function() {
    let string = "<i class='fas fa-heart'>";
    document.getElementById('hearts').innerHTML = string.repeat(trialsLeft);
}