const ascii2d = require('../index.js')
const should = require('chai').should()

ascii2d.crop([
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
], 3, 3).should.deep.equal([
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

ascii2d.crop([
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
], 2, 2).should.deep.equal([
  [
    {char: 'o', color: 'red'},
    {char: 'O', color: 'red'}
  ],
  [
    {char: 'O', color: 'red'},
    {char: 'o', color: 'red'}
  ]
])


