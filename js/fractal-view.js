/**
 * This file is responsible for drawing the main draw table
 */

/**
 * Clears the draw table
 * @param drawTable The draw table jQuery SVG DOM element
 */
function clearDrawTable(drawTable) {
    drawTable.empty();
}

function redraw() {
    // in this version we scale the fractal to horizontally fit in the screen
    // TODO resize the draw table vertically

    // compute the lines
    var specClone = spec.slice(); // we clone the fractal specification so it doesn't change while computing the fractal
    var lines = computeFractal(specClone, fractal_depth);

    // get the boundaries
    var boundaries = getBoundaries(lines);

    var drawTable = document.querySelector("#main-draw-table");
    var drawTableJQ = $("#main-draw-table");

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
