$(document).ready(function(){
  console.log("ready");


  var coordinates = []


  function createTimeLine() {
    var zero = $("#start");
    coordinates.push(zero.offset())
    var dynamicMargin = 40;
    for(let i=0; i<132; i++){
      var another = zero.clone(true);
      another.attr({'id': `clone ${i}`})
      dynamicMargin +=60
      var css = another.css({
        'position': 'absolute',
        'height': '12px',
        'width': '12px',
        'border-radius': '8px',
        'background-color': 'white',
        'border': '1.5px solid black',
        'margin-left': dynamicMargin,
        'margin-top': '24px',
        'z-index': 3
      })
      coordinates.push(another.offset())
      // console.log(css);
      $("#container").append(another);
    }
    console.log(coordinates);
  }
  createTimeLine();
// $( '#grabThis' ).draggable({
//   stop: function(event, ui) {
//     //                                                this is the grabbed object
//
//
//         var offset = $("#dropZone").offset();         //offset gets the x and y coordinates
//         var height = $("#dropZone").outerHeight();
//         var width = $("#dropZone").outerWidth();
//         var dropZoneCenter = {                         //get the height and width so you can move it up and over half those values to position the center
//           x: offset.left + width / 2,
//           y: offset.top + height / 2
//         }
//         console.log("dropzonecenter", dropZoneCenter);
//
//
//         var Goffset = $("#grabThis").offset();         // gatta figure out where i dropped it
//         var Gheight = $("#grabThis").outerHeight();
//         var Gwidth = $("#grabThis").outerWidth();
//         var grabCenter = {                              // shifting over  to  get the coordinates of its center
//           x: Goffset.left + Gwidth / 2,
//           y: Goffset.top + Gheight / 2
//         }
//         console.log("grab center when dropped", grabCenter);
//
//         var distanceOBJ = {                           //gets the x distance and y distance between what you dropped and where it should have landed
//           x: Math.abs(dropZoneCenter.x - grabCenter.x),
//           y: Math.abs(dropZoneCenter.y - grabCenter.y)
//         }
//         distanceOBJ.x *= distanceOBJ.x
//         distanceOBJ.y *= distanceOBJ.y
//         var cSquared = distanceOBJ.x + distanceOBJ.y
//         var distance= Math.sqrt(cSquared)        //pythagorean theroy to find the linear distance away
//         console.log(distance);
//
//         if(distance<100){
//           $("#grabThis").parent().css({position: 'relative'})
//           var top = dropZoneCenter.y - Gwidth/2
//           var left = dropZoneCenter.x - Gheight/2
//           $("#grabThis").animate({top: top, left: left}, 1000, function(){
//             console.log("done moving");
//           })
//         }
//     }
// });
//
//
//
//
//
// $( '#dropZone' ).droppable({
//     drop: function (event, ui) {
//       console.log(ui.draggable.sourceElement);
//         // ui.draggable.sourceElement.css();
//     }
// });


})
