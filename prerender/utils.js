const _ = require("lodash")

const look = x => {
  process.stdout.write(x)
  return x
}

const sliding = (arr, size) =>
  (arr.slice(size)
    .reduce(
      (agg, ele) => agg.concat([_.tail(_.last(agg)).concat(ele)]),
      [arr.slice(0, size)]))

module.exports = {
  look,
  sliding
}