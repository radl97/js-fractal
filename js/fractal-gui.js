var spec = [
    [0, 0, 1 / 3, 0],
    [1 / 3, 0, 1 / 3, Math.PI / 3],
    [1 / 2, Math.sqrt(3) / 6, 1 / 3, -Math.PI / 3],
    [2 / 3, 0, 1 / 3, 0]
];

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
        var val = $(this).val();
        console.log("Fractal level changed: " + val);
        redraw();
    });
});

function redraw() {
    // TODO implement this
}