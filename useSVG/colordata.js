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
        // console.log("ballon was dropped------");
        // console.log(window.path.data());
        var position = Number(dropID);
        var rgb = window.path.data()
        delete rgb['a']

        if (typeof(window.pattern[position]) != 'undefined'){
          console.log('its got data');
          window.pattern[position].push(rgb)
        }
        else {
          window.pattern[position] = []
          window.pattern[position].push(rgb)
          console.log(window.pattern);
        }


      }
        // $(e.target).parent().parent()




})
