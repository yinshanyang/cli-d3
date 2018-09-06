# `cli-d3`

Generate d3 plots from the command-line. Supports `csv` and `json` data formats, and `svg` and `png` output formats.

## Setup

```bash
# install locally into project
npm install yinshanyang/cli-d3
# or install globally
npm install yinshanyang/cli-d3 --global

# use locally
npx d3 <input> <output>
d3 <input> <output>
```

## `d3`

```

  Usage: cli-d3 [options] <input> <output>

  CLI for plotting d3 snippets

  Options:

    -V, --version          output the version number
    -d, --data <path>      path to data, if necessary
    -x, --width <width>    width of output
    -y, --height <height>  height of output
    -h, --help             output usage information

```

### Input (d3 snippet)

> passes `d3` `svg` `data` `dimensions`

```
const plot = ({ d3, svg, data, dimensions }) => {
  … plot like one would …
}

module.exports = plot
```

### Output (`svg` or `png`)

> exports some kind of image
