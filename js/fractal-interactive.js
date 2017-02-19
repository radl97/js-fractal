/**
 * This file is responsible for the interactive fractal input
 */

var activeLine = undefined;
var side = 0;

var lines = {};
var lastLineId = 0;

/**
 * Recalculates the line specifications and calls redraw
 * Fixes fractal's baseline to the interactive baseline
 */
function guiRedraw() {
    var baseLine = lines["base-line"];
    spec = [];
    for (var visualLine in lines) {
        if (visualLine == "base-line") continue;
        lineSpec = getLineSpecRelativeToBaseLine(visualLine, baseLine);
        spec.push(lineSpec);
    }
    $('textarea#textarea-share').val(JSON.stringify(spec));
    redrawWithBaseLine(baseLine);
}

/**
 * Called directly from Add Line button
 * Adds a line
 */
function addLine() {
    lastLineId++;
    var lineSpec = lines["base-line"];
    var parent = document.getElementById('main-draw-table');
    addInteractiveLine(parent,
        lineSpec[0],
        lineSpec[1],
        lineSpec[2],
        lineSpec[3],
        "interactive-line-" + lastLineId);
    guiRedraw();
}

/**
 * Called directly from Remove Line button
 * Removes the line that was added last
 */
function removeLine() {
    if (lastLineId == 0) return;
    var id = 'interactive-line-' + lastLineId;
    delete lines[id];
    var toRemove = document.getElementById(id);
    toRemove.parentNode.removeChild(toRemove);
    lastLineId--;
    guiRedraw();
}

$(document).ready(function () {
    var parent = document.getElementById('main-draw-table');

    addInteractiveLine(parent, 50, 50, 800, 50, "base-line");

    parent.addEventListener("mouseup", function(event) {
        if (activeLine) {
            activeLine.style.stroke = '#000';
        }
        activeLine = undefined;
    }, true);
    parent.addEventListener("mousemove", function(event) {
        if (!activeLine) return;
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

        guiRedraw();
    }, false);

});

function addInteractiveLine(parent, x, y, x2, y2, id) {
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
