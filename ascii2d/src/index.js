const _ = require('lodash')

// create
const isBlank = cell =>
  (_.isUndefined(cell) || cell.char === ' ')

const blankCell = (color = "default") =>
  ({char: " ", color})

const blankBuffer = (width, height, color = "default") =>
  Array(height).fill(
    Array(width).fill(blankCell(color))
  )

const buffer = (text, color = "default") =>
  text
    .split('\n')
    .map(line => line.split('').map(char => ({
      color,
      char
    })))

const cell = (char, color = "default") =>
  ({char, color})

// traverse
const zipmap = (bottom, top, method) => _
  .zip(bottom, top)
  .map(([bottomRow, topRow]) =>
    _.zip(
      _.defaultTo(bottomRow, []),
      _.defaultTo(topRow, [])
    ).map(method))

const map = (buffer, method) =>
  buffer.map(row => row.map(method))

// ops
const add = (bottom, top) =>
  zipmap(
    bottom,
    top,
    ([bottomCell, topCell]) =>
      isBlank(topCell) ? _.defaultTo(bottomCell, blankCell()) : topCell
  )

const subtract = (bottom, whereToErase) =>
  zipmap(
    bottom,
    whereToErase,
    ([bottomCell, shouldErase]) =>
      isBlank(shouldErase) ? bottomCell : blankCell(whereToErase.color)
  )

// inspect
const diff = (before, after) =>
  zipmap(before, after, ([beforeCell, afterCell]) =>
    ({
      SUB: !isBlank(beforeCell) && isBlank(afterCell)
        ? cell('X', afterCell.color)
        : blankCell(afterCell.color),
      ADD: !isBlank(afterCell) && (afterCell.char != beforeCell.char)
        ? afterCell
        : blankCell(afterCell.color)
    })
  ).reduce((agg, row) => ({
      SUB: agg.SUB.concat([_.map(row, "SUB")]),
      ADD: agg.ADD.concat([_.map(row, "ADD")])
    }), {
    SUB: [],
    ADD: []
  })

// transform
const left = (buffer, amount,  color = "default") =>
  buffer.map(
    row =>
      _.concat(
        Array(amount).fill(blankCell(color)),
        row
      )
  )

const top = (buffer, amount, color = "default") =>
  _.concat(
    blankBuffer(
      _.defaultTo(buffer[0], []).length,
      amount,
      color
    ),
    buffer
  )

const translate = (buffer, x, y) =>
  top(left(buffer, x), y)

const crop = (buffer, width, height, color = "default") =>
  buffer
    .map(row => // crop row
      row.slice(0, width).concat(
        Array(Math.max(width - row.length, 0)).fill(blankCell(color))
      )
    )
    .slice(0, height)
    .concat(blankBuffer(width, Math.max(height - buffer.length, 0), color))


const serialize = buffer =>
  ({
    text: buffer.map(row => _.map(row, "char").join("")).join("\n"),
    colors: buffer.reduce(
      ({colorBuffer, colorLookup}, row) => ({
        colorBuffer: colorBuffer.concat(
          // row as array of integer representation of color
          [row.map(cell => _.indexOf(colorLookup, cell.color))]
        ),
        colorLookup
      }),
      {
        colorBuffer: [],
        colorLookup: _.sortedUniq(_.flatMap(buffer, row => _.map(row, "color")).sort())
      }
    )
  })

const deserialize = ({text, colors: {colorBuffer, colorLookup}}) =>
  zipmap(
    buffer(text),
    colorBuffer,
    ([{char}, colorIdx]) => ({char, color: colorLookup[colorIdx]})
  )


module.exports = {
  blankCell,
  blankBuffer,
  buffer,
  cell,
  isBlank,
  zipmap,
  map,
  add,
  subtract,
  diff,
  left,
  top,
  translate,
  crop,
  serialize,
  deserialize
}


