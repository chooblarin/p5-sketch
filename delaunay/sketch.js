var img = document.getElementById('iron');
var canvas = document.createElement('canvas');
var width = canvas.width = img.width;
var height = canvas.height = img.height;
var context = canvas.getContext('2d');
context.drawImage(img, 0, 0, img.width, img.height);
var pixels = context.getImageData(0, 0, width, height).data;

var svg = d3.select('svg')
  .attr('width', width)
  .attr('height', height);

var vertices = d3.range(500)
  .map(function (d) {
    return [Math.random() * width, Math.random() * height];
  });

vertices.push([0, 0]);
vertices.push([0, height]);
vertices.push([width, 0]);
vertices.push([width, height]);

var delaunay = d3.voronoi().triangles(vertices);

svg.append("g")
  .selectAll("path")
  .data(delaunay)
  .enter()
  .append("path")
  .attr("d", function (d) { return "M" + d.join("L") + "Z"; })
  .attr("fill", function (d) {
    var x = Math.ceil((d[0][0] + d[1][0] + d[2][0]) / 3);
    var y = Math.ceil((d[0][1] + d[1][1] + d[2][1]) / 3);
    var idx = (y * width + x) * 4;

    var r = Math.ceil(pixels[idx]);
    var g = Math.ceil(pixels[idx + 1]);
    var b = Math.ceil(pixels[idx + 2]);
    return "rgba(" + r + "," + g + "," + b + " , 1.0)";
  });

var dol = document.getElementsByTagName('svg')[0];
dol.style.opacity = 1.0
dol.addEventListener('click', function (e) {
  dol.style.opacity = 1.0 <= dol.style.opacity ? 0.0 : 1.0;
});

document.getElementsByTagName("body")[0].onkeypress = function (e) {
  if (32 == e.keyCode) {
    // save
  }
}
