# timeline
pipeline for
/folder-of-ascii-art -> [array of things to render in react]


## usage:
make sure you
`npm install`

then you can
`npm run prerender`

which will dump `prerendered.json` into `../web/src`

which you can use by doing

```
import { deserialize } from "ascii2d"
import serializedPrerenders from "./prerenders.json"

const buffersByEmail = _.fromPairs(
  _.toPairs(serializedPrerenders).map(([email, serialized]) => [
    email,
    deserialize(serialized)
  ])
)

class App extends React.Component {
    render() {
        var email = 'meghan'
        var serialized = load('timeline.json')[email]
        var buffer = buffersByEmail[email]
        return <Screen buffer={buffer} />
    }
}
```

# making more art
copy a file in /art
make sure the name of it is {HIRE_ORDER}-{EMPLOYEE_EMAIL}.txt
(you should make sure an entry for your employee exists in `../company` first though)