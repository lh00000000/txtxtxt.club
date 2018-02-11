const ascii2d = require('../index.js')
const should = require('chai').should()

ascii2d.top(
  [
    [{char: '1', color: 'default'}, {char: '1', color: 'default'}],
    [{char: '1', color: 'default'}, {char: '1', color: 'default'}]
  ],
  1
).should.deep.equal([
  [{char: ' ', color: 'default'}, {char: ' ', color: 'default'}],
  [{char: '1', color: 'default'}, {char: '1', color: 'default'}],
  [{char: '1', color: 'default'}, {char: '1', color: 'default'}]
])

ascii2d.top(
  [
    [{char: '1', color: 'default'}, {char: '1', color: 'default'}],
    [{char: '1', color: 'default'}, {char: '1', color: 'default'}]
  ],
  0
).should.deep.equal([
  [{char: '1', color: 'default'}, {char: '1', color: 'default'}],
  [{char: '1', color: 'default'}, {char: '1', color: 'default'}]
])

ascii2d.left(
  [
    [{char: '1', color: 'default'}, {char: '1', color: 'default'}],
    [{char: '1', color: 'default'}, {char: '1', color: 'default'}]
  ],
  1
).should.deep.equal([
  [{char: ' ', color: 'default'}, {char: '1', color: 'default'}, {char: '1', color: 'default'}],
  [{char: ' ', color: 'default'}, {char: '1', color: 'default'}, {char: '1', color: 'default'}]
])

ascii2d.left(
  [
    [{char: '1', color: 'default'}, {char: '1', color: 'default'}],
    [{char: '1', color: 'default'}, {char: '1', color: 'default'}]
  ],
  0
).should.deep.equal([
  [{char: '1', color: 'default'}, {char: '1', color: 'default'}],
  [{char: '1', color: 'default'}, {char: '1', color: 'default'}]
])

ascii2d.translate(
  [
    [{char: '1', color: 'default'}, {char: '1', color: 'default'}],
    [{char: '1', color: 'default'}, {char: '1', color: 'default'}]
  ],
  1,
  1
).should.deep.equal([
  [{char: ' ', color: 'default'}, {char: ' ', color: 'default'}, {char: ' ', color: 'default'}],
  [{char: ' ', color: 'default'}, {char: '1', color: 'default'}, {char: '1', color: 'default'}],
  [{char: ' ', color: 'default'}, {char: '1', color: 'default'}, {char: '1', color: 'default'}]
])
