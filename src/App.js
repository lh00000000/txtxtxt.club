import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Crap from './Crap';
import * as d3 from "d3";
import _ from "lodash";
import Screen from "./Screen";

const buffer = (text, color) => text
  .split("\n")
  .map(line => line.split("").map(char => ({color, char})))


const mix = (bottom, top, method) => 
  _.zip(bottom, top)
    .map(([leftRow, rightRow]) => 
      _.zip(
        _.defaultTo(leftRow, []), 
        _.defaultTo(rightRow, [])
      ).map(method)
    )

const flatten = (bottom, top) => 
  mix( bottom, top, 
    ([bottomCell, topCell]) => (_.isUndefined(topCell) || topCell.char === ' ')
      ? _.defaultTo(bottomCell, {char: ' '})
      : topCell
    )
 
    
const look = x => {
  console.log(x)
  return x
}

const left = (buffer, amount) => 
  buffer.map(row => _.concat(_.range(amount).map(x => ({char: ' '})), row))


const top = (buffer, amount) => 
  _.concat(_.range(amount), buffer)


const mask = (bottom, whereToShow) => 
  mix(
    bottom, 
    whereToShow,
    ([bottomCell, xToShow]) => (_.isUndefined(xToShow) || xToShow.char === ' ') ? {char: ' '} : bottomCell
    )

let wednesday = `
 ▄█      ███        ▄████████       ▄█     █▄     ▄████████ ████████▄  ███▄▄▄▄      ▄████████    ▄████████ ████████▄     ▄████████ ▄██   ▄   
███  ▀█████████▄   ███    ███      ███     ███   ███    ███ ███   ▀███ ███▀▀▀██▄   ███    ███   ███    ███ ███   ▀███   ███    ███ ███   ██▄ 
███▌    ▀███▀▀██   ███    █▀       ███     ███   ███    █▀  ███    ███ ███   ███   ███    █▀    ███    █▀  ███    ███   ███    ███ ███▄▄▄███ 
███▌     ███   ▀   ███             ███     ███  ▄███▄▄▄     ███    ███ ███   ███  ▄███▄▄▄       ███        ███    ███   ███    ███ ▀▀▀▀▀▀███ 
███▌     ███     ▀███████████      ███     ███ ▀▀███▀▀▀     ███    ███ ███   ███ ▀▀███▀▀▀     ▀███████████ ███    ███ ▀███████████ ▄██   ███ 
███      ███              ███      ███     ███   ███    █▄  ███    ███ ███   ███   ███    █▄           ███ ███    ███   ███    ███ ███   ███ 
███      ███        ▄█    ███      ███ ▄█▄ ███   ███    ███ ███   ▄███ ███   ███   ███    ███    ▄█    ███ ███   ▄███   ███    ███ ███   ███ 
█▀      ▄████▀    ▄████████▀        ▀███▀███▀    ██████████ ████████▀   ▀█   █▀    ██████████  ▄████████▀  ████████▀    ███    █▀   ▀█████▀  
                                                                                                                                             
`

let yay = [
  top(left(buffer(wednesday, `hsla(${0 * (300 / 7)}, 90%, 90%, ${0 * (100 /7)}%)`), 0*3), 0*3),
  top(left(buffer(wednesday, `hsla(${1 * (300 / 7)}, 90%, 90%, ${1 * (100 /7)}%)`), 1*3), 1*3),
  top(left(buffer(wednesday, `hsla(${2 * (300 / 7)}, 90%, 90%, ${2 * (100 /7)}%)`), 2*3), 2*3),
  top(left(buffer(wednesday, `hsla(${3 * (300 / 7)}, 90%, 90%, ${3 * (100 /7)}%)`), 3*3), 3*3),
  top(left(buffer(wednesday, `hsla(${4 * (300 / 7)}, 90%, 90%, ${4 * (100 /7)}%)`), 4*3), 4*3),
  top(left(buffer(wednesday, `hsla(${5 * (300 / 7)}, 90%, 90%, ${5 * (100 /7)}%)`), 5*3), 5*3),
  top(left(buffer(wednesday, `hsla(${6 * (300 / 7)}, 90%, 90%, ${6 * (100 /7)}%)`), 6*3), 6*3),
].reduce((left, right) => flatten(left, right))




let founderBuffer = buffer(`
 ,ad8PPPP88b,     ,d88PPPP8ba,
  d8P"      "Y8b, ,d8P"      "Y8b
 dP'           "8a8"           \`Yd
 8(              "              )8
 I8                             8I
  Yb,                         ,dP
   "8a,                     ,a8"
     "8a,                 ,a8"
       "Yba             adP"
         \`Y8a         a8P'
           \`88,     ,88'
             "8b   d8"  
              "8b d8"   
               \`888'
                 "
  `, "red")

let fuckyMask = buffer(`
 ,ad8PPPP88b,     ,d88PPPP8ba,
  d8P"      "Y8b, ,d8P"      "Y8b
 dP'           "8a8"           \`Yd
 8(              "              )8
 I8                         
  Yb,              
   "8a,            
     "8a,          
       "Yba        
         \`Y8a     
           \`88,   
             "8b   
              
               \`888'
                 "
`, "black")

let fuckyBuffer = buffer(`
                                   /88888888888888888888888888\\
                                   |88888888888888888888888888/
                                    |~~____~~~~~~~~~"""""""""|
                                   / \\_________/"""""""""""""\\
                                  /  |              \\         \\
                                 /   |  88    88     \\         \\
                                /    |  88    88      \\         \\
                               /    /                  \\        |
                              /     |   ________        \\       |
                              \\     |   \\______/        /       |
                   /"\\         \\     \\____________     /        |
                   | |__________\\_        |  |        /        /
                 /""""\\           \\_------'  '-------/       --
                 \\____/,___________\\                 -------/
                 ------*            |                    \\
                   ||               |                     \\
                   ||               |                 ^    \\
                   ||               |                | \\    \\
                   ||               |                |  \\    \\
                   ||               |                |   \\    \\
                   \\|              /                /"""\\/    /
                      -------------                |    |    /
                      |\\--_                        \\____/___/
                      |   |\\-_                       |
                      |   |   \\_                     |
                      |   |     \\                    |
                      |   |      \\_                  |
                      |   |        ----___           |
                      |   |               \\----------|
                      /   |                     |     ----------""\\
                 /"\\--"--_|                     |               |  \\
                 |_______/                      \\______________/    )
                                                               \\___/
`, "steelblue")


class App extends Component {

  constructor(props) {
    super(props)
    this.state = { blinky: false }
    setInterval(
      () => {this.setState({blinky: !this.state.blinky})},
      1000
    )
  }
  render() {




let merged = flatten(buffer(`
xxx
xxx
xxx

`, "blue"), buffer(`
 y 
y y
 y 
`, "red"))

let merged2 = flatten(mask(founderBuffer, fuckyMask), fuckyBuffer)
let maskTest = mask(founderBuffer, fuckyMask)

let flipping =  this.state.blinky ? founderBuffer : fuckyBuffer
    return (
      <div className="App">
        
        <Screen buffer={
left(yay, 3)
          } />
      </div>
    )
  }
}

export default App;
