var colorOne = 0
var colorTwo = 255

var tillNext = 2;
// var array = [colorOne, colorTwo];

function fill(colorOne, colorTwo, tillNext){          //this function expect the raw value of R|G|B and the intervalTillNext (needs to be called for each key in the the color obj)
  var diff = Math.abs(colorOne - colorTwo);           // get the difference
  console.log(diff);
  var num = 1/tillNext;

  var newArray = [colorOne]                       //the first value we know- so we just need to fill the middle values
  for (let i=0; i<tillNext-1; i++){              // its tillnext - 1 because we dont need to fill the ast value, we just need to fill whats between them
    if(colorOne > colorTwo){
      newArray.push(Math.floor(colorOne-(num*diff)*(i+1)))       //-(num*diff) takes the  starting color and outputs a new value based on how much it needs to change
    }                                               // the *(i+1)  increases the value that it adds to the starting color
    else if(colorOne > colorTwo){
      newArray.push(Math.floor(colorOne+(num*diff)*(i+1)))
    }
    else if(colorOne == colorTwo){
      newArray.push(diff)
    }
  }
  newArray.push(colorTwo)                           // know that the middle values are computed, add the end value
  console.log(newArray);

}


fill(colorOne, colorTwo, tillNext)
