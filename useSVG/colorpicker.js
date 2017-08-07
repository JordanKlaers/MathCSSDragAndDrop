$(document).ready(function() {

    $('html').click(function(e) {
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;

        // console.log($(window).scrollLeft());
    });


    var box = $('<div>')
    $(box).css({'height': '200', 'width': '65', 'background-color': 'rgba(255, 0, 0, 0.0)', 'top': '100px', "left": '50px', 'position': 'absolute', 'z-index': '0'})
    $(box).addClass("box")
    $(box).attr({'id': 'parentBox'})
    $('#colorPicker').append(box)

    var snap = Snap(65, 100);
    window.path = snap.path("M100 10 C78 10 70 25 70 40 C70 70 100 55 100 100 C100 55 130 70 130 40 C130 25 122 10 100 10").attr({'stroke': 'black', 'stroke-width': "3", 'stroke-linejoin': "round", 'fill': 'white', "transform": "translateX(-68px)"});
    var svg = document.getElementsByTagName("svg");

    $(box).append(svg)
    $(svg).css({"transform-origin": "center bottom"})
    $(svg).addClass("theSVG");
    $(svg).attr({"id": "svgID"})





    function calculations(currentlyDraggedBalloon, currentID) {
      // only here when the balloon is dropped
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

      if(clone){

      }
        draggableInformation = calculations(clone, currentBalloonID);    // the rotate interval is called when the balloon drag start, (rotate gets all the info and does the rotate) so now the currently grabbed balloon is available for the calculations
        let rotateBalloon = $(clone).children()[0]

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
        stack: ".box",
        start: function(event, ui) {
          balloonCount++;
          $(ui.helper[0]).attr({'id': "balloon" + balloonCount})     //this will dynamically generate new id's


          currentBalloonID =   $(ui.helper[0]).attr('id')            // this saves the current balloons ID


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


            window.clearInterval(theInterval)

            let draggableInformation = calculations($(ui.helper[0]), currentBalloonID);

        }
    });



    $("#timeContainer").droppable({
        accept: ".box",

    	drop: function (event, ui) {
          // $(this).append(ui.helper.clone());

    		let clone = ui.helper.clone()
        clone = clone[0]
        $(clone).css({position:"absolute", left:ui.offset.left-this.offsetLeft + $("#timeContainer").scrollLeft() + $(window).scrollLeft(), top:ui.offset.top-this.offsetTop});
        let draggableInformation = calculations(clone, currentBalloonID); // called before the balloon is floated to center, to get its degree of rotation, to be used when bobbeling
        $(clone).appendTo('#timeContainer');
        var top = draggableInformation.closestCenter.y
        var left = draggableInformation.closestCenter.x
        if (draggableInformation.closestDistance < 100) {
            var top = draggableInformation.closestCenter.y //regOffset.top
            var left = draggableInformation.closestCenter.x //regOffset.left

            $(clone).animate({                                  // this is what makes it float to the center
                top: '54px',//top - $(clone).height()/2,
                left: left - 134 + $("#timeContainer").scrollLeft() + $(window).scrollLeft() - 150    //IF YOU MOVE THE MARGIN OF THE TIMEZONE OVER THEN YOU HAVE TO SUBTRACT THE SAME AMOUNT WHEN YOU POSITION THE DROPPED BALLOON
            }, function() {
              var idOfClosest = getClosest();       //need to save the id(point on timeline) to the svg path so when you click on it it can be deleted
              let path = $(clone).children()[0]       // the box is the element being cloned, its grandchild is the path
              path = $(path).children()[2]
              $(path).data({'timeIndex': idOfClosest.id.split('').pop()})      // adds the data to the path
              window.balloonDrop(currentBalloonID, idOfClosest.id.split('').pop());
              lock(draggableInformation.degree, $(clone).children()[0]);
            })
        }
        else{

          $(clone).remove();
          //  event.preventDefault()
        }
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

        return GrabCenter
    }
    getTimelineCenters();
    function getTimelineCenters() {
        let timeCenters = [];
        let dropDimensions = document.getElementsByClassName("timeLinePoints");


        for (let i = 0; i < dropDimensions.length; i++) {
            timelineTick = dropDimensions[i].getBoundingClientRect()
            let DropCenter = {
                x: timelineTick.left + timelineTick.width / 2,
                y: timelineTick.top + timelineTick.height / 2,
                id: dropDimensions[i].id
            }
            timeCenters.push(DropCenter)
        }
        return timeCenters
    }

    function addPoints(timeline){

      for(let i=0; i<3; i++){
        let element = document.getElementById(timeline[i].id)
        let left =  element.getBoundingClientRect().left - 96

        let point = $("<div>")
        $(point).css({'height':'0px','width':'0px', 'border': '2px solid black', 'position': 'absolute'})
        $(point).css({"z-index": "3000", "top": '32px', "left": left})
        point.appendTo("#timeContainer")
      }



    }

    function getCenterOfClosest() {
        var idOfClosest = getClosest();
        let dropDimensions = document.getElementById(idOfClosest.id);
        dropDimensions = dropDimensions.getBoundingClientRect()

        let left = dropDimensions.left + 7
        let top = dropDimensions.top + 7
        let DropCenterOnTimeline = {
            x: left,
            y: top
        }
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

            }
            distances.push(distance)
        }

        var shortestDistance = 900000000000;
        var shortest;

        for (let j = 0; j < distances.length; j++) {
            if (distances[j].dist < shortestDistance) {
                shortestDistance = distances[j].dist
                shortest = distances[j]
            }
        }
        return shortest
    }

    function getDegreeToRotate(closetCenter, SVGCenter) {



        var distanceOBJ = { //gets the x distance and y distance between what you dropped and where it should have landed
            x: Math.abs(closetCenter.x - SVGCenter.x),
            y: Math.abs(closetCenter.y - SVGCenter.y)
        }
        var xDistance = distanceOBJ.x // saved the x distance because the object got changed after but i need tthis value
        distanceOBJ.x *= distanceOBJ.x
        distanceOBJ.y *= distanceOBJ.y
        var cSquared = distanceOBJ.x + distanceOBJ.y
        var hypotenus = Math.sqrt(cSquared) //pythagorean theroy to find the linear distance away

        var radianX = xDistance / hypotenus
        theDegree = Math.asin(radianX) * (180 / Math.PI)

        if (SVGCenter.x < closetCenter.x && SVGCenter.y > closetCenter.y) {
            theDegree = theDegree - 180
        } else if (SVGCenter.x > closetCenter.x && SVGCenter.y > closetCenter.y) {
            theDegree = 180 - theDegree;

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
