$(document).ready(function(){
  console.log("ready");
  function rotate(){
    //need to get hypotenus divided by opposite angle


    var offset = $("#dropZone").offset();         //offset gets the x and y coordinates
    var height = $("#dropZone").outerHeight();
    var width = $("#dropZone").outerWidth();
    var dropZoneCenter = {                         //get the height and width so you can move it up and over half those values to position the center
      x: offset.left + width / 2,
      y: offset.top + height / 2
    }
    var origin = dropZoneCenter.x + " " + dropZoneCenter.y     // trying to set the origin of the svg to the center of the drop spot, doesnt work
    console.log(origin);

    var where = $('#grabThis').offset();
    var Gheight = $("#grabThis").outerHeight();
    var Gwidth = $("#grabThis").outerWidth();
    var grabThisCenter = {                         //get the height and width so you can move it up and over half those values to position the center
      x: where.left + Gwidth / 2,
      y: where.top + Gheight / 2
    }
//get hypotenus -->
var distanceOBJ = {                           //gets the x distance and y distance between what you dropped and where it should have landed
  x: Math.abs(dropZoneCenter.x - grabThisCenter.x),
  y: Math.abs(dropZoneCenter.y - grabThisCenter.y)
}
var xDistance = distanceOBJ.x    // saved the x distance because the object got changed after but i need tthis value
distanceOBJ.x *= distanceOBJ.x
distanceOBJ.y *= distanceOBJ.y
var cSquared = distanceOBJ.x + distanceOBJ.y
var hypotenus= Math.sqrt(cSquared)        //pythagorean theroy to find the linear distance away
console.log(hypotenus ,"hypotenus");
console.log(xDistance, 'X');
console.log(hypotenus, 'hypotenus');
var numberForSin = xDistance/hypotenus
     var theDegree = Math.asin(numberForSin) * (180/Math.PI)
    //  theDegree = (180-theDegree)+ 180;
     theDegree = theDegree - (theDegree*2);  // this changes how it rotates to get the bottom of the div facing the point
     console.log(theDegree, 'the degree');


     $('#grabThis').css({


             WebkitTransform: 'rotate(' + theDegree + 'deg)'
         });


  }
  rotate();



var angle = 0;     // starting position (degrees)
var distance = 30; // distance of b from a
var speed = 60;    // revolution speed in degrees per second
var rate  = 10;    // refresh rate in ms
console.log(Math.asin(0.5), "math");



});
