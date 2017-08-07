$(document).ready(function(){



  var coordinates = []


  function createTimeLine() {
    var zero = $("#start");
    var timeTick = $("<div>")
    // coordinates.push(zero.offset())
    var dynamicMargin = 40;
    var dynamicMargintwo = 88;

    timeTick.attr({'class':'timeMarks', 'id':'time1'})
    // timeTick.css({})

    var count = 1;
    timeTick.html(1)
    for(let i=0; i<132; i++){
      var another = zero.clone(true);
      var moreTime = timeTick.clone(true);
      moreTime.attr({'id': `time${i+2}`, 'class': "timeMarks"})
      another.attr({'id': `clone${i}`, 'class': 'timeLinePoints'})
      if(i!=0){
        dynamicMargintwo += 60;
      }
      dynamicMargin +=60
      another.css({
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
      if(i==0){
        moreTime.css({
          'position': 'absolute',
          'height': '19px',
          'width': '36px',
          'border-radius': '8px',
          'background-color': 'white',
          'border': '1.5px solid black',
          'margin-left': '88px',
          'margin-top': '180px',
          'text-align': 'center'
        })
      }
      else {
        moreTime.css({
          'position': 'absolute',
          'height': '19px',
          'width': '36px',
          'border-radius': '8px',
          'background-color': 'white',
          'border': '1.5px solid black',
          'margin-left': dynamicMargintwo,
          'margin-top': '180px',
          'text-align': 'center'
        })
      }

      moreTime.html(`${1+count*i}`)

      $("#timeContainer").append(another);
      if(i<131){
        $("#timeContainer").append(moreTime);
      }
    }

  }

  createTimeLine();


  $("#patternPreview").on("click", function(){
    console.log("clicked");
  })




})
