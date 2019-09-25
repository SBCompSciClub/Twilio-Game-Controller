const express = require('express');
const bodyParser = require('body-parser');
const robot = require("robotjs");

let app = express();
app.use(bodyParser.urlencoded({extended: false}));
let active = true; //the round (or voting) is open or not
// CONTROLS: To add more controls just change these arrays properly
let counter = [0,0,0,0]  //up down left right  keep track of the respective votes
let counterMap = ['UP','DOWN'] //the text message hotword to trigger those actions
let keyPressMap = ['up','down']  //the value that is passed into the keyboard interfacer library check https://robotjs.io/docs/syntax#keyboard
//END CONTROLSc
let highest = -1 //highest value in counter
let highestIndex = -1 //the index in which (highest) is stored
var timeCount = 5;



app.post("/message", function (req, res) {
  if(active){

  console.log(req.body);
   const msg = req.body.Body.toUpperCase()
   const succMsg = () => { res.send(`<Response><Message>Your Command "${msg}" was successfully interpreted </Message></Response>`)}
  if(counterMap.includes(msg)){
    succMsg()
    //console.log(counterMap.includes(msg))
    //console.log(msg)
     let index = counterMap.indexOf(msg)
     //console.log(index)
     //console.log(keyPressMap[index])
     robot.keyTap(keyPressMap[index])
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