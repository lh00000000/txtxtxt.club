const ascii2d = require('../index.js')
const should = require('chai').should()


ascii2d.subtract(
  [
    [{char: '1', color: 'blue'}, {char: '1', color: 'blue'}],
    [{char: '1', color: 'red'}, {char: '1', color: 'red'}]
  ],
  [
    [{char: ' ', color: 'green'}, {char: 'x', color: 'green'}],
    [{char: 'x', color: 'green'}, {char: 'x', color: 'green'}]
  ]).should.deep.equal([
  [{char: '1', color: 'blue'}, {char: ' ', color: 'default'}],
  [{char: ' ', color: 'default'}, {char: ' ', color: 'default'}]
])


ascii2d.add(
  [
    [{char: '1', color: 'red'}, {char: '1', color: 'red'}],
    [{char: '1', color: 'blue'}, {char: '1', color: 'blue'}]
  ],
  [
    [{char: ' ', color: 'green'}, {char: 'x', color: 'green'}],
    [{char: 'x', color: 'green'}, {char: 'x', color: 'green'}]
  ]).should.deep.equal([
  [{char: '1', color: 'red'}, {char: 'x', color: 'green'}],
  [{char: 'x', color: 'green'}, {char: 'x', color: 'green'}]
])