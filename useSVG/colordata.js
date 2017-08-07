$(document).ready(function(){

window.pattern = [];



  // var tinycolor = require("tinycolor2");
  var slider = $("#slider")
  var currentColor;
      $(slider).on('input', function(){
        let color = `hsl( ${this.value}deg, 100%, 50%)`
        let colorConvert = `hsl( ${this.value}, 100%, 50%)`
        window.path.attr({"fill": color});
        var hslToRGB = tinycolor(colorConvert);
        currentColor = hslToRGB.toRgb();
        window.path.data({"color": currentColor})
      })


      window.balloonDrop = (balloonID, dropID)=>{
        var position = Number(dropID);
        var rgb = window.path.data().color
        delete rgb['a']
        if (typeof(window.pattern[position]) != 'undefined'){
          console.log('its got data');
          window.pattern[position].push(rgb)
          console.log(window.pattern);
        }
        else {
          window.pattern[position] = []
          window.pattern[position].push(rgb)
          console.log(window.pattern);
        }
      }

      // $("html").on("click", function(event){
      //
      //   console.log(event, "clicked");
      //
      // })
        // $(e.target).parent().parent() TODO clicking on a ballon- this gets the div to delete

window.PreCalculationsPattern =[]


      $("#patternPreview").on("click", function(){
        // console.log(window.pattern);
        var findNext = true
        for(let i=0; i<window.pattern.length; i++){
          if (window.pattern[i] != undefined) {
            var PreCalculationsObj = {
              color: '',
              intervalTillNext: ''
            }
            findNext = true
            var topColor = window.pattern[i].length-1;    //gets top color ballon value
            // console.log(window.pattern[i][topColor]);
            PreCalculationsObj.color = window.pattern[i][topColor]
            for (let j=i+1; j<30; j++){
              if(window.pattern[j] != undefined && findNext == true){
                // console.log(i, "current interval");
                // console.log(j, "next defined value"); // J is the number of intervals untill the next defined color
                let next = j-i
                // console.log(next, "space");
                PreCalculationsObj.intervalTillNext = next
                findNext = false
              }
            }
            console.log(i);
            window.PreCalculationsPattern[i] = PreCalculationsObj
          }

        }
        console.log(window.PreCalculationsPattern);
      })


})
