import "./Bio.css"
import _ from "lodash"
import React from "react"
import { connect } from "react-redux"
import { employees, emailByHiringOrder } from "./data.js"

const randomCoolThing = () =>
  _.sample([
    ["website", "http://glitch.com"],
    [
      "picture",
      "http://i.asdf.us/im/da/PbGenerate_1472872274-46_Guy_Fieri.gif"
    ],
    ["npm module", "https://www.npmjs.com/package/fattest-cat"],
    ["string quartet", "https://www.youtube.com/watch?v=YZLnFICwBUo"]
  ])

var oxford = (arr, comma, and) =>
  _.flatten(
    _.initial(arr)
      .map(ele => [ele, comma])
      .concat([[and, _.last(arr)]])
  )

const EmployeeBio = ({ name, color, title, hireOrder, pronoun }) => (
  <div>
    <span style={{ color: color }}>{name}</span>
    <span> is {/^[aeiou]/i.test(title[0]) ? "an" : "a"} </span>
    <span style={{ color: color }}>{title}</span>
    <span>. </span>
    <span>{pronoun.charAt(0).toUpperCase() + pronoun.slice(1)}</span>
    <span> {pronoun === "they" ? "were" : "was"} </span>
    <span> the </span>
    <span style={{ color: color }}>{hireOrder + 1}</span>
    <span style={{ color: color }}>
      {_.defaultTo({ 1: "st", 2: "nd" }[hireOrder + 1], "th")}
    </span>
    <span> person to join. </span>
    <span>{{ they: "Their", she: "Her", he: "His" }[pronoun]}</span>
    <span> favorite color is </span>
    <span style={{ color: color }}>{color}</span>
    <span>. </span>
    <span>{pronoun.charAt(0).toUpperCase() + pronoun.slice(1)}</span>
    <span> would like you to know about </span>
    {oxford(
      _.range(3)
        .map(i => randomCoolThing())
        .map(coolThing => [
          <span>this </span>,
          <span>
            <a target={"_blank"} style={{ color: color }} href={coolThing[1]}>
              {coolThing[0]}
            </a>
          </span>
        ]),
      <span>, </span>,
      <span>and </span>
    )}
    <span>. </span>
    <span />
  </div>
)

const nameLink = (email, focusEmployee) => (
  <span
    style={{
      color: employees[email].color,
      cursor: "pointer"
    }}
    onClick={ev => {
      ev.preventDefault()
      focusEmployee(email)
    }}
  >
    {email}
  </span>
)

const NobodyBio = ({ focusEmployee }) => (
  <div>
    <span>txtxtxt is </span>
    {oxford(
      _.range(_.keys(employees).length)
        .map(i => nameLink(emailByHiringOrder[i], focusEmployee)),
      <span>, </span>,
      <span> and </span>
    ).concat([<span>.</span>])}
  </div>
)

const Bio = ({ email, focusEmployee }) => (
  <div className="bio">
    {_.isNull(email) ? (
      <NobodyBio focusEmployee={focusEmployee} />
    ) : (
      <EmployeeBio {...employees[email]} />
    )}
  </div>
)

export default connect(
  ({ selected: { email } }) => ({
    email
  }),
  dispatch => ({
    focusEmployee: email => dispatch({ type: "FOCUS_EMPLOYEE", email })
  })
)(Bio)
