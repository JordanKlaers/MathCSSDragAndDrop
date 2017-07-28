$(document).ready(function() {
$(svg).css({})
  var snap = Snap(65,100);
  // var paper = snap();
  var path = snap.path("M100 10 C78 10 70 25 70 40 C70 70 100 55 100 100 C100 55 130 70 130 40 C130 25 122 10 100 10").attr({'stroke':'black', 'stroke-width':"3", 'stroke-linejoin':"round", 'fill': 'white', "transform": "translateX(-68px)"})

  // console.log(huh);
  $("#rightHereTwo").append(snap)
  var svg = document.getElementsByTagName("svg");
  $(svg).css({"transform-origin": "center bottom", "top":"200px",
  "left":"68px", "position": "absolute" })
  $(svg).draggable();
  $(svg).addClass("theSVG");
  $(svg).attr({"id": "svgID"})

var testCenters = getBothCenters();
$('#point').css({'top': testCenters.grab.y, 'left': testCenters.grab.x})
//   $('svg').css({
//     'transform-origin':  "center bottom"
// });





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

        $(svg).css({
            WebkitTransform: 'rotate(' + theDegree + 'deg)' //could be plus 360
        });
        console.log(theDegree);
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
        let grabDimensions = document.getElementById("svgID");
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
        let regularGrabWidth = $(svg).outerHeight()
        let regularGrabHeight = $(svg).outerWidth()
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

 var recoupLeft, recoupTop;

    $(svg).draggable({
        start: function(event, ui){
          // $(svg).css({"transform-origin": "center bottom"})
          console.log(ui, "UI");
          console.log("start drag");
          var left = parseInt($(this).css('left'),10);
         left = isNaN(left) ? 0 : left;
         var top = parseInt($(this).css('top'),10);
         top = isNaN(top) ? 0 : top;
         recoupLeft = left - ui.position.left;
         recoupTop = top - ui.position.top;
        },
        drag: function (event, ui) {
            ui.position.left += recoupLeft;
            ui.position.top += recoupTop;
        },
        stop: function(event, ui) {
          // ui.position.left += recoupLeft;
          // ui.position.top += recoupTop;


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

            if (distance < 150) {
              // console.log(this);



                $(svg).parent().css({position: 'relative'})

                var regOffset = $(svg).offset();
                var top = centers.drop.y - 96 //regOffset.top
                    var left = centers.drop.x - 32  //regOffset.left
                        console.log(top, left),
                        "top left";
                        // $('svg').css({
                        //     WebkitTransform: 'rotate(' + 45 + 'deg)'
                        // });
                        // buildRotate(theDegree);


                        $(svg).animate({
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
    $(svg).transition({ rotate: `${-10}` + 'deg'}, 1200, 'cubic-bezier(0,.28,.64,1.6)');
    $(svg).transition({ rotate: `${10}` + 'deg'}, 1000, 'cubic-bezier(0,0.15,.64,2)');
    $(svg).transition({ rotate: `${0}` + 'deg'}, 1000, 'cubic-bezier(0,0,.64,2)');
  }
  else if(deg<0){
    $(svg).transition({ rotate: `${10}` + 'deg'}, 1200, 'cubic-bezier(0,.28,.64,1.6)');
    $(svg).transition({ rotate: `${-10}` + 'deg'}, 1000, 'cubic-bezier(0,0.15,.64,2)');
    $(svg).transition({ rotate: `${0}` + 'deg'}, 1000, 'cubic-bezier(0,0,.64,2)');
  }

  console.log(degree);
}


        });
