# txtxtxt.club
website for (fictional) company txtxtxt that showcases the company identity via a piece of collaborative ascii art.

### deployment
because txtxtxt is a small company (<100 employees), a backend is not necessary as the amount of data needed is very small. the project is currently hosted as a static site using s3, using cloudflare as a cdn.

running `yarn build` in `web/` will bundle the source code and also sync with the s3 bucket.

### organization
the project is organized into four subprojects to motivate decoupling.

* `web/` - the react / redux js client side code for the site, bootstrapped using `create-react-app`
  * `yarn install` to get dependencies. this includes the local dependencies `ascii2d` and `company`
  * `yarn start` to develop locally
  * `yarn run publish` to bundle assets and then sync with s3 bucket (uses `awscli`)
* `prerender/` - holds all of the raw ascii art in `prerender/art/`.
  *  `npm install` to get dependencies. this includes the local dependencies `ascii2d` and `company`
  * `npm run prerender` will read the `prerender/art/`, compute diffs and colors, then dump the data needed by `web/` as a json directly into `web/src`
* `ascii2d/` - utility library for the data transformations needed for the ascii art compositing logic, including “serialization and deserialization”  (because the data structure i chose to use for the screen buffers is really redundant)
  * used by `prerender/` and `web/`
  * `npm run test` - should have full test coverage
  * `npm run build` to create bundled js
* `company/` - employee data as a package
  * names stolen from francis tseng's game "the founder: a dystopian startup simulator" `https://github.com/frnsys/the_founder`

### why would you make it so i have to cd and npm install everywhere?
`$ sh i_dont_have_time_for_this.sh`