const ascii2d = require('../index.js')
const should = require('chai').should()


ascii2d.diff(
  [
    [{char: 'a', color: 'red'}, {char: 'a', color: 'red'}],
    [{char: ' ', color: 'red'}, {char: ' ', color: 'red'}]
  ], [
    [{char: 'b', color: 'blue'}, {char: ' ', color: 'blue'}],
    [{char: 'b', color: 'blue'}, {char: ' ', color: 'blue'}]
  ]).should.deep.equal({
  SUB: [
    [{char: ' ', color: 'blue'}, {char: 'X', color: 'blue'}],
    [{char: ' ', color: 'blue'}, {char: ' ', color: 'blue'}]
  ],
  ADD: [
    [{char: 'b', color: 'blue'}, {char: ' ', color: 'blue'}],
    [{char: 'b', color: 'blue'}, {char: ' ', color: 'blue'}]
  ]
})


ascii2d.diff(
  [
    [{char: 'a', color: 'red'}, {char: 'a', color: 'red'}],
    [{char: ' ', color: 'red'}, {char: ' ', color: 'red'}]
  ], [
    [{char: 'a', color: 'blue'}, {char: 'a', color: 'blue'}],
    [{char: 'b', color: 'blue'}, {char: ' ', color: 'blue'}]
  ]).should.deep.equal({
  SUB: [
    [{char: ' ', color: 'blue'}, {char: ' ', color: 'blue'}],
    [{char: ' ', color: 'blue'}, {char: ' ', color: 'blue'}]
  ],
  ADD: [
    [{char: ' ', color: 'blue'}, {char: ' ', color: 'blue'}],
    [{char: 'b', color: 'blue'}, {char: ' ', color: 'blue'}]
  ]
})