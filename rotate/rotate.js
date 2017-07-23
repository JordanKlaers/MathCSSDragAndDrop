$(document).ready(function() {
    console.log("ready");
    function rotate() {
        //need to get hypotenus divided by opposite angle

        var offset = $("#dropZone").offset(); //offset gets the x and y coordinates
        var height = $("#dropZone").outerHeight();
        var width = $("#dropZone").outerWidth();
        var dropZoneCenter = { //get the height and width so you can move it up and over half those values to position the center
            x: offset.left + width / 2,
            y: offset.top + height / 2
        }
        var origin = dropZoneCenter.x + " " + dropZoneCenter.y // trying to set the origin of the svg to the center of the drop spot, doesnt work

        var where = $('#grabThis').offset();
        var Gheight = $("#grabThis").outerHeight();
        var Gwidth = $("#grabThis").outerWidth();
        var grabThisCenter = { //get the height and width so you can move it up and over half those values to position the center
            x: where.left + Gwidth / 2,
            y: where.top + Gheight / 2
        }
        //get hypotenus -->
        var distanceOBJ = { //gets the x distance and y distance between what you dropped and where it should have landed
            x: Math.abs(dropZoneCenter.x - grabThisCenter.x),
            y: Math.abs(dropZoneCenter.y - grabThisCenter.y)
        }
        var xDistance = distanceOBJ.x // saved the x distance because the object got changed after but i need tthis value
        distanceOBJ.x *= distanceOBJ.x
        distanceOBJ.y *= distanceOBJ.y
        var cSquared = distanceOBJ.x + distanceOBJ.y
        var hypotenus = Math.sqrt(cSquared) //pythagorean theroy to find the linear distance away

        var numberForSin = xDistance / hypotenus
        var theDegree = Math.asin(numberForSin) * (180 / Math.PI)
        //  theDegree = (180-theDegree)+ 180;
        if (grabThisCenter.x < dropZoneCenter.x && grabThisCenter.y> dropZoneCenter.y) {
            theDegree = theDegree - 180
        } else if (grabThisCenter.x > dropZoneCenter.x && grabThisCenter.y> dropZoneCenter.y) {
            theDegree = -Math.abs(theDegree) - 180 ;
        }
        else if(grabThisCenter.x > dropZoneCenter.x && grabThisCenter.y< dropZoneCenter.y){
          //do nothing
        }
        else if(grabThisCenter.x < dropZoneCenter.x && grabThisCenter.y< dropZoneCenter.y){
          theDegree = -Math.abs(theDegree) ;
        }


        $('#grabThis').css({

            WebkitTransform: 'rotate(' + theDegree + 'deg)'
        });

    }
    rotate();
var interval = window.setInterval(rotate, 10);
    $("#grabThis").draggable({
        stop: function(event, ui) {
          window.clearInterval(interval)
          // log
              //                                                this is the grabbed object


                  var offset = $("#dropZone").offset();         //offset gets the x and y coordinates
                  var height = $("#dropZone").outerHeight();
                  var width = $("#dropZone").outerWidth();
                  var dropZoneCenter = {                         //get the height and width so you can move it up and over half those values to position the center
                    x: offset.left + width / 2,
                    y: offset.top + height / 2
                  }
                  console.log("dropzonecenter", dropZoneCenter);


                  var Goffset = $("#grabThis").offset();         // gatta figure out where i dropped it
                  var Gheight = $("#grabThis").outerHeight();
                  var Gwidth = $("#grabThis").outerWidth();
                  var grabCenter = {                              // shifting over  to  get the coordinates of its center
                    x: Goffset.left + Gwidth / 2,
                    y: Goffset.top + Gheight / 2
                  }


                  var distanceOBJ = {                           //gets the x distance and y distance between what you dropped and where it should have landed
                    x: Math.abs(dropZoneCenter.x - grabCenter.x),
                    y: Math.abs(dropZoneCenter.y - grabCenter.y)
                  }
                  distanceOBJ.x *= distanceOBJ.x
                  distanceOBJ.y *= distanceOBJ.y
                  var cSquared = distanceOBJ.x + distanceOBJ.y
                  var distance= Math.sqrt(cSquared)        //pythagorean theroy to find the linear distance away
                  

                  if(distance<100){
                    $("#grabThis").parent().css({position: 'relative'})
                    var top = dropZoneCenter.y - Gwidth/2
                    var left = dropZoneCenter.x - Gheight/2
                    $("#grabThis").animate({top: top, left: left}, 1000, function(){
                      console.log("done moving");
                    })
                  }
              }
          });




});
