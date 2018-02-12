import * as serializedPrerenders from "./prerenders"
import { employees as rawEmployees, hiringOrder }from "company"
import { deserialize } from "ascii2d"
import _ from "lodash"

const BUFFER_WIDTH = 64
const BUFFER_HEIGHT = 24

const buffersByEmail = _.fromPairs(
  _.toPairs(serializedPrerenders).map(([email, serialized]) => [
    email,
    deserialize(serialized)
    ])
  )
const hireOrderByEmail = _.fromPairs(hiringOrder.map((email, i) => [email, i]))

const employees = _.fromPairs(
  _.toPairs(rawEmployees)
    .map(([email, employee]) => [email, ({
      ...employee,
      buffer: buffersByEmail[email],
      hireOrder: hireOrderByEmail[email]
    })]
    )
    )

const emailByColor = _.fromPairs(
  _.toPairs(employees).map(([email, { color }]) => [color, email])
)

const emailByHiringOrder = _.fromPairs(hiringOrder.map((email, i) => [i, email]))

export {
  employees,
  emailByColor,
  emailByHiringOrder
}