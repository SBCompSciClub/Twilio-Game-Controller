const express = require('express');
const bodyParser = require('body-parser');
const robot = require("robotjs");

let app = express();
app.use(bodyParser.urlencoded({extended: false}));

var timeCount = 5;
var rcounter = setInterval(timer, 1000); //round starts every 5 (count) seconds
console.log(timeCount)
let active = false; //the round (or voting) is open or not
// CONTROLS: To add more controls just change these arrays properly
let counter = [0,0,0,0]  //up down left right  keep track of the respective votes
let counterMap = ['UP','DOWN','LEFT','RIGHT'] //the text message hotword to trigger those actions
let keyPressMap = ['up','down','left','right']  //the value that is passed into the keyboard interfacer library check https://robotjs.io/docs/syntax#keyboard
//END CONTROLS
let highest = -1 //highest value in counter
let highestIndex = -1 //the index in which (highest) is stored

function timer(){
  active = true
  timeCount -= 1
  console.log("the count" + timeCount)
  if (timeCount <= 0)
  {
     clearInterval(rcounter)
     active = false
     for (let i = 0; i < counter.length; i++) { //loop to find the most voted (largest int) int array

      const ele = array[i];
      if(ele > highest){
         highest = ele
         highestIndex = i
      }
      else if(ele == highest){ //handle ties
        if (Math.random() >= 0.5)
            highestIndex = i
      }
    }
    console.log(`Most of y'all chose to move : ${counterMap[highestIndex]}`)
    robot.keyTap(keyPressMap[highestIndex])
    active = true
    var timeCount = 5
    var rcounter=setInterval(timer, 1000)
     return;
  }
}



app.post("/message", function (req, res) {
  if(active){

  console.log(req.body);
   const msg = req.body.Body.toUpperCase()
   const succMsg = () => { res.send(`<Response><Message>Your Command "${msg}" was successfully interpreted </Message></Response>`)}
  if(counterMap.includes(msg)){
     let index = counterMap.indexOf()
     counter[index]++
  }else{
    res.send(`<Response><Message>Your Command "${req.body.Body}" is not valid </Message></Response>`)
  }

}else{
  res.send(`<Response><Message>Sorry, the round didn't start yet.</Message></Response>`)
}
});

app.get("/", function (req, res) {
  res.send("Server Working!");
});


let listener = app.listen(56451, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});