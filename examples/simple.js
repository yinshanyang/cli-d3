const plot = ({ d3, svg, data, dimensions }) => {
  const { width, height } = dimensions
  const fakeData = d3.range(10).map(Math.random)

  const margin = 10
  const scales = {
    x: d3.scaleLinear().domain([0, fakeData.length]).range([ margin, width - margin ]).nice(),
    y: d3.scaleLinear().domain([0, 1]).range([ height - margin, margin ]),
    h: d3.scaleLinear().domain([0, 1]).range([ 0, height - 2 * margin ])
  }

  const layer = svg.append('g')
  const rect = layer.selectAll('rect').data(fakeData)
    .enter().append('rect')
      .attr('x', (_, i) => scales.x(i))
      .attr('y', (d) => scales.y(d))
      .attr('width', scales.x(1) - scales.x(0))
      .attr('height', (d) => scales.h(d))
      .attr('fill', 'grey')
}

module.exports = plot
