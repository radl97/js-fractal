$(document).ready(function () {
  var mouse_moved = 0;
  var parent = document.getElementById('gui-input-draw-table');
});

function addInteractiveLine(parent, x, y, dx, dy) {
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute("d", "M" + x + " " + y + " l" + dx + " " + dy);
    path.classList.add("draw-line");

    var interactiveLine = document.createElementNS('http://www.w3.org/2000/svg', 'interactiveLine');
    interactiveLine.setAttribute("d", "M" + x + " " + y + " l" + dx + " " + dy);
    interactiveLine.classList.add("line-interactive");

    interactive.addEventListener("mousedown", function(){
        mouse_moved = 0;
    }, false);

    interactiveLine.addEventListener("mousemove", function(){
        mouse_moved = 1;
    }, false);

    function upEvent(this) { return function(event) {
        console.log(event);
        if (mouse_moved === 0) {
          console.log("Click");
        } else if (mouse_moved === 1) {
          console.log("Drag");
        }
        mouse_moved = 0;
    };}

    interactiveLine.addEventListener("mouseup", upEvent(interactiveLine), false);

    drawTable.appendChild(path);
    drawTable.appendChild(interactiveLine);
}
