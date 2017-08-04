$(document).ready(function() {

    $('html').click(function(e) {
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        console.log(y, x);
    });

    var box = $('<div>')
    $(box).css({'height': '200', 'width': '65', 'background-color': 'rgba(255, 0, 0, 0.0)', 'margin': '0', 'top': '0'})
    $(box).addClass("box")
    $(box).attr({'id': 'parentBox'})
    $('#container').append(box)

    var snap = Snap(65, 100);
    var path = snap.path("M100 10 C78 10 70 25 70 40 C70 70 100 55 100 100 C100 55 130 70 130 40 C130 25 122 10 100 10").attr({'stroke': 'black', 'stroke-width': "3", 'stroke-linejoin': "round", 'fill': 'white', "transform": "translateX(-68px)"});
    var svg = document.getElementsByTagName("svg");

    $(box).append(svg)
    $(svg).css({"transform-origin": "center bottom"})
    $(svg).addClass("theSVG");
    $(svg).attr({"id": "svgID"})
    $('#parentBox').css({'position': 'absolute', 'top': '100'})

    function calculations(currentlyDraggedBalloon, currentID) {
      console.log(currentID); // only here when the balloon is dropped
        let SVGCenter = getGrabCenter(currentlyDraggedBalloon);
        let timelineCenters = getTimelineCenters();
        let theClosest = getClosest();
        let closestCenter = getCenterOfClosest();
        let degreeToRotate = getDegreeToRotate(closestCenter, SVGCenter)
        var draggableInformation = {
            closestCenter: closestCenter,
            SVGCenter: SVGCenter,
            degree: degreeToRotate,
            closestDistance: theClosest.dist
        }
        return draggableInformation;
    }

    function rotate(clone, currentBalloonID) {
      console.log(clone);
      if(clone){
        // console.log(clone);
      }
        draggableInformation = calculations(clone, currentBalloonID);    // the rotate interval is called when the balloon drag start, (rotate gets all the info and does the rotate) so now the currently grabbed balloon is available for the calculations
        let rotateBalloon = $(clone).children()[0]
        // console.log(rotateBalloon);
        $(rotateBalloon).css({"rotate": draggableInformation.degree})
    }



    var recoupLeft,
        recoupTop,
        theInterval,
        currentBalloonID;
    var balloonCount = 0;

    $('.box').draggable({
      helper: 'clone',
      // appendTo: 'body',
        handle: svg,
        start: function(event, ui) {
          balloonCount++;
          $(ui.helper[0]).attr({'id': "balloon" + balloonCount})     //this will dynamically generate new id's

          currentBalloonID =   $(ui.helper[0]).attr('id')            // this saves the current balloons ID
          console.log(currentBalloonID);

          theInterval = window.setInterval(function(){rotate($(ui.helper[0]),currentBalloonID)}, 10);

            var left = parseInt($(this).css('left'), 10);
            left = isNaN(left)
                ? 0
                : left;
            var top = parseInt($(this).css('top'), 10);
            top = isNaN(top)
                ? 0
                : top;
            recoupLeft = left - ui.position.left;
            recoupTop = top - ui.position.top;
        },
        drag: function(event, ui) {
            ui.position.left += recoupLeft;
            ui.position.top += recoupTop;
        },
        stop: function(event, ui) {

          // console.log($(ui.helper[0]).offset());
            window.clearInterval(theInterval)

            let draggableInformation = calculations($(ui.helper[0]), currentBalloonID);

            if (draggableInformation.closestDistance < 100) {
                var top = draggableInformation.closestCenter.y //regOffset.top
                var left = draggableInformation.closestCenter.x //regOffset.left
                let currentBalloon = ui.helper
                currentBalloon =  $(currentBalloon)[0]
                let balloon = document.getElementById(currentBalloonID)
                // let jqueryID = '"#'+currentBalloonID+'"'
                // console.log(jqueryID);
              // $("#first").transition({ rotate: `${-100}` + 'deg'}, 1200, 'cubic-bezier(0,.28,.64,1.6)');



                // $(currentBalloon)[0].animate({
                //     top: top, //- $('#parentBox').height() / 2, //TODO the top left are different from the raw javascript get bounding box top and left so its not getting dropped correctly
                //     left: left //- $('#parentBox').width() / 2)
                // }, function() {
                //     console.log("done floating");
                //     lock(draggableInformation.degree);
                //     // let newBalloon = $('#parentBox').clone(true, true)
                //     // $("#rightHere").append(newBalloon)
                //     //
                // })
            }
        }
    });


    $("body").droppable({
        accept: ".box",
    	drop: function (event, ui) {
    		let clone = ui.helper.clone()
        clone = clone[0]
        let draggableInformation = calculations(clone, currentBalloonID); // called before the balloon is floated to center, to get its degree of rotation, to be used when bobbeling
        $(clone).appendTo('body');
        var top = draggableInformation.closestCenter.y
        var left = draggableInformation.closestCenter.x
        $(clone).animate({                                  // this is what makes it float to the center
            top: top - $(clone).height()/2,
            left: left - $(clone).width()/2
        }, function() {
            console.log("done floating", draggableInformation.degree);
            lock(draggableInformation.degree, $(clone).children()[0]);
        })
        }
    });



    function lock(deg, svg){
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

    }

    function getGrabCenter() {
        let grabDimensions = document.getElementById(currentBalloonID);
        grabDimensions = grabDimensions.getBoundingClientRect()
        var GrabCenter = { //get the height and width so you can move it up and over half those values to position the center
            x: grabDimensions.left + grabDimensions.width / 2,
            y: grabDimensions.top + grabDimensions.height / 2
        }
        // console.log(GrabCenter, "just grab center");
        return GrabCenter
    }

    function getTimelineCenters() {
        let timeCenters = [];
        let dropDimensions = document.getElementsByClassName("time");
        for (let i = 0; i < dropDimensions.length; i++) {
            timelineTick = dropDimensions[i].getBoundingClientRect()
            let DropCenter = {
                x: timelineTick.left + timelineTick.width / 2,
                y: timelineTick.top + timelineTick.height / 2,
                id: dropDimensions[i].id
            }
            timeCenters.push(DropCenter)
        }
        // console.log(timeCenters);
        return timeCenters
    }

    function getCenterOfClosest() {
        var idOfClosest = getClosest();
        // console.log(idOfClosest, "id of closest");

        let dropDimensions = document.getElementById(idOfClosest.id);
        dropDimensions = dropDimensions.getBoundingClientRect()
        let DropCenterOnTimeline = {
            x: dropDimensions.left + dropDimensions.width / 2,
            y: dropDimensions.top + dropDimensions.height / 2
        }
        //TODO need to return drop center to use to getting the angle to rotate by
        return DropCenterOnTimeline
    }

    function getClosest() {
        var timelineCenters = getTimelineCenters();
        var grabCenter = getGrabCenter();
        var distances = [];

        for (let i = 0; i < timelineCenters.length; i++) {
            var distanceOBJ = { //gets the x distance and y distance between what you dropped and where it should have landed
                x: Math.abs(timelineCenters[i].x - grabCenter.x),
                y: Math.abs(timelineCenters[i].y - grabCenter.y)
            }
            distanceOBJ.x *= distanceOBJ.x
            distanceOBJ.y *= distanceOBJ.y
            var cSquared = distanceOBJ.x + distanceOBJ.y
            var distance = {
                dist: Math.sqrt(cSquared),
                id: timelineCenters[i].id
                // console.log(distance);
            }
            distances.push(distance)
        }

        var shortestDistance = 900000000000;
        var shortest;
        // console.log(distances);
        for (let j = 0; j < distances.length; j++) {
            if (distances[j].dist < shortestDistance) {
                shortestDistance = distances[j].dist
                shortest = distances[j]
            }
        }
        // if(distances[1].dist<distances[0].dist){
        //   console.log("the second distance is less than the first");
        // }
        // console.log(shortestDistance);

        return shortest
    }

    function getDegreeToRotate(closetCenter, SVGCenter) {

        // console.log(closetCenter, "closetCenter", SVGCenter, "grab center");

        var distanceOBJ = { //gets the x distance and y distance between what you dropped and where it should have landed
            x: Math.abs(closetCenter.x - SVGCenter.x),
            y: Math.abs(closetCenter.y - SVGCenter.y)
        }
        var xDistance = distanceOBJ.x // saved the x distance because the object got changed after but i need tthis value
        distanceOBJ.x *= distanceOBJ.x
        distanceOBJ.y *= distanceOBJ.y
        var cSquared = distanceOBJ.x + distanceOBJ.y
        var hypotenus = Math.sqrt(cSquared) //pythagorean theroy to find the linear distance away
        // console.log(hypotenus, "distance");
        var radianX = xDistance / hypotenus
        theDegree = Math.asin(radianX) * (180 / Math.PI)

        if (SVGCenter.x < closetCenter.x && SVGCenter.y > closetCenter.y) {
            theDegree = theDegree - 180
        } else if (SVGCenter.x > closetCenter.x && SVGCenter.y > closetCenter.y) {
            theDegree = 180 - theDegree;
            // console.log("bottom right", theDegree);
        } else if (SVGCenter.x > closetCenter.x && SVGCenter.y < closetCenter.y) {
            // theDegree = 360 + Math.abs(theDegree);
            //bottom right
        } else if (SVGCenter.x < closetCenter.x && SVGCenter.y < closetCenter.y) {
            theDegree = -Math.abs(theDegree);
        }

        return theDegree
    }

    // function getDegreeToRotate(){

    // }

})
