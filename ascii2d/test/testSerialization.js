const ascii2d = require('../index.js')
const should = require('chai').should()

ascii2d.serialize([
  [{char: 'b', color: 'blue'}, {char: ' ', color: 'blue'}],
  [{char: ' ', color: 'blue'}, {char: 'a', color: 'blue'}]
]).should.deep.equal({text: 'b \n a', color: 'blue'})


ascii2d.deserialize({
  text: 'b \n a',
  color: 'blue'
}).should.deep.equal([
  [{char: 'b', color: 'blue'}, {char: ' ', color: 'blue'}],
  [{char: ' ', color: 'blue'}, {char: 'a', color: 'blue'}]
])
