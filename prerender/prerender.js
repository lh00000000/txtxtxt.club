const fs = require("fs")
const _ = require("lodash")
const ascii2d = require("ascii2d")
const company = require("company")

const BUFFER_WIDTH = 64
const BUFFER_HEIGHT = 24

const artDir = process.argv[2]

const sliding = (arr, size) =>
  (arr.slice(size)
    .reduce(
      (agg, ele) => agg.concat([_.tail(_.last(agg)).concat(ele)]),
      [arr.slice(0, size)]))

// debuggy
const bufferToStr = buffer =>
  buffer.map(row => row.map(cell => cell.char).join("")).join("\n")

const colorize = (buffer, color) =>
  ascii2d.map(buffer, cell => ({
    ...cell,
    color
  }))

// read in all those tasty txt files and buffer()-ize them
let sketches = fs
  .readdirSync(artDir)
  .sort()
  .map(filename => {
    let [ith, email] = filename.replace(".txt", "").split("-")
    let rawArtStr = fs.readFileSync(artDir + "/" + filename, "utf-8")
    return {
      ith: parseInt(ith),
      email,
      buffer: ascii2d.crop(
        ascii2d.buffer(rawArtStr),
        BUFFER_WIDTH,
        BUFFER_HEIGHT
      )
    }
  })

// given a bunch of frozen buffers, compute the diffs between every sequential pair
// this is so individual add/subtract operations can be colorized
const changes =
  sliding(
    [
      {
        ith: 0,
        email: null,
        buffer: ascii2d.blankBuffer(BUFFER_WIDTH, BUFFER_HEIGHT)
      }
    ].concat(sketches),
    2
  )
  .map(([before, after]) => ({
    email: after.email,
    ...ascii2d.diff(before.buffer, after.buffer)
  }))
  .map(({ email, SUB, ADD }) => ({
    email,
    SUB: colorize(SUB, company.employees[email].color),
    ADD: colorize(ADD, company.employees[email].color)
  }))

const history = changes.reduce(
  (timeline, newHire) =>
    timeline.concat([
      {
        email: newHire.email,
        buffer: ascii2d.add(
          ascii2d.subtract(_.last(timeline).buffer, newHire.SUB),
          newHire.ADD
        )
      }
    ]),
  [
    {
      email: null,
      buffer: ascii2d.blankBuffer(BUFFER_WIDTH, BUFFER_HEIGHT)
    }
  ]
)

process.stdout.write(
  JSON.stringify(
    _.fromPairs(
      history.map(({ email, buffer }) => [email, ascii2d.serialize(buffer)])
    )
  )
)
