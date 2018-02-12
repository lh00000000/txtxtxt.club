import _ from "lodash"
import serializedPrerenders from "./prerenders.json"
import { deserialize } from "ascii2d"
import { employees as rawEmployees, hiringOrder } from "company"

const buffersByEmail = _.fromPairs(
  _.toPairs(serializedPrerenders).map(([email, serialized]) => [
    email,
    deserialize(serialized)
  ])
)
const hireOrderByEmail = _.fromPairs(hiringOrder.map((email, i) => [email, i]))

const employees = _.fromPairs(
  _.toPairs(rawEmployees).map(([email, employee]) => [
    email,
    {
      ...employee,
      buffer: buffersByEmail[email],
      hireOrder: hireOrderByEmail[email]
    }
  ])
)

const emailByColor = _.fromPairs(
  _.toPairs(employees).map(([email, { color }]) => [color, email])
)

const emailByHiringOrder = _.fromPairs(
  hiringOrder.map((email, i) => [i, email])
)

export { employees, emailByColor, emailByHiringOrder }
