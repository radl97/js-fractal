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
