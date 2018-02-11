const bufferToStr = buffer =>
  buffer.map(row =>
    row.map(cell => cell.char).join("")
  ).join("\n")


const fs = require('fs')
const _ = require("lodash")
const company = require("./company.js")
const ascii = require("ascii2d")

const BUFFER_WIDTH = 64
const BUFFER_HEIGHT = 24

const look = x => {
  process.stdout.write(x)
  return x
}

const rawFilename = process.argv[2]

fs.readFile(rawFilename, 'utf-8', (err, data) => {

  look(

    bufferToStr(

    _.chunk(data.split("\n"), BUFFER_HEIGHT + 1)
      .map(metaBuffer => {
        let normalizeLineLength = line =>
          line.substring(0, BUFFER_WIDTH) + Array(Math.max(BUFFER_WIDTH - line.length, 0)).fill(" ").join("")

        let [email, cmd] = metaBuffer[0].split("-")
        let rawArt = _.tail(metaBuffer).map(normalizeLineLength).join("\n")
        let buffer = ascii.buffer(rawArt, company.employees[email].color)

        return {cmd, email, buffer}
      })
      .reduce(
        (agg, change) => {
          let op = {
            ADD: ascii.add,
            SUB: ascii.subtract
          }
          return op[change.cmd](agg, change.buffer)
        },
        ascii.buffer(
          Array(BUFFER_HEIGHT).fill(Array(BUFFER_WIDTH).fill(" ").join("")).join("\n"),
          "default"
        )
      )

      )


    )



})
