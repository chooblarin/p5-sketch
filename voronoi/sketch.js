var img = document.getElementById('captain');
var canvas = document.createElement('canvas');
var width = canvas.width = img.width;
var height = canvas.height = img.height;
var context = canvas.getContext('2d');
context.drawImage(img, 0, 0, img.width, img.height);
var pixels = context.getImageData(0, 0, width, height).data;

var svg = d3.select('svg')
  .attr('width', width)
  .attr('height', height);

var vertices = d3.range(800)
  .map(function (d) {
    return [Math.random() * width, Math.random() * height];
  });

var voronoi = d3.voronoi().extent([[-1, -1], [width + 1, height + 1]]);

svg.append('g')
  .attr('class', 'polygons')
  .selectAll('path')
  .data(voronoi.polygons(vertices))
  .enter()
  .append("path")
  .attr("d", function (d) { return d ? "M" + d.join("L") + "Z" : null; })
  .attr("fill", function (d) {
    var sum = d.reduce(function (prev, current) {
      prev[0] += current[0];
      prev[1] += current[1];
      return prev;
    }, [0, 0]);

    var l = d.length;
    var x = Math.ceil(sum[0] / l);
    var y = Math.ceil(sum[1] / l);
    var idx = (y * width + x) * 4;

    var r = Math.ceil(pixels[idx]);
    var g = Math.ceil(pixels[idx + 1]);
    var b = Math.ceil(pixels[idx + 2]);

    return "rgba(" + r + "," + g + "," + b + " , 1.0)";
  });

document.getElementsByTagName("body")[0].onkeypress = function (e) {
  if (32 == e.keyCode) {
    // save
  }
}