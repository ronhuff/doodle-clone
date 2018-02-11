function dropdownMenu() {
    document.getElementById("dropdown").classList.toggle("show");
}

var buttons = document.querySelectorAll(".time");

window.onclick = function(event) {
  if(!event.target.matches('.dropmenu')) {
    var dropwdowns = document.getElementsByClassName("dd-items");
    for (var i = 0; i<dropwdowns.length; i++) {
      var openDD = dropwdowns[i];
      if (openDD.classList.contains('show')) {
        openDD.classList.remove('show');
      }
    }
  }
}

init();

function init() {
  for(var i = 0; i < buttons.length; i++)
  buttons[i].addEventListener("click", function(){
  	this.classList.toggle("selected");
  })
}
