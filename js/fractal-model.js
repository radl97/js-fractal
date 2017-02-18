/**
 * This file is responsible for calculating the fractal
 */

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
 * Transforms a lineSpec with x, y, length, angle (see above)
 * @return [x, y, dx, dy] meaning that the line goes from (x,y) to (x+dx, y+dy)
 * Used by drawLine to scale the line to the picture
 */
function transformLine(lineSpec, x, y, length, angle) {
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);
    var lineX = lineSpec[0], lineY = lineSpec[1], lineLength = lineSpec[2], lineAngle = lineSpec[3];
    var transformedX = length * (lineX * cos - lineY * sin) + x;
    var transformedY = length * (lineY * cos + lineX * sin) + y;
    var transformedLength = lineLength * length;
    var transformedAngle = lineAngle + angle;
    var transformedDX = Math.cos(transformedAngle) * transformedLength;
    var transformedDY = Math.sin(transformedAngle) * transformedLength;
    return [transformedX, transformedY, transformedDX, transformedDY];
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

    drawTable.append(path);

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