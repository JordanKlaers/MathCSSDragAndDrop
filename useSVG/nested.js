$(document).ready(function(){

  var box = $('<div>')
  $(box).css({'height': '200', 'width': '65', 'background-color': 'rgba(255, 0, 0, 0.5)'})
  $(box).addClass("box")
  $('#container').append(box)
  var snap = Snap(65,100);
  // var paper = snap();
  var path = snap.path("M100 10 C78 10 70 25 70 40 C70 70 100 55 100 100 C100 55 130 70 130 40 C130 25 122 10 100 10").attr({'stroke':'black', 'stroke-width':"3", 'stroke-linejoin':"round", 'fill': 'white', "transform": "translateX(-68px)"})
  ;
  // console.log(huh);
  var svg = document.getElementsByTagName("svg");
  $(box).append(svg)
  console.log(svg, box);
  $(svg).css({"transform-origin": "center bottom"})
  // $(svg).draggable();
  $(svg).addClass("theSVG");
  $(svg).attr({"id": "svgID"})
  console.log($(svg).attr('id'));
  // getGrabCenter();








  function calculations(){
    let SVGCenter = getGrabCenter();
    let timelineCenters = getTimelineCenters();
    let theClosest = getClosest();
    let closestCenter = getCenterOfClosest();
    // console.log( "svg center 1st", SVGCenter);
    // console.log( " the array of centers from timeline 2nd", timelineCenters);
    console.log("the closest 3rd", theClosest);
    // console.log("the center of the closest 4th", closestCenter);
    // console.log(theClosest, "the closest");
    let degreeToRotate = getDegreeToRotate(closestCenter, SVGCenter)
    // console.log( "degree to rotate 5th", degreeToRotate);

    var draggableInformation = {
      closestCenter: closestCenter,
      SVGCenter: SVGCenter,
      degree: degreeToRotate
    }

    return draggableInformation;
  }


  function rotate(){
    draggableInformation = calculations();
    console.log(draggableInformation);
    $(svg).css({"rotate": draggableInformation.degree})
  }

// var interval = window.setInterval(rotate, 10);
calculations();
rotate();



  var recoupLeft, recoupTop, theInterval;

     $(box).draggable({

          handle: svg,
         start: function(event, ui){
           // $(svg).css({"transform-origin": "center bottom"})
          //  console.log(ui, "UI");
          //  console.log("start drag");
           var left = parseInt($(this).css('left'),10);
          left = isNaN(left) ? 0 : left;
          var top = parseInt($(this).css('top'),10);
          top = isNaN(top) ? 0 : top;
          recoupLeft = left - ui.position.left;
          recoupTop = top - ui.position.top;
          theInterval = window.setInterval(rotate, 10);
         },
         drag: function (event, ui) {
             ui.position.left += recoupLeft;
             ui.position.top += recoupTop;
         },
         stop: function(event, ui) {
           window.clearInterval(theInterval)

     }
   });




    //        let draggableInformation = calcudraggableInformation.SVGCenter
     //
    //          if (draggableInformation.SVGCenter.x < draggableInformation.closestCenter.x && draggableInformation.SVGCenter.y > draggableInformation.closestCenter.y) {
    //              theDegree = theDegree - 180
    //              console.log(" dropped bottom left");
    //          } else if (draggableInformation.SVGCenter.x > draggableInformation.closestCenter.x && draggableInformation.SVGCenter.y > draggableInformation.closestCenter.y) {
    //              // theDegree = 180 - Math.abs(theDegree);
    //              console.log("dropped bottom right");
    //              console.log(degree);
    //          } else if (draggableInformation.SVGCenter.x > draggableInformation.closestCenter.x && draggableInformation.SVGCenter.y < draggableInformation.closestCenter.y) {
    //              //do nothing
    //              console.log(" dropped top left");
    //          } else if (draggableInformation.SVGCenter.x < draggableInformation.closestCenter.x && draggableInformation.SVGCenter.y < draggableInformation.closestCenter.y) {
    //              theDegree = -Math.abs(theDegree);
    //              console.log(" dropped top right");
    //          }
     //
    //          if (distance < 150) {
     //
     //
     //
     //
    //              $(svg).parent().css({position: 'relative'})
     //
    //              var regOffset = $(svg).offset();
    //              var top = centers.drop.y - 96 //regOffset.top
    //                  var left = centers.drop.x - 32  //regOffset.left
    //                      console.log(top, left),
    //                      "top left";
    //                      // $('svg').css({
    //                      //     WebkitTransform: 'rotate(' + 45 + 'deg)'
    //                      // });
    //                      // buildRotate(theDegree);
     //
     //
    //                      $(svg).animate({
    //                          top: top, //TODO the top left are different from the raw javascript get bounding box top and left so its not getting dropped correctly
    //                          left: left
    //                      }, function() {
    //                          console.log("done floating");
    //                      })
     //
    //                      console.log(degree, "degree to lock");
    //                      lock(degree);
     //
    //                  }
    //              }
    //          });

































  function getGrabCenter(){
    let grabDimensions = document.getElementById("svgID");
    grabDimensions = grabDimensions.getBoundingClientRect()
    // console.log(grabDimensions, "grabDimensions from getbothcenters()");
    var GrabCenter = { //get the height and width so you can move it up and over half those values to position the center
        x: grabDimensions.left + grabDimensions.width / 2,
        y: grabDimensions.top + grabDimensions.height / 2
    }
    // console.log(GrabCenter, "just grab center");
    return GrabCenter
  }

  function getTimelineCenters(){
    let timeCenters = [];
    let dropDimensions = document.getElementsByClassName("time");
    for(let i=0; i<dropDimensions.length; i++){
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


  function getCenterOfClosest(){
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


  function getClosest(){
    var timelineCenters = getTimelineCenters();
    var grabCenter = getGrabCenter();
    var distances = [];

    for( let i=0; i< timelineCenters.length; i++){
      var distanceOBJ = { //gets the x distance and y distance between what you dropped and where it should have landed
        x: Math.abs(timelineCenters[i].x - grabCenter.x),
        y: Math.abs(timelineCenters[i].y - grabCenter.y)
      }
      distanceOBJ.x *= distanceOBJ.x
      distanceOBJ.y *= distanceOBJ.y
      var cSquared = distanceOBJ.x + distanceOBJ.y
      var distance = {
        dist: Math.sqrt(cSquared),
        id:  timelineCenters[i].id
      // console.log(distance);
      }
      distances.push(distance)
    }

    var shortestDistance = 900000000000;
    var shortest;
    // console.log(distances);
    for(let j=0; j<distances.length; j++){
      console.log(shortestDistance, "shortestDistance");
      console.log(distances[j], "each distance");
      if(distances[j].dist<shortestDistance){
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
