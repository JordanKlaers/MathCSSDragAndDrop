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
            //does nothing to the degree
            theDegree = theDegree - 180
            console.log("dropped to the  bottom left");
            console.log(theDegree, 'the degree');
        } else if (grabThisCenter.x > dropZoneCenter.x && grabThisCenter.y> dropZoneCenter.y) {
            theDegree = -Math.abs(theDegree) - 180 ;
            // theDegree = theDegree + (theDegree-180);
            console.log("dropped to the bottom right");
            console.log(theDegree, 'the degree');
        }
        else if(grabThisCenter.x > dropZoneCenter.x && grabThisCenter.y< dropZoneCenter.y){
          console.log("dropped to the top right");
          console.log(theDegree, 'the degree');
        }
        else if(grabThisCenter.x < dropZoneCenter.x && grabThisCenter.y< dropZoneCenter.y){
          theDegree = -Math.abs(theDegree) ;
          console.log("dropped to the top right");
          console.log(theDegree, 'the degree');
        }


        $('#grabThis').css({

            WebkitTransform: 'rotate(' + theDegree + 'deg)'
        });

    }
    rotate();
setInterval(rotate, 10);
    $("#grabThis").draggable({
        stop: function(event, ui) {
            rotate();
        }
    })

});
