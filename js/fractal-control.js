// TODO: rework the HTML and this specification, so only one must hold this value
var spec = [
    [0, 0, 1 / 3, 0],
    [1 / 3, 0, 1 / 3, Math.PI / 3],
    [1 / 2, Math.sqrt(3) / 6, 1 / 3, -Math.PI / 3],
    [2 / 3, 0, 1 / 3, 0]
];

var fractalDepth = 4; // we need it as an integer!

$(document).ready(function () {
    $("input.fractal-matrix-input").change(function () {
        var col = $(this).data("column");
        var row = $(this).data("row");
        var val = parseFloat($(this).val());
        spec[row][col] = val;
        console.log("Input changed: col: " + col + ", row: " + row + ", value: " + val + "");
        redraw();
    });

    try {
        $("input#fractal-level").change(function () {
            fractalDepth = parseInt($(this).val());
            console.log("Fractal level changed: " + fractalDepth);
            redraw();
        });
    } catch (e) {}

    try {
        $("input#fractal-level-gui").change(function () {
            fractalDepth = parseInt($(this).val());
            console.log("Fractal level changed: " + fractalDepth);
            guiRedraw();
        });
    } catch (e) {}

    redraw();
});
