/**
 * Clears the draw table
 * @param drawTable The draw table SVG DOM element
 */
function clearDrawTable(drawTable) {
    while (drawTable.firstChild) {
        drawTable.removeChild(drawTable.firstChild);
    }
}

/**
 * Draw a line to the draw table
 * @param drawTable The draw table SVG DOM element
 * @param x X coordinate of the start point
 * @param y Y coordinate of the start point
 * @param dx X coordinate of the end point relative to the start point (real coordinate is x+dx)
 * @param dy Y coordinate of the end point relative to the start point (real coordinate is y+dy)
 */
function drawLine(drawTable, x, y, dx, dy) {
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute("d", "M " + x + " " + y + " l " + dx + " " + dy);
    path.style.stroke = "#F00";
    path.style.strokeWidth = "1px";

    drawTable.appendChild(path);
}

/**
 * Draw the fractal recursively to the draw table
 * @param drawTable The draw table SVG DOM element
 * @param spec The specification of the fractal
 * Syntax: An array of [x,y,length,angle] values
 * Each element describes a line: length length from (x,y) in angle radian
 * The specification tells that from a line between (0;0) and (1;0) we must create these lines
 * @param depth Depth of fractal recursion
 * @param x The X coordinate of the base line
 * @param y The Y coordinate of the base line
 * @param length The length of the base line
 * @param angle The angle of the base line
 */
function draw(drawTable, spec, depth, x, y, length, angle) {
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);

    // 0'th depth means that we simply draw the line
    if (depth === 0) {
        var dx = cos * length;
        var dy = sin * length;
        drawLine(drawTable, x, y, dx, dy);
        return;
    }

    // if the depth is non-zero, we go through all the lines specified by the fractal, and recurse there
    for (var i = 0; i < spec.length; i++) {
        var lineSpec = spec[i];
        var fractalX = lineSpec[0], fractalY = lineSpec[1], fractalLength = lineSpec[2], fractalAngle = lineSpec[3];
        var newX = length * (fractalX * cos - fractalY * sin) + x;
        var newY = length * (fractalY * cos + fractalX * sin) + y;
        var newLength = fractalLength * length;
        var newAngle = fractalAngle + angle;
        draw(drawTable, spec, depth - 1, newX, newY, newLength, newAngle);
    }
}

/**
 * Draw the fractal to the draw table
 * @param selector The draw table SVG DOM element
 * @param spec The specification of the fractal
 * Syntax: An array of [x,y,length,angle] values
 * Each element describes a line: length length from (x,y) in angle radian
 * The specification tells that from a line between (0;0) and (1;0) we must create these lines
 */
function drawFractal(selector, spec) {
    var drawTable = document.querySelector(selector);

    clearDrawTable(drawTable);
    // TODO connect this function with the GUI
    draw(drawTable, spec, 6, 20, 20, 729, 0);
}
