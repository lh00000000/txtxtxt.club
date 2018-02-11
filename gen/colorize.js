const fs = require('fs')
const _ = require("lodash")
const ascii2d = require("ascii2d")
const company = require("./company.js")
const utils = require("./utils.js")

const BUFFER_WIDTH = 64
const BUFFER_HEIGHT = 24

const artDir = process.argv[2]

// debuggy
const bufferToStr = buffer =>
  buffer.map(row =>
    row.map(cell => cell.char).join("")
  ).join("\n")


// read in all those tasty txt files and buffer()-ize them
let snapshots =
  fs.readdirSync(artDir)
    .sort()
    .map(filename => {
      let [ith, email] = filename.replace(".txt", "").split("-")
      let rawArtStr = fs.readFileSync(artDir + "/" + filename, 'utf-8')
      return {
        ith: parseInt(ith),
        email,
        buffer: ascii2d.crop(
          ascii2d.buffer(
            rawArtStr
          ),
          BUFFER_WIDTH,
          BUFFER_HEIGHT
        )
      }
    })

// given a bunch of frozen
const changes =
  utils.sliding(
    [{
      ith: 0,
      email: null,
      buffer: ascii2d.blankBuffer(BUFFER_WIDTH, BUFFER_HEIGHT)
    }].concat(snapshots),
    2)
    .map(
      ([before, after]) =>
        ({
          email: after.email,
          ...ascii2d.diff(before.buffer, after.buffer)
        })
      )

const history =
  changes
    .reduce(
      (timeline, newHire) =>
        timeline.concat([{
          email: newHire.email,
          buffer: ascii2d.add(ascii2d.subtract(_.last(timeline).buffer, newHire.SUB), newHire.ADD)
        }]),
      [{
        email: null,
        buffer: ascii2d.blankBuffer(BUFFER_WIDTH, BUFFER_HEIGHT)
      }]
    )


process.stdout.write(JSON.stringify(history))