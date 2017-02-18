/**
 * This file is responsible for the interactive fractal input
 */

var activeLine = undefined;
var side = 0;

var lines = {};

$(document).ready(function () {
    var parent = document.getElementById('main-draw-table');

    addInteractiveLine(parent, 50, 50, 800, 50, "base-line");
    addInteractiveLine(parent, 50, 50, 500, 300, "interactive-line-01");
    addInteractiveLine(parent, 50, 50, 300, 100, "interactive-line-02");
    addInteractiveLine(parent, 50, 50, 500, 100, "interactive-line-03");
    addInteractiveLine(parent, 50, 50, 300, 300, "interactive-line-04");

    parent.addEventListener("mousedown", function(event) {
        activeLine = undefined;
    }, true);
    parent.addEventListener("mouseup", function(event) {
        if (!activeLine) return;
        activeLine.style.stroke = '#000';
        var x0 = event.offsetX;
        var y0 = event.offsetY;
        var line = lines[activeLine.id];
        if (side) {
          line[0] = x0;
          line[1] = y0;
        } else {
          line[2] = x0;
          line[3] = y0;
        }
        if (activeLine.id == "base-line") {
          line[1] = line[3] = y0;
        }
        activeLine.setAttribute("d", "M" + line[0] + " " + line[1] + " L" + line[2] + " " + line[3]);
        console.log(event);
        console.log(activeLine);

        var line = undefined;
        console.log(spec);
        spec = [];
        var baseLine = lines["base-line"];
        var baseX1 = baseLine[0];
        var baseY1 = baseLine[1];
        var baseX2 = baseLine[2];
        var baseY2 = baseLine[3];
        var baseDX = baseX2 - baseX1;
        var baseDY = baseY2 - baseY1;
        var baseLength = Math.sqrt(baseDX*baseDX + baseDY*baseDY);
        for (var visualLine in lines) {
            if (visualLine == "base-line") continue;
            var line = lines[visualLine];
            var x1 = line[0] - baseX1;
            var y1 = line[1] - baseY1;
            var x2 = line[2] - baseX1;
            var y2 = line[3] - baseY1;
            var dx = x2 - x1;
            var dy = y2 - y1;
            console.log(x1);
            console.log(x2);
            console.log(dx);
            var angle = Math.atan2(dy, dx);
            var length = Math.sqrt(dx*dx + dy*dy);
            console.log(length);
            console.log(baseLength);
            spec.push([x1 / baseLength, y1 / baseLength, length / baseLength, angle]);
        }
        console.log(spec);
        redrawWithBaseLine([baseX1, baseY1, baseX2, baseY2]);
    }, false);

});

function addInteractiveLine(parent, x, y, x2, y2, id) {
//    var visualLine = document.createElementNS('http://www.w3.org/2000/svg', 'visualLine');
//    visualLine.setAttribute("d", "M" + x + " " + y + " L" + (x+x2) + " " + (y+y2));
//    visualLine.classList.add("draw-line");

    var interactiveLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    interactiveLine.setAttribute("d", "M" + x + " " + y + " L" + x2 + " " + y2);
    interactiveLine.classList.add("line-interactive");
    interactiveLine.id = id;
    lines[id] = [x,y,x2,y2];

    function generateMouseDownHandler(line) {
        return function(event) {
            mouse_moved = 0;
            activeLine = line;
            activeLine.style.stroke = '#0F0';
            var x0 = event.offsetX;
            var y0 = event.offsetY;
            var lineSpec = lines[activeLine.id];
            var dx1 = lineSpec[0] - x0;
            var dy1 = lineSpec[1] - y0;
            var dx2 = lineSpec[2] - x0;
            var dy2 = lineSpec[3] - y0;
            var l1 = dx1*dx1 + dy1*dy1;
            var l2 = dx2*dx2 + dy2*dy2;
            side = +(l1 < l2);
            console.log(side);
        }
    }
    interactiveLine.addEventListener("mousedown",
        generateMouseDownHandler(interactiveLine), true);

    interactiveLine.addEventListener("mousemove", function(){
        mouse_moved = 1;
    }, false);

//    parent.appendChild(visualLine);
    parent.appendChild(interactiveLine);
}
