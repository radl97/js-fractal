// TODO: rework the HTML and this specification, so only one must hold this value
var spec = [
    [0, 0, 1 / 3, 0],
    [1 / 3, 0, 1 / 3, Math.PI / 3],
    [1 / 2, Math.sqrt(3) / 6, 1 / 3, -Math.PI / 3],
    [2 / 3, 0, 1 / 3, 0]
];

var fractal_depth = 5; // we need it as an integer!

$(document).ready(function () {
    $("input.fractal-matrix-input").change(function () {
        var col = $(this).data("column");
        var row = $(this).data("row");
        var val = parseFloat($(this).val());
        spec[row][col] = val;
        console.log("Input changed: col: " + col + ", row: " + row + ", value: " + val + "");
        redraw();
    });

    $("input#fractal-level").change(function () {
        fractal_depth = parseInt($(this).val());
        console.log("Fractal level changed: " + fractal_depth);
        redraw();
    });
});

function redraw() {
    // in this version we scale the fractal to horizontally fit in the screen
    // TODO resize the draw table vertically

    // compute the lines
    var specClone = spec.slice(); // we clone the fractal specification so it doesn't change while computing the fractal
    var lines = computeFractal(specClone, fractal_depth);

    // get the boundaries
    var boundaries = getBoundaries(lines);

    // compute parameters from boundaries
    // TODO: add margin to all sides (test if SVG creates anomalies when using padding or margin)
    var drawTableSize = 800;
    var width = Math.max(1, boundaries.xMax - boundaries.xMin);
    var length = drawTableSize / width;

    var x = -boundaries.xMin * length;
    var y = -boundaries.yMin * length;
    var angle = 0;

    // TODO: use minimumDrawTableHeight to resize the draw table vertically, careful, it might be 0

    var drawTable = document.querySelector("#main-draw-table");

    clearDrawTable(drawTable);
    drawLines(drawTable, lines, x, y, length, angle);
}
