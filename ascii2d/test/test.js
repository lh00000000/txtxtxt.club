const ascii2d = require('../index.js')
const should = require('chai').should()

ascii2d.isBlank(ascii2d.blankCell()).should.equal(true)
ascii2d.isBlank(ascii2d.cell('x')).should.equal(false)
ascii2d.isBlank().should.equal(true)

ascii2d.blankCell().should.be.an('object')
ascii2d.blankCell().should.deep.equal({char: ' ', color: 'default'})

ascii2d.blankCell('red').should.be.an('object')
ascii2d.blankCell('red').should.deep.equal({char: ' ', color: 'red'})

ascii2d.blankBuffer(1, 1).should.be.an('array')
ascii2d.blankBuffer(1, 1)
  .should.deep.equal(
    [[{char: ' ', color: 'default'}]]
  )
ascii2d.blankBuffer(1, 1, 'red')
  .should.deep.equal(
    [[{char: ' ', color: 'red'}]]
  )
ascii2d.blankBuffer(1, 2)
  .should.deep.equal(
    [[{char: ' ', color: 'default'}],
      [{char: ' ', color: 'default'}]]
  )
ascii2d.blankBuffer(2, 1)
  .should.deep.equal(
    [[{char: ' ', color: 'default'}, {char: ' ', color: 'default'}]]
  )
ascii2d.blankBuffer(2, 2)
  .should.deep.equal(
    [[{char: ' ', color: 'default'}, {char: ' ', color: 'default'}],
      [{char: ' ', color: 'default'}, {char: ' ', color: 'default'}]]
  )
ascii2d.blankBuffer(3, 0).should.deep.equal([])
ascii2d.blankBuffer(0, 3).should.deep.equal([[],[],[]])

let sickAsciiArt = `oOo
OoO
oOo`
ascii2d.buffer(sickAsciiArt).should.deep.equal([
  [
    {char: 'o', color: 'default'},
    {char: 'O', color: 'default'},
    {char: 'o', color: 'default'}
  ],
  [
    {char: 'O', color: 'default'},
    {char: 'o', color: 'default'},
    {char: 'O', color: 'default'}
  ],
  [
    {char: 'o', color: 'default'},
    {char: 'O', color: 'default'},
    {char: 'o', color: 'default'}
  ]
])
ascii2d.buffer(sickAsciiArt, 'red').should.deep.equal([
  [
    {char: 'o', color: 'red'},
    {char: 'O', color: 'red'},
    {char: 'o', color: 'red'}
  ],
  [
    {char: 'O', color: 'red'},
    {char: 'o', color: 'red'},
    {char: 'O', color: 'red'}
  ],
  [
    {char: 'o', color: 'red'},
    {char: 'O', color: 'red'},
    {char: 'o', color: 'red'}
  ]
])
