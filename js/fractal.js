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
 * Compute and return all the lines of the fractal recursively
 * @param spec The specification of the fractal
 * Syntax: An array of [x,y,length,angle] values
 * Each element describes a line: length length from (x,y) in angle radian
 * The specification tells that from a line between (0;0) and (1;0) we must create these lines
 * @param depth Depth of fractal recursion
 * @param x The X coordinate of the base line
 * @param y The Y coordinate of the base line
 * @param length The length of the base line
 * @param angle The angle of the base line
 * @return lines returns all the lines of the fractal
 */
function compute(spec, depth, x, y, length, angle) {
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);
    var result = [];

    // 0'th depth means that we simply draw the line
    if (depth === 0) {
        var dx = cos * length;
        var dy = sin * length;
        result.push([x, y, length, angle]);
        return result;
    }

    // if the depth is non-zero, we go through all the lines specified by the fractal, and recurse there
    for (var i = 0; i < spec.length; i++) {
        var lineSpec = spec[i];
        var fractalX = lineSpec[0], fractalY = lineSpec[1], fractalLength = lineSpec[2], fractalAngle = lineSpec[3];
        var newX = length * (fractalX * cos - fractalY * sin) + x;
        var newY = length * (fractalY * cos + fractalX * sin) + y;
        var newLength = fractalLength * length;
        var newAngle = fractalAngle + angle;
        result = result.concat(compute(spec, depth - 1, newX, newY, newLength, newAngle));
    }
    return result;
}

/**
 * Compute and return all the lines of the fractal
 * @param spec The specification of the fractal
 * Syntax: An array of [x,y,length,angle] values
 * Each element describes a line: length length from (x,y) in angle radian
 * The specification tells that from a line between (0;0) and (1;0) we must create these lines
 * @param depth Depth of fractal recursion
 * @return [line] returns All the lines of the fractal
 */
function computeFractal(spec, depth) {
    return compute(spec, depth, 0, 0, 1, 0);
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
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);

    for (var i = 0; i < lines.length; i++) {
        var lineSpec = lines[i];
        var lineX = lineSpec[0], lineY = lineSpec[1], lineLength = lineSpec[2], lineAngle = lineSpec[3];
        var transformedX = length * (lineX * cos - lineY * sin) + x;
        var transformedY = length * (lineY * cos + lineX * sin) + y;
        var transformedLength = lineLength * length;
        var transformedAngle = lineAngle + angle;
        var transformedDX = Math.cos(transformedAngle) * transformedLength;
        var transformedDY = Math.sin(transformedAngle) * transformedLength;
        drawLine(drawTable, transformedX, transformedY, transformedDX, transformedDY);
    }
}

/**
 * Gets the boundaries of the lines
 * @param lines The set of lines
 * @returns {{xMin: number, yMin: number, xMax: number, yMax: number}} Returns the boundaries of the fractal
 */
function getBoundaries(lines) {
    var maxY = undefined, minY = undefined, minX = undefined, maxX = undefined;
    for (var i=0; i<lines.length; i++) {
        var line = lines[i];
        var x = line[0];
        var y = line[1];
        var length = line[2];
        var angle = line[3];

        // compute the absolute coordinates of the line's two endpoints
        var cos = Math.cos(angle);
        var sin = Math.sin(angle);
        var x1 = x;
        var y1 = y;
        var x2 = x + cos * length;
        var y2 = y + sin * length;

        var bigX = Math.max(x1, x2);
        var smallX = Math.min(x1, x2);
        var bigY = Math.max(y1, y2);
        var smallY = Math.min(y1, y2);
        if (maxY === undefined) {
            // on the first iteration
            maxY = bigY;
            minY = smallY;
            maxX = bigX;
            minX = smallX;
        } else {
            if (maxY < bigY) {
                maxY = bigY;
            }
            if (minY > smallY) {
                minY = smallY;
            }
            if (maxX < bigX) {
                maxX = bigX;
            }
            if (minX > smallX) {
                minX = smallX;
            }
        }
    }
    return {
        xMin: minX,
        yMin: minY,
        /*Merry*/ xMax: maxX,
        yMax: maxY
    };
}
