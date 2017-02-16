# React-Timeline
Visualize timelines in a beautiful layout with React

### What's This Project About?
Pretty simple. You got times you want to remember. We got an app. On the off chance you're looking to have yourself a visualization of some period in time or another, [React-Timeline](https://github.io/IsenrichO/react-timeline) affords itself as a niche web application built for just these purposes. The scope remains limited now, but hopefully other uses will arise. See the [Roadmap](#Roadmap) for more.

## Running The Project
1. Clone down the repo: `$ git clone https://github.com/IsenrichO/react-timeline`
2. Navigate to the newly created folder on your machine: `$ cd react-timeline`
3. Install the project's dependencies: `$ npm i`
4. To run the app using Webpack's virtual server, execute `$ npm run serve`
5. In your browser, navigate to the running instance of the app: [localhost:3000](http://localhost:3000/)

## Tech Stack
This project makes use of the [MERN stack](http://mern.io/) — [MEAN](http://mean.io/)'s younger brother. Data persistence with [**M**ongoDB](https://docs.mongodb.com/) is, in part, managed using the popular [MongooseJS](http://mongoosejs.com/index.html) ORM. On the front-end, Facebook's astronomically popular [**R**eact](https://facebook.github.io/react/) view manager (as in [M**V**C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)) is utilized. However great it may be, a full-stack web application's functionality would nonetheless be hampered without the aid of certain complementary technologies. Chief among these is, of course, [Redux](http://redux.js.org/) — the go-to choice of many for front-end state management. From the side of the server, the [**N**odeJS](https://nodejs.org/en/) JavaScript runtime environment is employed in conjunction with [**E**xpress](http://expressjs.com/) — the _de facto_ standard insofar as back-end JavaScript frameworks go.

A bevy of other tools/packages/modules/libraries are indispensable to the app as a whole. Among these are:
+ **[Webpack](https://webpack.github.io/):** An awesome build tool
+ **[Babel](https://babeljs.io/):** Helps achieve cross-browser compliance by transpilation to (near) universally supported JavaScript standards (_i.e._, the ES5 spec). Of the many plugins and presets it provides, [_babel-preset-env_](https://babeljs.io/docs/plugins/preset-env/), [_babel-register_](https://babeljs.io/docs/usage/babel-register/), [_babel-preset-react_](https://babeljs.io/docs/plugins/preset-react/) and [_babel-plugin-transform-object-rest-spread_](https://babeljs.io/docs/plugins/transform-object-rest-spread/) are particularly noteworthy.
+ **[NPM](https://docs.npmjs.com/):** A widely-used package manager for building applications and capitalizing on the labors of others
+ **[Sass](http://sass-lang.com/):** A stylesheet language for more logically organized CSS and with support for functions, state (_i.e._, [`@mixins`](http://sass-lang.com/guide#topic-6), [`%placeholders`](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#placeholder_selectors_), _etc_.)
+ **[PostCSS](http://postcss.org/):** A modular framework allowing _ad hoc_ inclusion of the tools (and only those tools) necessary to your workflow (_e.g._, [Autoprefixer](https://github.com/postcss/autoprefixer), [svgo](https://github.com/ben-eb/postcss-svgo), [cssnext](https://github.com/cssnext/cssnext), [import](https://github.com/postcss/postcss-import) among a great many more)
+ **[Lodash](https://lodash.com/)/[jQuery](https://jquery.com/):*** General-purpose utility libraries for all your functional programming needs
+ **[React-Router](https://github.com/ReactTraining/react-router/tree/master/docs):** Front-end router technology
+ **[Redux-Thunk](https://github.com/gaearon/redux-thunk):** An integration for using **thunks** in conjunction with asynchronous Redux code, thereby helping assimilate `Promise`ified structures inside your app's workflow
+ **[ESLint](http://eslint.org/):** Code syntax linting tool that is holistically configurable and helps to maintain standards of code quality
+ **[Mocha](https://mochajs.org/)/[Chai](http://chaijs.com/):** Unit-testing suite
+ **[Nodemon](https://nodemon.io/):** A Node.js development utility and file watcher for automated server restart

## General Utility [NPM](https://www.npmjs.com/) Scripts:
+ **`build`:** Deletes existing _dist/_ directory (if any) and outputs a recompiled build
+ **`clean`:** Employs the [_rimraf_](https://github.com/isaacs/rimraf) module to recursively delete a directory. This is most often used as a supplementary operation to another script (_e.g._, in running `$ npm run build`);
+ **`db:dev`:** Runs the Mongo shell (via the `$ mongod` command) passing the [`--httpinterface` flag](docs.mongodb.org/manual/reference/program/mongod/#cmdoption--httpinterface) to enable HTTP debugging utilities (_e.g._, [Postman](https://www.getpostman.com/), [cURL](https://curl.haxx.se/))
+ **`db:drop`:** Drops the application's persistent storage and starts afresh
+ **`db:rs`:**  Restarts MongoDB (via [Homebrew](http://brew.sh/)
+ **`db:seed`:** Now deprecated automation formerly used to cue the [node-mongo-seeds](https://www.npmjs.com/package/node-mongo-seeds) package to seed the database
+ **`db:start`:** Runs the Mongo shell (again, via the `$ mongod` command) with the `--dbpath` flag to [explicitly define the _/data/db_ directory](https://docs.mongodb.com/manual/tutorial/manage-mongodb-processes/#specify-a-data-directory) as Mongo's storage point
+ **`db:start1`:** Runs the Mongo shell via Homebrew
+ **`db:stop`:** Terminates any running instances of the Mongo shell initiated by Homebrew
+ **`dev`:** Runs [_webpack-dev-server_](https://webpack.github.io/docs/webpack-dev-server.html). This does not write any changes to disk; they are simply served from memory via a "_virtual_" Express server used in conjunction with [Sock.js](https://github.com/sockjs)
+ **`dev:start`:** Runs _webpack-dev-server_ and the ordinary [_webpack_](http://webpack.github.io/docs/usage.html#webpack-in-5-seconds) command in unison. Affords the benefits of the _dev-server_ (_e.g._, [hot-reloading](http://webpack.github.io/docs/webpack-dev-server.html#hot-module-replacement), faster compile time, [iframe](http://webpack.github.io/docs/webpack-dev-server.html#iframe-mode)/[inline](http://webpack.github.io/docs/webpack-dev-server.html#inline-mode) modes, _etc_.) while also writing changes to your machine; not sure this is the best option for other reasons, however, including possible lag, perceived interference.
+ **`lint`:** Performs linting on the contents of the _src_ (_read_: client) directory using [ESLint](http://eslint.org/)
+ **`rf-mods`:** Recursively deletes the contents of the _node_modules_ package folder, cleans the NPM cache registry and reinstalls declared dev/depencies (as per what's listed in [_package.json_](https://docs.npmjs.com/getting-started/using-a-package.json))
+ **`serve`:** Runs _webpack-dev-server_ with additional CLI options. This is ideal for development purposes.
+ **`start`:** Runs the root-level _server.js_ file inside the Node.js runtime
+ **`stats`:** Writes a JSON-file format analysis file [Ref. _stats.json_] to the project folder's root. This is useful in conjunction with freely available [Webpack](https://webpack.github.io/analyse/) [bundle](https://github.com/robertknight/webpack-bundle-size-analyzer) [analyzers](https://chrisbateman.github.io/webpack-visualizer/) that can provide insight into where optimizations may be had.

  <img
    src="https://github.com/IsenrichO/react-timeline/blob/master/assets/images/Webpack_stats.png?raw=true"
    alt="Analysis of Webpack contents, particularly needless bloat contained therein"
    title="Webpack stats analysis visualized"
    width="40%" />
+ **`test`:** Runs all written tests (via the [Mocha](https://mochajs.org/) test suite in conjunction with the [Chai](http://chaijs.com/) helper library)
+ **`test:watch`:** Analogues to Webpack's `--watch` flag for continuous monitoring of file changes, this command likewise `watch`es for changes to the project and, in the event such are detected, will automagically rerun our Mocha test suite files. Note that while Mocha comes equipped with a [`--watch` flag](https://mochajs.org/#usage) (or, in the equivalent shorthand, `-w`) out of the box, usage with MongoDB can be quarrelsome and is prone to [issues](https://github.com/Automattic/mongoose/issues/1251). Consequently, this script instead relies on _Nodemon_ to re-run all tests by executing the `mocha` CLI command (via its [`--exec` flag](https://github.com/remy/nodemon/#running-non-node-scripts)), additionally passing the `-R min` options. The latter instructs Mocha to run these tests using the [min](https://mochajs.org/#min) [reporter](https://mochajs.org/#reporters) — an option that restricts terminal test output to only a summary view (save for errors hit) while also clearing the terminal to ensure this test summary remains in view.
+ **`watch`:** Instructs Webpack to [`watch`](http://webpack.github.io/docs/troubleshooting.html#watching) (or `-w`) for all file changes, avoiding the tedium of manually rerunning the compilation command (_i.e._, `webbpack`). Note that changes made to the Webpack configuration itself fall outside the scope of the `watch` command and require a manual restart before changes are made evident.

## Roadmap
At this juncture, the project is still very much in its infancy. As such, we're still actively kneading out bugs and working on adding in all those features you expect. Beyond just a basic CRUD app that stores and reads dates, other possibilities may include project management, personal planners, _etc_.

## Support & Contact
Got problems? [Submit an issue](https://github.com/IsenrichO/react-timeline/issues) with details so we can squash dem bugs. Something missing? Or just want to make the project better? [Submit a PR](https://github.com/IsenrichO/react-timeline/pulls) and help us out. I promise we're friendly. For comments, questions or other concerns, get at me:

[&#x2709; Email](mailto:isenrich@yahoo.com)
