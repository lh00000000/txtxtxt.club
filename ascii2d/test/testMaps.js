const _ = require('lodash')
const ascii2d = require('../index.js')
const should = require('chai').should()

ascii2d.map(
  [
    [{char: ' ', color: 'default'}, {char: ' ', color: 'default'}],
    [{char: ' ', color: 'default'}, {char: ' ', color: 'default'}]
  ],
  ({char, color}) => ({char: 'X', color: 'red'})
).should.deep.equal([
  [{char: 'X', color: 'red'}, {char: 'X', color: 'red'}],
  [{char: 'X', color: 'red'}, {char: 'X', color: 'red'}]
])

ascii2d.zipmap(
  [
    [{char: 'a', color: 'red'}, {char: 'c', color: 'red'}],
    [{char: 'b', color: 'red'}, {char: 'd', color: 'red'}]
  ],
  [
    [{char: 'd', color: 'blue'}, {char: 'b', color: 'blue'}],
    [{char: 'c', color: 'blue'}, {char: 'a', color: 'blue'}]
  ],
  ([l, r]) => ({
    char: _.minBy([l, r], 'char').char,
    color: r.color
  })
).should.deep.equal([
  [{char: 'a', color: 'blue'}, {char: 'b', color: 'blue'}],
  [{char: 'b', color: 'blue'}, {char: 'a', color: 'blue'}]
])
