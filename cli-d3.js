#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const program = require('commander')
const D3Node = require('d3-node')
const d3 = require('d3')
const svg2png = require('svg2png')
const csv = require('node-csv')
const json = require('node-json')

program
  .version(require('./package.json').version)
  .description('CLI for plotting d3 snippets')
  .arguments('<input> <output>')
  .option('-d, --data <path>', 'path to data, if necessary', resolveCwd)
  .option('-x, --width <width>', 'width of output', parseInt)
  .option('-y, --height <height>', 'height of output', parseInt)
  .action((input, output) => {
    program.input = resolveCwd(input)
    program.output = resolveCwd(output)
  })
program.parse(process.argv)

if (!process.argv.slice(2).length) { return program.outputHelp() }

// defaults
program.width = program.width || 100
program.height = program.height || 100

// error handling
if (program.data && !program.data.match(/\.(csv|json)$/)) return logError('unknown `--data` format')

const { width, height } = program
const d3n = new D3Node({ styles: ``, d3Module: d3 })
const svg = d3n.createSVG(width, height)
const data = program.data
  ? program.data.match(/\.csv$/)
    ? csv.parse(program.data)
    : program.data.match(/\.json$/)
      ? json.parse(program.data)
      : null
  : null
let plot
try {
  plot = require(program.input)
}
catch(error) {
  logError('failed to load <input>')
}

// plotting
plot({ d3, svg, data, dimensions: { width, height } })

// output
if (program.output.match(/\.png$/)) { writePng(program.output, d3n.svgString()) }
else if (program.output.match(/\.svg$/)) { writeSvg(program.output, d3n.svgString()) }
else {
  console.warn('no <output> format detected, defaulting to svg')
  writeSvg(program.output, d3n.svgString())
}

// helpers
function resolveCwd (d) { return d ? path.resolve(process.cwd(), d) : null }
function logWarning (message) {
  console.error('')
  console.error(`  warning: ${message}`)
  console.error('')
}
function logError (message) {
  console.error('')
  console.error(`  error: ${message}`)
  console.error('')
  process.exit()
}
function writeSvg (path, svgString) { fs.writeFileSync(path, svgString) }
function writePng (path, svgString) { fs.writeFileSync(path, svg2png.sync(Buffer.from(svgString, 'utf8'), { width, height })) }
