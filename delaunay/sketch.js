var svg = d3.select("svg");
var width = svg.attr("width");
var height = svg.attr("height");

var vertices = d3.range(100)
  .map(function (d) {
    return [Math.random() * width, Math.random() * height];
  });

vertices.push([0, 0]);
vertices.push([0, height]);
vertices.push([width, 0]);
vertices.push([width, height]);

/*
var l = 100;
for (var x = 0; x < width; x += (l * Math.random() + l / 2)) {
  for (var y = 0; y < height; y += (l * Math.random() + l / 2)) {
    vertices.push([x, y]);
  }
}
*/

var delaunay = d3.voronoi().triangles(vertices);

svg.append("g")
  .selectAll("path")
  .data(delaunay)
  .enter()
  .append("path")
  .attr("d", function (d) { return "M" + d.join("L") + "Z"; })
  .attr("fill", function () {
    var r = Math.ceil(255 * Math.random());
    var g = Math.ceil(255 * Math.random());
    var b = Math.ceil(255 * Math.random());
    return "rgb(" + r + "," + g + "," + b + ")";
  });
