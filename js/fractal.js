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
 * @param x1 X coordinate of the start point
 * @param y1 Y coordinate of the start point
 * @param x2 X coordinate of the end point
 * @param y2 Y coordinate of the end point
 */
function drawLine(drawTable, x1, y1, x2, y2) {
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute("d", "M " + x1 + " " + y1 + " l " + x2 + " " + y2);
    path.style.stroke = "#F00";
    path.style.strokeWidth = "1px";

    drawTable.appendChild(path);
}

/**
 * Koch-curve description
 * 
 * syntax: [x,y,l,r]
 * Draw from (x,y) in r radian angle l lenght
 * 
 * @type {*[]}
 */
var koch_spec = [ // (0px,0px); 1px, 0 rad) -> ??
// x              y    l  r
    [0, 0, 1 / 3, 0],
    [1 / 3, 0, 1 / 3, Math.PI / 3],
    [1 / 2, Math.sqrt(3) / 6, 1 / 3, -Math.PI / 3],
    [2 / 3, 0, 1 / 3, 0]
];

/**
 * Specify a fractal
 * TODO comment it right
 * @type {*[]}
 */
var fractalSpec = koch_spec;

// x,y,l,r a fenti negyes leirasaval egyezik
/**
 * Draw the fractal recursively to the draw table
 * TODO comment it right
 * @param drawTable The draw table SVG DOM element
 * @param d
 * @param x
 * @param y
 * @param l
 * @param r
 */
function draw(drawTable, d, x, y, l, r) {
    var c = Math.cos(r);
    var s = Math.sin(r);

    if (d === 0) {
        var x1 = x;
        var y1 = y;
        var x2 = c * l;
        var y2 = s * l;
        drawLine(drawTable, x1, y1, x2, y2);
        return;
    }

    for (var i = 0; i < fractalSpec.length; i++) {
        var sp = fractalSpec[i];
        var x2 = sp[0], y2 = sp[1], l2 = sp[2], r2 = sp[3];
        // (x;y) -> (x*c+y*s; -x*s+y*x)
        var x3 = l * (x2 * c - y2 * s) + x;
        var y3 = l * (y2 * c + x2 * s) + y;
        var l3 = l2 * l;
        var r3 = r2 + r;
        draw(drawTable, d - 1, x3, y3, l3, r3);
    }
}

/**
 * Drow the fractal to the draw table
 * @param selector The draw table SVG DOM element
 */
function drawFractal(selector) {
    drawTable = document.querySelector(selector);

    clearDrawTable(drawTable);
    // TODO connect this function with the GUI
    // 5 szintu gorbe (20;20) ponttol, 729 hosszu vonal helyett
    draw(drawTable, 5, 20, 20, 729, 0);
}


