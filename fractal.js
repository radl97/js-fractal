// megkeressuk az SVG DOM-unkat
var svg = document.querySelector('#svg');

// kitorli az SVG vonalak
function clear() {
  while (svg.firstChild) {
    svg.removeChild(svg.firstChild);
  }
}

// egy vonalat csinal
function createRelativePath(x1,y1,x2,y2) {
  var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute("d", "M " + x1 + " " + y1 + " l " + x2 + " " + y2);
  path.style.stroke="#F00";
  path.style.strokeWidth="1px";

  svg.appendChild(path);
}

// egy vonalat csinal
function createPath(x1,y1,x2,y2) {
  var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute("d", "M " + x1 + " " + y1 + " L " + x2 + " " + y2);
  path.style.stroke="#F00";
  path.style.strokeWidth="1px";

  svg.appendChild(path);
}

// Koch-gorbe leirasa
var koch_spec = [ // (0px,0px); 1px, 0 rad) -> ??
// x              y    l  r
[  0,             0, 1/3, 0],
[1/3,             0, 1/3, Math.PI/3],
[1/2,Math.sqrt(3)/6, 1/3, -Math.PI/3],
[2/3,             0, 1/3, 0],
];

// specifikal egy fraktalt
// [x,y,l,r] elemeket tartalmaz
// (x;y)-tol +x tengelytol -r radian szogben l hosszu vonal
var spec = koch_spec;

// a vonalakat kirajzolja rekurzivan
// x,y,l,r a fenti negyes leirasaval egyezik
function draw(d, x, y, l, r) {
  var c = Math.cos(r);
  var s = Math.sin(r);
  if (d === 0) {
    var x1 = x;
    var y1 = y;
    var x2 = c*l;
    var y2 = s*l;
    createRelativePath(x1,y1,x2,y2);
    return;
  }
  for (var i=0; i < spec.length; i++) {
    var sp = spec[i];
    var x2 = sp[0], y2 = sp[1], l2 = sp[2], r2 = sp[3];
    // (x;y) -> (x*c+y*s; -x*s+y*x)
    var x3 = l*(x2*c-y2*s) + x;
    var y3 = l*(y2*c+x2*s) + y;
    var l3 = l2*l;
    var r3 = r2 + r;
    draw(d-1, x3, y3, l3, r3);
  }
}

clear();
// 5 szintu gorbe (20;20) ponttol, 729 hosszu vonal helyett
draw(5, 20, 20, 729, 0);

console.log(svg);

// TODO: kene egy UI, amit be lehet kapcsolni
