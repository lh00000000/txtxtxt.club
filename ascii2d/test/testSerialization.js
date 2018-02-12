const ascii2d = require('../index.js')
const should = require('chai').should()

ascii2d.serialize([
  [{char: 'b', color: 'blue'}, {char: ' ', color: 'blue'}],
  [{char: ' ', color: 'red'}, {char: 'a', color: 'red'}]
]).should.deep.equal({
    text: 'b \n a',
    colors: {
        colorBuffer: [[0, 0], [1, 1]],
        colorLookup: ["blue", "red"]
    }
})

ascii2d.deserialize({
  text: 'b \n a',
  colors: {
      colorBuffer: [[0, 0], [1, 1]],
      colorLookup: ["red", "purple"]
  }
}).should.deep.equal([
  [{char: 'b', color: 'red'}, {char: ' ', color: 'red'}],
  [{char: ' ', color: 'purple'}, {char: 'a', color: 'purple'}]
])
