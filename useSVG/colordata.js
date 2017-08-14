$(document).ready(function() {

  window.pattern = [];
var timeBetweenTick = 1000;    //1000 = 1 second between each timeline tick
var updateRate = 500;            //how many MS between each color
  // var tinycolor = require("tinycolor2");
  var slider = $("#slider")
  var currentColor;
  $(slider).on('input', function() {
    let color = `hsl( ${this.value}deg, 100%, 50%)`
    let colorConvert = `hsl( ${this.value}, 100%, 50%)`
    window.path.attr({"fill": color});
    var hslToRGB = tinycolor(colorConvert);
    currentColor = hslToRGB.toRgb();
    window.path.data({"color": currentColor})
  })

  window.balloonDrop = (balloonID, dropID) => {
    var position = Number(dropID);
    var rgb = window.path.data().color
    delete rgb['a']
    if (typeof(window.pattern[position]) != 'undefined') {
      console.log('its got data');
      window.pattern[position].push(rgb)
      console.log(window.pattern);
    } else {
      window.pattern[position] = []
      window.pattern[position].push(rgb)
      console.log(window.pattern);
    }
  }

  // $("html").on("click", function(event){
  //
  //   console.log(event, "clicked");
  //
  // })
  // $(e.target).parent().parent() TODO clicking on a ballon- this gets the div to delete

  window.PreCalculationsPattern = []

  $("#patternPreview").on("click", function() {
    // console.log(window.pattern);
    var findNext = true
    for (let i = 0; i < window.pattern.length; i++) {
      if (window.pattern[i] != undefined) {
        var PreCalculationsObj = {
          color: '',
          intervalTillNext: ''
        }
        findNext = true
        var topColor = window.pattern[i].length - 1; //gets top color ballon value
        // console.log(window.pattern[i][topColor]);
        PreCalculationsObj.color = window.pattern[i][topColor]
        for (let j = i + 1; j < 30; j++) {
          if (window.pattern[j] != undefined && findNext == true) {
            // console.log(i, "current interval");
            // console.log(j, "next defined value"); // J is the number of intervals untill the next defined color
            let next = j - i
            // console.log(next, "space");
            PreCalculationsObj.intervalTillNext = next
            findNext = false
          }
        }
        console.log(i);
        window.PreCalculationsPattern[i] = PreCalculationsObj
      }

    }
    console.log(window.PreCalculationsPattern);
  })

  $("#Upload").on("click", function() {
    if (window.PreCalculationsPattern.length == 0) {
      var findNext = true
      for (let i = 0; i < window.pattern.length; i++) {
        if (window.pattern[i] != undefined) {
          var PreCalculationsObj = {
            color: '',
            intervalTillNext: ''
          }
          findNext = true
          var topColor = window.pattern[i].length - 1; //gets top color ballon value
          // console.log(window.pattern[i][topColor]);
          PreCalculationsObj.color = window.pattern[i][topColor]
          for (let j = i + 1; j < 30; j++) {
            if (window.pattern[j] != undefined && findNext == true) {
              // console.log(i, "current interval");
              // console.log(j, "next defined value"); // J is the number of intervals untill the next defined color
              let next = j - i
              // console.log(next, "space");
              PreCalculationsObj.intervalTillNext = next
              findNext = false
            }
          }
          window.PreCalculationsPattern[i] = PreCalculationsObj
        }

      }
    }
    let pattern =[]
    for (var i = 0; i < window.PreCalculationsPattern.length; i++) {
      if(window.PreCalculationsPattern[i] != null){
        pattern.push(window.PreCalculationsPattern[i])
      }
    }

    buildColorString(pattern)
  })



  function buildColorString(pattern){
    console.log(pattern);
    let red = []
    let green =[]
    let blue = []

    for (let i=0; i<pattern.length; i++){
      console.log("loop" + i, pattern[i]['color']);
      if(pattern[i]['intervalTillNext'] != ''){
            red = red.concat(fill(pattern[i]['color']['r'], pattern[i+1]['color']['r'], pattern[i]['intervalTillNext']))
           green = green.concat(fill(pattern[i]['color']['g'], pattern[i+1]['color']['g'], pattern[i]['intervalTillNext']))
           blue = blue.concat(fill(pattern[i]['color']['b'], pattern[i+1]['color']['b'], pattern[i]['intervalTillNext']))
      }
      else {
            red = red.concat(fill(pattern[i]['color']['r'], pattern[0]['color']['r'], pattern[i]['intervalTillNext']))
           green =  green.concat(fill(pattern[i]['color']['g'], pattern[0]['color']['g'], pattern[i]['intervalTillNext']))
           blue = blue.concat(fill(pattern[i]['color']['b'], pattern[0]['color']['b'], pattern[i]['intervalTillNext']))

      }
    }
    console.log(red);
    console.log(green);
    console.log(blue);
    patternToString(red, green, blue)
  }

  function patternToString(red, green, blue){
    let patternString = ''
    for (var i = 0; i < red.length; i++) {
      if(i < (red.length - 2)){
        patternString = patternString + red[i] + ","
        patternString = patternString + green[i] + ","
        patternString = patternString + blue[i] + ","
      }
      else if(i == red.length -2){
        patternString = patternString + red[i] + ","
        patternString = patternString + green[i] + ","
        patternString = patternString + blue[i]
      }
      else if(i == red.length -1){
        patternString = red[i] + "," + patternString
        patternString = green[i] + "," + patternString
        patternString = blue[i] + "," + patternString
      }
    }
    console.log(patternString);
    window.publishUpdate(patternString);
  }



  function fill(colorOne, colorTwo, tillNext){          //this function expect the raw value of R|G|B and the intervalTillNext (needs to be called for each key in the the color obj)
    if(typeof(tillNext)=='string'){
      tillNext = 1;
    }
    var diff = Math.abs(colorOne - colorTwo);           // get the difference
    var num = 1/tillNext;
    let newArray = []                       //the first value we know- so we just need to fill the middle values
    for (let i=0; i<tillNext-1; i++){              // its tillnext - 1 because we dont need to fill the ast value, we just need to fill whats between them
      if(colorOne > colorTwo){
        newArray.push(Math.floor(colorOne-(num*diff)*(i+1)))       //-(num*diff) takes the  starting color and outputs a new value based on how much it needs to change
      }                                               // the *(i+1)  increases the value that it adds to the starting color
      else if(colorOne < colorTwo){
        newArray.push(Math.floor(colorOne+(num*diff)*(i+1)))
      }
      else if(colorOne == colorTwo){
        newArray.push(colorOne)
      }
    }
    newArray.push(colorTwo)                           // know that the middle values are computed, add the end value
    //console.log(newArray);
    return newArray;
  }



})
