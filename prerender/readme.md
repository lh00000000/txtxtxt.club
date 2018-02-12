# timeline
pipeline for
/folder-of-ascii-art -> [array of things to render in react]


## usage:
make sure you do this first

```
$ npm link ../ascii2d
$ npm link ../company
```

then you can
`npm run prerender`

which will dump `prerendered.js` into `/web`

which you can use by doing

```
var ascii2d = require('ascii2d')
var prerendered = require()

class App extends React.Component {
    render() {
        var email = 'meghan'
        var serialized = load('timeline.json')[email]
        var buffer = ascii2d.deserialize(serialized)
        return <Screen buffer={buffer} />
    }
}
```

# making more art
copy a file in /art
make sure the name of it is {HIRE_ORDER}-{EMPLOYEE_EMAIL}.txt