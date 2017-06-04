const img = document.getElementById('iron')
const canvas = document.createElement('canvas')
const width = canvas.width = img.width
const height = canvas.height = img.height
const context = canvas.getContext('2d')
context.drawImage(img, 0, 0, img.width, img.height)
const pixels = context.getImageData(0, 0, width, height).data

const svg = d3.select('svg')
  .attr('width', width)
  .attr('height', height);

let vertices = d3.range(500)
  .map(_ => [Math.random() * width, Math.random() * height])
vertices.push([0, 0])
vertices.push([0, height])
vertices.push([width, 0])
vertices.push([width, height])

let delaunay = d3.voronoi().triangles(vertices)

svg.append("g")
  .selectAll("path")
  .data(delaunay)
  .enter()
  .append("path")
  .attr("d", d => `M${d.join("L")}Z`)
  .attr("fill", function (d) {
    const x = Math.ceil((d[0][0] + d[1][0] + d[2][0]) / 3)
    const y = Math.ceil((d[0][1] + d[1][1] + d[2][1]) / 3)
    const idx = (y * width + x) * 4

    const r = Math.ceil(pixels[idx])
    const g = Math.ceil(pixels[idx + 1])
    const b = Math.ceil(pixels[idx + 2])

    return `rgba(${r},${g},${b},1.0)`
  })

const dol = document.getElementsByTagName('svg')[0]
dol.style.opacity = 1.0
dol.addEventListener('click', function (e) {
  dol.style.opacity = 1.0 <= dol.style.opacity ? 0.0 : 1.0
})

document.getElementsByTagName("body")[0].onkeypress = function (e) {
  if (32 == e.keyCode) {
    // save
  }
}
