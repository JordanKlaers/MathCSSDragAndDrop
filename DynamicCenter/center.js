$(document).ready(function() {
    $(document).on("click", function(event) {
        // console.log(event.pageX, event.pageY);
        let offset = $("#grabThis").offset()
        // console.log(offset);
    })
    step = 0;
    degree = 0;
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
        var radian = xDistance / hypotenus
        theDegree = Math.asin(radian) * (180 / Math.PI)
        console.log("the degree", theDegree);
        //  theDegree = (180-theDegree)+ 180;
        if (centers.grab.x < centers.drop.x && centers.grab.y > centers.drop.y) {
            theDegree = theDegree - 180
        } else if (centers.grab.x > centers.drop.x && centers.grab.y > centers.drop.y) {
            theDegree = 180 - theDegree  ;
            console.log("bottom right", theDegree);
        } else if (centers.grab.x > centers.drop.x && centers.grab.y < centers.drop.y) {
          // theDegree = 360 + Math.abs(theDegree);
            //bottom right
        } else if (centers.grab.x < centers.drop.x && centers.grab.y < centers.drop.y) {
            theDegree = -Math.abs(theDegree);
        }

        $('#grabThis').css({
            WebkitTransform: 'rotate(' + theDegree + 'deg)' //could be plus 360
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
    // var interval = window.setInterval(rotate, 100);


    function point(top, left) {
        let centers = getBothCenters();
        $("#point").css({top: centers.drop.y, left: centers.drop.x})
        $("#point2").css({top: centers.grab.y, left: centers.grab.x})
        $("#point3").css({top: top, left: left})
    }

    function rotateUpright(){
      // console.log("callback rotate upright");
      let offset = $("#grabThis").offset();
    }


    var grabbed = document.getElementById("grabThis")
    var box = grabbed.getBoundingClientRect()



    point(box.top, box.left);

    $("#grabThis").draggable({
        stop: function(event, ui) {
            window.clearInterval(interval)
            let degree = rotate();
            console.log(degree, "degree when dropped");

            let centers = getBothCenters()
            var distanceOBJ = { //gets the x distance and y distance between what you dropped and where it should have landed
                x: Math.abs(centers.drop.x - centers.grab.x),
                y: Math.abs(centers.drop.y - centers.grab.y)
            }
            distanceOBJ.x *= distanceOBJ.x
            distanceOBJ.y *= distanceOBJ.y
            var cSquared = distanceOBJ.x + distanceOBJ.y
            var distance = Math.sqrt(cSquared) //pythagorean theroy to find the linear distance away
            // console.log(distance, "distance");

            // console.log(degree, "degree when dropped");



            if (centers.grab.x < centers.drop.x && centers.grab.y > centers.drop.y) {
                theDegree = theDegree - 180
                console.log(" dropped bottom left");
            } else if (centers.grab.x > centers.drop.x && centers.grab.y > centers.drop.y) {
                // theDegree = 180 - Math.abs(theDegree);
                console.log("dropped bottom right");
                console.log(degree);
            } else if (centers.grab.x > centers.drop.x && centers.grab.y < centers.drop.y) {
                //do nothing
                console.log(" dropped top left");
            } else if (centers.grab.x < centers.drop.x && centers.grab.y < centers.drop.y) {
                theDegree = -Math.abs(theDegree);
                console.log(" dropped top right");
            }













            if (distance < 100) {
                $("#grabThis").parent().css({position: 'relative'})
                var regOffset = $("#grabThis").offset();
                var top = centers.drop.y - centers.regularGrab.height/2//regOffset.top
                var left = centers.drop.x - centers.regularGrab.width/2//regOffset.left
                console.log(top, left), "top left";
                // $('#grabThis').css({
                //     WebkitTransform: 'rotate(' + 45 + 'deg)'
                // });
                buildRotate(theDegree);
                $("#grabThis").animate({
                    top: top,                       //TODO the top left are different from the raw javascript get bounding box top and left so its not getting dropped correctly
                    left: left
                }, rotateUpright()
                )
            }

        }
    });

    function buildRotate(degree){
      var newDegree = 0;
      var movement = [];
      // console.log(degree,"step");

      if(degree< 0 && degree > -180){
        console.log("degree IS", degree);
        step = (Math.abs(degree)+ 40)/100
      }
      // for(let i=1;i<101; i++){
      //   newDegree = degree+ step*i;
      //   movement.push(newDegree);
      // }
      startBobble(step, degree);

      console.log(movement, "array for angles to move");
    }

    function startBobble(step, degree){
      bobbleInterval = setInterval(function(){bobble(step, degree)}, 10)
    }

    globalDegree = 0;
    setValueInitially = true;

    function bobble(step, degree){




      console.log("inside boble", globalDegree);
      if(setValueInitially){
        globalDegree = degree;
      }
      setValueInitially=false;
      globalDegree = globalDegree + step
          $('#grabThis').css({
            WebkitTransform: 'rotate(' + globalDegree + 'deg)'
          })

        if(globalDegree<40 && globalDegree>35){
          console.log("degree is less than 40");
          clearInterval(bobbleInterval)
          // bobble(degree, step);
        }
    }

});
