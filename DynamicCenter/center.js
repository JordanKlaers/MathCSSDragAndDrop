$(document).ready(function() {
    $(document).on("click", function(event) {
        console.log(event.pageX, event.pageY);
        let offset = $("#grabThis").offset()
        console.log(offset);
    })

    theDegree = 0;
    grabThisCenter = {};
    dropZoneCenter = {};
    function rotate() {
        point();
        let centers = getBothCenters();

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
        if (centers.grab.x < centers.drop.x && centers.grab.y > centers.drop.y) {
            theDegree = theDegree - 180
        } else if (centers.grab.x > centers.drop.x && centers.grab.y > centers.drop.y) {
            theDegree = -Math.abs(theDegree) - 180;
        } else if (centers.grab.x > centers.drop.x && centers.grab.y < centers.drop.y) {
          console.log("in bottom right");
            //bottom right
        } else if (centers.grab.x < centers.drop.x && centers.grab.y < centers.drop.y) {
            theDegree = -Math.abs(theDegree);
        }

        $('#grabThis').css({
            WebkitTransform: 'rotate(' + theDegree + 'deg)'
        });
        return theDegree
    }

    function getBothCenters() {
        let grabDimensions = document.getElementById("grabThis");
        grabDimensions = grabDimensions.getBoundingClientRect()
        // console.log(grabDimensions, "grabDimensions from getbothcenters()");
        var GrabCenter = { //get the height and width so you can move it up and over half those values to position the center
            x: grabDimensions.left + grabDimensions.width / 2,
            y: grabDimensions.top + grabDimensions.height / 2
        }

        let dropDimensions = document.getElementById("dropZone");
        dropDimensions = dropDimensions.getBoundingClientRect()
        let DropCenter = {
            x: dropDimensions.left +dropDimensions.width / 2,
            y: dropDimensions.top + dropDimensions.height / 2
        }
        let regularGrabWidth = $("#grabThis").outerHeight()
        let regularGrabHeight = $("#grabThis").outerWidth()
        let grabRegularDimentions = {
          height: regularGrabHeight,
          width: regularGrabWidth
        }

        var center = {
            drop: DropCenter,
            grab: GrabCenter,
            grabDimensions: grabDimensions,
            regularGrab: grabRegularDimentions
        }
        return center;
    }

    rotate();
    var interval = window.setInterval(rotate, 10);


    function point(top, left) {
        let centers = getBothCenters();

        $("#point").css({top: centers.drop.y, left: centers.drop.x})
        $("#point2").css({top: centers.grab.y, left: centers.grab.x})
        $("#point3").css({top: top, left: left})
    }

    function rotateUpright(){
      console.log("callback rotate upright");
      let offset = $("#grabThis").offset()
      console.log(offset);
    }


    var grabbed = document.getElementById("grabThis")
    var box = grabbed.getBoundingClientRect()
    console.log(box.top, " top ", box.left, " left ");
    // console.log(box);

point(box.top, box.left);

    $("#grabThis").draggable({
        stop: function(event, ui) {
            // point();
            window.clearInterval(interval)
            // var degree = rotate();
            // console.log(degree);/
            let centers = getBothCenters()

            var distanceOBJ = { //gets the x distance and y distance between what you dropped and where it should have landed
                x: Math.abs(centers.drop.x - centers.grab.x),
                y: Math.abs(centers.drop.y - centers.grab.y)
            }
            distanceOBJ.x *= distanceOBJ.x
            distanceOBJ.y *= distanceOBJ.y
            var cSquared = distanceOBJ.x + distanceOBJ.y
            var distance = Math.sqrt(cSquared) //pythagorean theroy to find the linear distance away
            console.log(distance, "distance");

            if (distance < 100) {
                $("#grabThis").parent().css({position: 'relative'})

                var regOffset = $("#grabThis").offset();
                console.log(centers);
                console.log(centers.drop.y, centers.regularGrab.height, centers.drop.x, centers.regularGrab.width);

                var top = centers.drop.y - centers.regularGrab.height/2//regOffset.top
                var left = centers.drop.x - centers.regularGrab.width/2//regOffset.left
                // top = top + centers.grabDimensions.height/2
                // left = left + centers.grabDimensions.width/2

                // left = Math.abs(left)
                // console.log(centers);
                console.log(top, left), "top left";
                $('#grabThis').css({
                    WebkitTransform: 'rotate(' + 0 + 'deg)'
                });
                $("#grabThis").animate({
                    top: top,                       //TODO the top left are different from the raw javascript get bounding box top and left so its not getting dropped correctly
                    left: left
                }, rotateUpright()
                )
            }

        }
    });

});
