/**
 * Clears the draw table
 * @param drawTable The draw table jQuery SVG DOM element
 */
function clearDrawTable(drawTable) {
    drawTable.empty();
}

/**
 * Draw a line to the draw table
 * @param drawTable The draw table jQuery SVG DOM element
 * @param x X coordinate of the start point
 * @param y Y coordinate of the start point
 * @param dx X coordinate of the end point relative to the start point (real coordinate is x+dx)
 * @param dy Y coordinate of the end point relative to the start point (real coordinate is y+dy)
 */
function drawLine(drawTable, x, y, dx, dy) {
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute("d", "M" + x + " " + y + " l" + dx + " " + dy);
    path.classList.add("draw-line");

    drawTable.append(path);
}
