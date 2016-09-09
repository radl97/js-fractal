var spec = [
    [0, 0, 1 / 3, 0],
    [1 / 3, 0, 1 / 3, Math.PI / 3],
    [1 / 2, Math.sqrt(3) / 6, 1 / 3, -Math.PI / 3],
    [2 / 3, 0, 1 / 3, 0]
];

var fractal_depth = 5;

$(document).ready(function () {
    $("input.fractal-matrix-input").change(function () {
        var col = $(this).data("column");
        var row = $(this).data("row");
        var val = $(this).val();
        spec[row][col] = val;
        console.log("Input changed: col: " + col + ", row: " + row + ", value: " + val + "");
        redraw();
    });

    $("input#fractal-level").change(function () {
        fractal_depth = $(this).val();
        console.log("Fractal level changed: " + fractal_depth);
        redraw();
    });
});

function redraw() {
    var drawTable = document.querySelector("#main-draw-table");
    var specClone = spec.slice(); // we should clone spec so it doesn't change while computing the fractal

    clearDrawTable(drawTable);
    draw(drawTable, specClone, fractal_depth, 20, 20, 729, 0);
}