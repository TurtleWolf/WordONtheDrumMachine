var globalVolume = 1;

window.SetVolume = function(val) {
  var player = document.getElementsByTagName("audio");
  console.log("Before: " + player.volume);
  player.volume = val / 100;
  globalVolume = player.volume;
  console.log("After: " + player.volume);
};
var clickCounter = 0;
var currentLevel = 1;
var simon_sSequence = [];
var player_sInput = [];
const audioTapper = document.querySelector("#audioT");
const audioError = document.querySelector("#audioE");
const levelDisplay = document.getElementById("level_Display");
const simonzSequence = document.getElementById("simon_sSequence");
const playerInput = document.getElementById("player_sInput");
const start_Tapper = document.querySelector(".tapper");
start_Tapper.addEventListener("click", Start); //end of EventListener

function Start() {
  audioTapper.volume = globalVolume;
  audioTapper.play();
  player_sInput = []; //clear player's input for this turn
  clickCounter = 0;
  levelDisplay.textContent = "Level: " + currentLevel;
  //generate a random number & push it to simon_sSequence
  simon_sSequence.push(Math.floor(Math.random() * 4));
  //for each in the array set time interval(300ms);
  //dipslay hover effect
  //play pad sound
  simonzSequence.textContent = "Simon says " + simon_sSequence;
  playerInput.textContent = "Player's reply " + player_sInput;
  start_Tapper.removeEventListener("click", Start); //end of EventListener
  start_Tapper.addEventListener("click", Reset); //start EventListener
} //end of resetStart

function Reset() {
  // start of reset
  currentLevel = 1;
  const levelDisplay = document.getElementById("level_Display");
  simon_sSequence = [];
  Start();
} //end of Reset

const pads = document.querySelectorAll(".padz");
// Convert the padz list to an array we can iterate using .forEach()
Array.from(pads).forEach((padi, indez) => {
  // Get the associated audio element nested in the padz-div
  const audio = padi.querySelector("audio");
  // Add a click listener to each pad which
  // will play the audio, push the index to
  // the user input array, and update the span
  padi.addEventListener("click", () => {
    player_sInput.push(indez);
    if (player_sInput[clickCounter] !== simon_sSequence[clickCounter]) {
      audioError.volume = globalVolume;
      audioError.play();
      clickCounter = 0;
      player_sInput = []; //clear player's input for this turn
      playerInput.textContent = "Player's reply " + player_sInput;
      $("body").animate({ backgroundColor: "red" }, 100);
      //$(".startTapper div").animate({ backgroundColor: "red" }, 100);
      $(".container").effect("shake", { times: 100 }, 1000, "linear");
      $("body").animate({ backgroundColor: "gray" }, 5000);
      //$(".startTapper div").animate({ backgroundColor: "gray" }, 5000);
      if (document.querySelector(".inStrict").checked) {
        Reset();
      } //end of 2nd if, console.log("wrong");
    } else {
      //end of 1st if
      audio.volume = globalVolume;
      audio.play();
      playerInput.textContent = "Player's reply " + player_sInput;
      clickCounter++;
      if (
        player_sInput.length == simon_sSequence.length &&
        currentLevel === 20
      ) {
        //playerInput.textContent = "Simon says you have won my memory quiz";
        console.log("Winner, 20 = right");
        //force training wheels to hide after first win
        Reset();
      } //end of 3rd if, AND current level ==20
      if (player_sInput.length == simon_sSequence.length) {
        currentLevel++;
        Start();
      } //end of 4th if, console.log(clickCounter);
    } //end of else
  }); //end of EventListener
}); //end of Array.from(pads).forEach((pad, index)
