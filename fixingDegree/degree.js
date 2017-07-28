$(document).ready(function() {

setTimeout(spin,1000);
$(".box").css({'rotate': '0deg'})
function spin(){

  $('.box').transition({ rotate: '45deg'}, 800, 'cubic-bezier(.79,.63,0.64,2)');

  $('.box').transition({ rotate: '-5deg'}, 400, 'cubic-bezier(.79,.63,0.64,2)');
  $('.box').transition({ rotate: '0deg'}, 200, 'cubic-bezier(.79,.63,0.64,2)');
}



    rotate();
    var interval = window.setInterval(rotate, 100);
    step = 0;
    degree = 0;
    theDegree = 0;
    grabThisCenter = {};
    dropZoneCenter = {};
    function rotate() {
        theDegree = findDegree();
        let centers = getBothCenters();

        //  theDegree = (180-theDegree)+ 180;
        if (centers.grab.x < centers.drop.x && centers.grab.y > centers.drop.y) {
            theDegree = theDegree - 180
        } else if (centers.grab.x > centers.drop.x && centers.grab.y > centers.drop.y) {
            theDegree = 180 - theDegree;
            // console.log("bottom right", theDegree);
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

    function findDegree() {
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
        var radianX = xDistance / hypotenus
        theDegree = Math.asin(radianX) * (180 / Math.PI)
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
            x: dropDimensions.left + dropDimensions.width / 2,
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

    function gotDistance() {
        let centers = getBothCenters()
        var distanceOBJ = { //gets the x distance and y distance between what you dropped and where it should have landed
            x: Math.abs(centers.drop.x - centers.grab.x),
            y: Math.abs(centers.drop.y - centers.grab.y)
        }
        distanceOBJ.x *= distanceOBJ.x
        distanceOBJ.y *= distanceOBJ.y
        var cSquared = distanceOBJ.x + distanceOBJ.y
        var distance = Math.sqrt(cSquared) //pythagorean theroy to find the linear distance away
        return distance
    }

    $("#grabThis").draggable({
        stop: function(event, ui) {
            window.clearInterval(interval)
            let degree = rotate();
            console.log(degree, "degree when dropped");
            let distance = gotDistance();
            let centers = getBothCenters();

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
                var top = centers.drop.y - centers.regularGrab.height / 2 //regOffset.top
                    var left = centers.drop.x - centers.regularGrab.width / 2 //regOffset.left
                        console.log(top, left),
                        "top left";
                        // $('#grabThis').css({
                        //     WebkitTransform: 'rotate(' + 45 + 'deg)'
                        // });
                        // buildRotate(theDegree);
                        $('#grabThis').css({

                        });

                        $("#grabThis").animate({
                            top: top, //TODO the top left are different from the raw javascript get bounding box top and left so its not getting dropped correctly
                            left: left
                        }, function() {
                            console.log("done floating");
                        })
                        console.log(degree, "degree to lock");
                        lock(degree);

                    }
                }
            });


function lock(deg){
  if(deg>0){
    $('#grabThis').transition({ rotate: `${-10}` + 'deg'}, 1200, 'cubic-bezier(0,.28,.64,1.6)');
    $('#grabThis').transition({ rotate: `${10}` + 'deg'}, 1000, 'cubic-bezier(0,0.15,.64,2)');
    $('#grabThis').transition({ rotate: `${0}` + 'deg'}, 1000, 'cubic-bezier(0,0,.64,2)');
  }
  else if(deg<0){
    $('#grabThis').transition({ rotate: `${10}` + 'deg'}, 1200, 'cubic-bezier(0,.28,.64,1.6)');
    $('#grabThis').transition({ rotate: `${-10}` + 'deg'}, 1000, 'cubic-bezier(0,0.15,.64,2)');
    $('#grabThis').transition({ rotate: `${0}` + 'deg'}, 1000, 'cubic-bezier(0,0,.64,2)');
  }

  console.log(degree);
}


        });
