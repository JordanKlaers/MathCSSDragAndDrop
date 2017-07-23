$(document).ready(function(){
  console.log("ready");
  var snap = Snap(65,100);
  // var paper = snap();
  var path = snap.path("M100 10 C78 10 70 25 70 40 C70 70 100 55 100 100 C100 55 130 70 130 40 C130 25 122 10 100 10").attr({'stroke':'black', 'stroke-width':"3", 'stroke-linejoin':"round", 'fill': 'white', "transform": "translateX(-68px)"})

  // console.log(huh);
  $("#rightHereTwo").append(snap)
  var svg = document.getElementsByTagName("svg");
  $(svg).css({"position": "absolute", 'top': "0", 'left': '0'})

  // $(svg).addClass('anime')
  var offset = $("#dropZone").offset();         //offset gets the x and y coordinates
  var height = $("#dropZone").outerHeight();
  var width = $("#dropZone").outerWidth();
  var dropZoneCenter = {                         //get the height and width so you can move it up and over half those values to position the center
    x: offset.left + width / 2,
    y: offset.top + height / 2
  }
  var origin = dropZoneCenter.x + " " + dropZoneCenter.y     // trying to set the origin of the svg to the center of the drop spot, doesnt work
  console.log(origin);
  $(svg).css({'transform-origin': "center bottom"})
  var deg = 1
  console.log($(svg).offset(), "svg offset");
  setInterval(
    function () {
      deg +=10
      if(deg>190){
        console.log($(svg).offset(), "svg offset when rotate");

        return
      }
        $(svg).css({'transform': 'rotate('+deg+'deg)'}, 0);      // this does make it rotate
    },
    200
);





$(svg).draggable({
  stop: function(event, ui) {
    //                                                this is the grabbed object


        var offset = $("#dropZone").offset();         //offset gets the x and y coordinates
        var height = $("#dropZone").outerHeight();
        var width = $("#dropZone").outerWidth();
        var dropZoneCenter = {                         //get the height and width so you can move it up and over half those values to position the center
          x: offset.left + width / 2,
          y: offset.top + height / 2
        }
        console.log("dropzonecenter", dropZoneCenter);


        var Goffset = $(svg).offset();         // gatta figure out where i dropped it
        var Gheight = $(svg).outerHeight();
        var Gwidth = $(svg).outerWidth();
        var grabCenter = {                              // shifting over  to  get the coordinates of its center
          x: Goffset.left + Gwidth / 2,
          y: Goffset.top + Gheight / 2
        }
        console.log("grab center when dropped", grabCenter);

        var distanceOBJ = {                           //gets the x distance and y distance between what you dropped and where it should have landed
          x: Math.abs(dropZoneCenter.x - grabCenter.x),
          y: Math.abs(dropZoneCenter.y - grabCenter.y)
        }
        distanceOBJ.x *= distanceOBJ.x
        distanceOBJ.y *= distanceOBJ.y
        var cSquared = distanceOBJ.x + distanceOBJ.y
        var distance= Math.sqrt(cSquared)        //pythagorean theroy to find the linear distance away
        console.log(distance);

        if(distance<100){
          $(svg).parent().css({position: 'relative'})
          var top = dropZoneCenter.y - Gwidth/2
          var left = dropZoneCenter.x - Gheight/2
          $(svg).animate({top: top, left: left}, 1000, function(){
            console.log("done moving");
          })
        }
    }
});





$( '#dropZone' ).droppable({
    drop: function (event, ui) {
      console.log(ui.draggable.sourceElement);
        // ui.draggable.sourceElement.css();
    }
});
// $('#grabThis').on('dragend', function(evt) {
//  console.log(evt.originalEvent.dataTransfer);
//  evt.target.style.visibility = "";                  // this returns undefined
// //  evt.originalEvent.data(); // so this produces error
// evt.originalEvent.dataTransfer
// });


})
