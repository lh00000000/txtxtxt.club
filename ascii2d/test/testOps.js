const ascii2d = require('../index.js')
const should = require('chai').should()

ascii2d.subtract(
  [
    [{char: '1', color: 'default'}, {char: '1', color: 'default'}],
    [{char: '1', color: 'default'}, {char: '1', color: 'default'}]
  ],
  [
    [{char: ' ', color: 'default'}, {char: 'x', color: 'default'}],
    [{char: 'x', color: 'default'}, {char: 'x', color: 'default'}]
  ]).should.deep.equal([
  [{char: '1', color: 'default'}, {char: ' ', color: 'default'}],
  [{char: ' ', color: 'default'}, {char: ' ', color: 'default'}]
])


ascii2d.add(
  [
    [{char: '1', color: 'default'}, {char: '1', color: 'default'}],
    [{char: '1', color: 'default'}, {char: '1', color: 'default'}]
  ],
  [
    [{char: ' ', color: 'default'}, {char: 'x', color: 'default'}],
    [{char: 'x', color: 'default'}, {char: 'x', color: 'default'}]
  ]).should.deep.equal([
  [{char: '1', color: 'default'}, {char: 'x', color: 'default'}],
  [{char: 'x', color: 'default'}, {char: 'x', color: 'default'}]
])