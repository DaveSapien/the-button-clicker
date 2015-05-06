//  Created by Dave Sapien on 01/05/2015.
//document.getElementsByClassName("thebutton-container pressed")[0].className = "thebutton-container";//used for testing the button press
var URL = document.URL;//the current page
var targetURL = "www.reddit.com/r/thebutton";
var targetvalue = 11;//the target time for 'the button'
var clicked = false;
var ClickedMessage = "Clicked!";
var timerUpdateInterval = 100;//set update interval, could be lower...
//----------------------our magic function that exicutes the auto click action----------------------
       function fakeClick(event, oBjectClicked) {
          if (oBjectClicked.click) {//if we can click natively, we do.
            oBjectClicked.click();
          } else if(document.createEvent) {//else set up a 'virtual' mouse click.
            if(event.target != oBjectClicked) {
              var evt = document.createEvent("MouseEvents");
              evt.initMouseEvent("click", true, true, window,
                  0, 0, 0, 0, 0, false, false, false, false, 0, null);
              var allowDefault = oBjectClicked.dispatchEvent(evt);
            }
          }
        }
//----------------------our magic function that exicutes the auto click action----------------------
//all logic is inside this if statment.
if(URL.indexOf(targetURL) > -1){//check if you are in the reddit.com/r/thebutton subdomain.
var pressed = document.getElementsByClassName("thebutton-container pressed");//findout if the pressed DOM exists
//if the user has already pressed 'the button'
if(pressed.length){
var thebutton = document.getElementById('thebutton');//get 'the button' DOM
//Change 'the button' to be green and say 'Clicked!';
//set style of 'the button' to pressed state
thebutton.style.color = "#fff";
thebutton.style.textIndent = "0px";
thebutton.style.fontSize = "12px";
thebutton.style.backgroundColor = "#0f0";
thebutton.style.borderColor = "#008B13";
thebutton.style.boxShadow = "0px 4px 0px 0px #008B0F,0px 0px 0px 0px ";
//set style of 'the button' to pressed state
thebutton.innerHTML = ClickedMessage;
}else{//if the user hasnt already pressed 'the button'
//this is where the fun is. 
//Here is where we insert our own timer and auto-click funtionality.
//Start of loop
var loop = setInterval(function () {//set a loop to update the timer every 100 millisecs, could be faster but wanted to minimise cycles.
var unlock = document.getElementsByClassName("thebutton-container locked active");//get 'the button' lock DOM
var thebutton = document.getElementById('thebutton');//get 'the button' DOM
//get the seconds to create the time var, an int of seconds
var seconds = $("#thebutton-s-1s").html();//get single seconds string
var tensseconds = $("#thebutton-s-10s").html();//get tens of seconds string
var time = parseInt(tensseconds+seconds);//comine strings into an int
//check time is a valid int
if(time <= 59){
//shouldnt need to update this on every loop, will place it somewhere better later.
//set style of 'the button' to waiting for Autopress state
thebutton.style.color = "#fff";
thebutton.style.textIndent = "0px";
thebutton.style.fontSize = "12px";
thebutton.style.backgroundColor = "#f00";
thebutton.style.borderColor = "#E58B13";
thebutton.style.boxShadow = "0px 4px 0px 0px #B6420F,0px 0px 0px 0px ";
//set style of 'the button' to waiting for Autopress state
var timLeft = (time-targetvalue);//calculate time left
if(timLeft < 0){//catch the timer here for after auto-clicked event (otherwise it will show minus values)
thebutton.innerHTML = ClickedMessage;
}else{
thebutton.innerHTML = "Autopress in " + timLeft + " seconds.";//show time (in seconds) untill auto-click
}
}
//click logic, clicked var ensures that the button wont be clicked twice. Not a big deal, jsut want it to be clean.
if(time < targetvalue && !clicked){
clicked = true;
fakeClick(event, thebutton);
alert("!!!!!The Button Has Been Clicked!!!!!");
clearInterval(loop);
}
//unlock the lock on 'the button' on first loop, not needed as far as I can tell but makes thing look better
if(unlock[0]){
	fakeClick(event, unlock[0]);
}
}, timerUpdateInterval);//end of loop
}//end of the if the user hasnt already pressed 'the button' statment
}//end of the if you are in the reddit.com/r/thebutton subdomain statment