/**
 * This file is responsible for drawing the main draw table
 */

var lastPath = undefined;

/**
 * Clears the draw table
 * @param drawTable The draw table jQuery SVG DOM element
 */
function clearDrawTable() {
  if (lastPath) {
    lastPath.parentNode.removeChild(lastPath);
    lastPath = 0;
  }
}

function redrawWithBaseLine(baseLineSpec) {
    // in this version we scale the fractal to horizontally fit in the screen
    // TODO resize the draw table vertically

    // compute the lines
    var specClone = spec.slice(); // we clone the fractal specification so it doesn't change while computing the fractal
    var lines = computeFractal(specClone, fractalDepth);

    // get the boundaries
    var boundaries = getBoundaries(lines);

    var drawTable = document.getElementById("main-draw-table");
    var drawTableJQ = $("#main-draw-table");
    console.log(drawTable);
    console.log(drawTable.empty);

    // compute parameters from boundaries
    // TODO: add margin to all sides (test if SVG creates anomalies when using padding or margin)
    var length = baseLineSpec[2] - baseLineSpec[0];
    var drawTableHeight = length * (boundaries.yMax - boundaries.yMin) + 100;

    var x = baseLineSpec[0];
    var y = baseLineSpec[1];
    var angle = 0;

    // TODO: use minimumDrawTableHeight to resize the draw table vertically, careful, it might be 0

    var drawTableWidth = drawTableJQ.width();
    drawTableJQ.height(drawTableWidth);

    clearDrawTable(drawTable);
    drawLines(drawTable, lines, x, y, length, angle);
}

function redraw() {
    // in this version we scale the fractal to horizontally fit in the screen
    // TODO resize the draw table vertically

    // compute the lines
    var specClone = spec.slice(); // we clone the fractal specification so it doesn't change while computing the fractal
    var lines = computeFractal(specClone, fractalDepth);

    // get the boundaries
    var boundaries = getBoundaries(lines);

    var drawTable = document.getElementById("main-draw-table");
    var drawTableJQ = $("#main-draw-table");
    console.log(drawTable);
    console.log(drawTable.empty);

    // compute parameters from boundaries
    // TODO: add margin to all sides (test if SVG creates anomalies when using padding or margin)
    var drawTableWidth = drawTableJQ.width() - 100;
    var width = Math.max(0.01, boundaries.xMax - boundaries.xMin);
    var length = drawTableWidth / width;
    var drawTableHeight = length * (boundaries.yMax - boundaries.yMin) + 100;

    var x = -boundaries.xMin * length + 50;
    var y = -boundaries.yMin * length + 50;
    var angle = 0;

    // TODO: use minimumDrawTableHeight to resize the draw table vertically, careful, it might be 0

    drawTableJQ.height(drawTableHeight);

    clearDrawTable(drawTable);
    drawLines(drawTable, lines, x, y, length, angle);
}

/**
 * Draws the lines to the draw table
 * @param drawTable The draw table
 * @param lines The set of lines
 * @param x The X coordinate of the first endpoint of the base line
 * @param y The Y coordinate of the first endpoint of the base line
 * @param length The length of the base line
 * @param angle The angle between the base line and the +X axis
 */
function drawLines(drawTable, lines, x, y, length, angle) {
    var str = "";

    for (var i = 0; i < lines.length; i++) {
        var lineSpec = lines[i];
        transformedLine = transformLine(lineSpec, x, y, length, angle);
        str += "M" + transformedLine[0] + " " + transformedLine[1] +
               " l" + transformedLine[2] + " " + transformedLine[3] + " ";
    }
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute("d", str);
    path.classList.add("draw-line");

    clearDrawTable();
    lastPath = path;
    drawTable.append(path);

}
