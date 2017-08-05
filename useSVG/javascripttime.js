$(document).ready(function(){
  console.log("ready");


  var coordinates = []


  function createTimeLine() {
    var zero = $("#start");
    coordinates.push(zero.offset())
    var dynamicMargin = 40;
    for(let i=0; i<132; i++){
      var another = zero.clone(true);
      another.attr({'id': `clone${i}`, 'class': 'timeLinePoints'})
      dynamicMargin +=60
      var css = another.css({
        'position': 'absolute',
        'height': '12px',
        'width': '12px',
        'border-radius': '8px',
        'background-color': 'white',
        'border': '1.5px solid black',
        'margin-left': dynamicMargin,
        'margin-top': '144px',
        'z-index': 3
      })
      coordinates.push(another.offset())
      // console.log(css);
      $("#timeContainer").append(another);
    }
    console.log(coordinates);
  }

  createTimeLine();


  $('html').click(function(e) {
    var scrollLeft = $("#timeContainer").scrollLeft()
    console.log(scrollLeft);
  });

})
