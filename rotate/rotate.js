$(document).ready(function() {
    $(document).on("click", function(event){
      console.log(event.pageX, event.pageY);
    })
    function point (){
      let centers = getBothCenters()

      $("#point").css({
        top:  centers.drop.y,
        left: centers.drop.x
      })
      $("#point2").css({
        top:  centers.grab.y,
        left: centers.grab.x
      })
    }

    point();


    theDegree = 0;
    grabThisCenter = {};
    dropZoneCenter = {};
    function rotate() {
        //need to get hypotenus divided by opposite angle
        // point();    //TODO why does calling it here change its origin!!!!!!!!!!!!!!___)__)_)_)_)_)___________)_)_)_)_)_)_)_)_)_)________________________________

        let centers = getBothCenters()


        var offset = $("#dropZone").offset(); //offset gets the x and y coordinates
        var height = $("#dropZone").outerHeight();
        var width = $("#dropZone").outerWidth();
        dropZoneCenter = { //get the height and width so you can move it up and over half those values to position the center
            x: offset.left + width / 2,
            y: offset.top + height / 2
        }
        var origin = dropZoneCenter.x + " " + dropZoneCenter.y // trying to set the origin of the svg to the center of the drop spot, doesnt work

        var where = $('#grabThis').offset();
        var Gheight = $("#grabThis").outerHeight();
        var Gwidth = $("#grabThis").outerWidth();
        grabThisCenter = { //get the height and width so you can move it up and over half those values to position the center
            x: where.left + Gwidth / 2,
            y: where.top + Gheight / 2
        }
        //get hypotenus -->
        // var distanceOBJ = { //gets the x distance and y distance between what you dropped and where it should have landed
        //   x: Math.abs(dropZoneCenter.x - grabThisCenter.x),
        //   y: Math.abs(dropZoneCenter.y - grabThisCenter.y)
        // }
          console.log(centers.drop, dropZoneCenter, "dropzone");
          console.log(centers.grab, grabThisCenter, "grab this");



        // //get hypotenus -->
        var distanceOBJ = { //gets the x distance and y distance between what you dropped and where it should have landed
          x: Math.abs(centers.drop.x - centers.grab.x),
          y: Math.abs(centers.drop.y - centers.grab.y)
        }



        var xDistance = distanceOBJ.x // saved the x distance because the object got changed after but i need tthis value
        distanceOBJ.x *= distanceOBJ.x
        distanceOBJ.y *= distanceOBJ.y
        var cSquared = distanceOBJ.x + distanceOBJ.y
        var hypotenus = Math.sqrt(cSquared) //pythagorean theroy to find the linear distance away
        // console.log(hypotenus, "distance");
        var numberForSin = xDistance / hypotenus
        theDegree = Math.asin(numberForSin) * (180 / Math.PI)
        //  theDegree = (180-theDegree)+ 180;
        console.log("before the ifsssss");
        if (grabThisCenter.x < dropZoneCenter.x && grabThisCenter.y > dropZoneCenter.y) {
            theDegree = theDegree - 180
            console.log(" dropped bottom left");
        } else if (grabThisCenter.x > dropZoneCenter.x && grabThisCenter.y > dropZoneCenter.y) {
            // theDegree = 180 - Math.abs(theDegree);
            console.log("dropped bottom right");
        } else if (grabThisCenter.x > dropZoneCenter.x && grabThisCenter.y < dropZoneCenter.y) {
            //do nothing
            console.log(" dropped top left");
        } else if (grabThisCenter.x < dropZoneCenter.x && grabThisCenter.y < dropZoneCenter.y) {
            theDegree = -Math.abs(theDegree);
            console.log(" dropped top right");
        }

        $('#grabThis').css({

            WebkitTransform: 'rotate(' + theDegree + 'deg)'
        });
        return theDegree
    }

    function getBothCenters() {
        let whereIsIt = $('#grabThis').offset();
        let Grabheight = $("#grabThis").outerHeight();
        let Grabwidth = $("#grabThis").outerWidth();
        let GrabCenter = { //get the height and width so you can move it up and over half those values to position the center
            x: whereIsIt.left + Grabwidth / 2,
            y: whereIsIt.top + Grabheight / 2
        }

        let DropOffset = $("#dropZone").offset(); //offset gets the x and y coordinates
        let DropHeight = $("#dropZone").outerHeight();
        let DropWidth = $("#dropZone").outerWidth();
        let DropCenter = { //get the height and width so you can move it up and over half those values to position the center
            x: DropOffset.left + DropWidth / 2,
            y: DropOffset.top + DropHeight / 2
        }
        let center = {
            drop: DropCenter,
            grab: GrabCenter,
            grabWidth: Grabwidth,
            grabHeight: Grabheight
        }
        // console.log(center.grabH);
        return center;
    }

    rotate();

    function rotateUpright(){
      // theDegree = Math.abs
    }


    var interval = window.setInterval(rotate, 10);









    $("#grabThis").draggable({
        stop: function(event, ui) {
          // point();
            window.clearInterval(interval)

            let centers = getBothCenters()


            // console.log(centers.grabHeight, "centers grab height right awawy");
            if (centers.grab.x < centers.drop.x && centers.grab.y > centers.drop.y) { //bottom left
                console.log("bottom left");
            } else if (centers.grab.x > centers.drop.x && centers.grab.y > centers.drop.y) { //bottom right
                console.log("bottom right");
            } else if (centers.grab.x > centers.drop.x && centers.grab.y < centers.drop.y) { //top right
                console.log("top right");
            } else if (centers.grab.x < centers.drop.x && centers.grab.y < centers.drop.y) { //top left
                console.log("top left");
            }
            //                                                this is the grabbed object

            var distanceOBJ = { //gets the x distance and y distance between what you dropped and where it should have landed
                x: Math.abs(centers.drop.x - centers.grab.x),
                y: Math.abs(centers.drop.y - centers.grab.y)
            }
            distanceOBJ.x *= distanceOBJ.x
            distanceOBJ.y *= distanceOBJ.y
            var cSquared = distanceOBJ.x + distanceOBJ.y
            var distance = Math.sqrt(cSquared) //pythagorean theroy to find the linear distance away


            if (distance < 100) {
                $("#grabThis").parent().css({position: 'relative'})
                var top = centers.drop.y - centers.grabWidth / 2
                var left = centers.drop.x - centers.grabHeight / 2

                $("#grabThis").animate({
                    top: top,
                    left: left
                }, rotateUpright()
                )
                // { step : function() {
                //      if(theDegree >0){
                //        theDegree -= 10
                //      };
                //     console.log("inside step");
                //     $("#grabThis").css({
                //         transform: 'rotate(' + theDegree + 'deg)'
                //     });
                // }
            }

        }
      });

    });
