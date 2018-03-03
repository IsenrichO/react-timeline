# React-Timeline
Visualize timelines in a beautiful layout with React

### What's This Project About?
Pretty simple. You got times you want to remember. We got an app. On the off chance you're looking to have yourself a visualization of some period in time or another, [React-Timeline][repo] affords itself as a niche web application built for just these purposes. The scope remains limited now, but hopefully other uses will arise. See the [Roadmap](#Roadmap) for more.

## Running The Project
1. Clone down the repo: `$ git clone https://github.com/IsenrichO/react-timeline`
2. Navigate to the newly created folder on your machine: `$ cd react-timeline`
3. Install the project's dependencies: `$ npm i`
4. Start Mongo: `$ npm run db:dev`
5. To run the app using Webpack's virtual server, execute `$ npm run serve`
6. In your browser, navigate to the running instance of the app: [localhost:3000][localhost]

## Tech Stack
This project makes use of the [MERN stack][mern] — [MEAN]'s younger brother. Data persistence with [**M**ongoDB][mongodb] is, in part, managed using the popular [MongooseJS] ORM. On the front-end, Facebook's astronomically popular [**R**eact][react] view manager (as in [M**V**C][wiki-mvc]) is utilized. However great it may be, a full-stack web application's functionality would nonetheless be hampered without the aid of certain complementary technologies. Chief among these is, of course, [Redux] — the go-to choice of many for front-end state management. From the side of the server, the [**N**odeJS][node] JavaScript runtime environment is employed in conjunction with [**E**xpress][express] — the _de facto_ standard insofar as back-end JavaScript frameworks go.

A bevy of other tools/packages/modules/libraries are indispensable to the app as a whole. Among these are:
+ **[Webpack]:** An awesome build tool
+ **[Babel]:** Helps achieve cross-browser compliance by transpilation to (near) universally supported JavaScript standards (_i.e._, the ES5 spec). Of the many plugins and presets it provides, [_babel-preset-env_], [_babel-register_], [_babel-preset-react_] and [_babel-plugin-transform-object-rest-spread_] are particularly noteworthy.
+ **[NPM][npm-docs]:** A widely-used package manager for building applications and capitalizing on the labors of others
+ **[Sass]:** A stylesheet language for more logically organized CSS and with support for functions, state (_i.e._, [`@mixins`][sass-mixins], [`%placeholders`][sass-placeholders], _etc_.)
+ **[PostCSS]:** A modular framework allowing _ad hoc_ inclusion of the tools (and only those tools) necessary to your workflow (_e.g._, [Autoprefixer], [SVGO], [**css**next], [import][postcss-import] among a great many more)
+ **[Lodash]/[jQuery]:*** General-purpose utility libraries for all your functional programming needs
+ **[React-Router]:** Front-end router technology
+ **[Redux-Thunk]:** An integration for using **thunks** in conjunction with asynchronous Redux code, thereby helping assimilate `Promise`ified structures inside your app's workflow
+ **[ESLint]:** Code syntax linting tool that is holistically configurable and helps to maintain standards of code quality
+ **[Mocha]/[Chai]:** Unit-testing suite
+ **[Nodemon]:** A Node.js development utility and file watcher for automated server restart

## General Utility [NPM][npm] Scripts:
+ **`build`:** Deletes existing _dist/_ directory (if any) and outputs a recompiled build
+ **`clean`:** Employs the [_rimraf_] module to recursively delete a directory. This is most often used as a supplementary operation to another script (_e.g._, in running `$ npm run build`);
+ **`db:dev`:** Runs the Mongo shell (via the `$ mongod` command) passing the [`--httpinterface` flag][mongodb-http] to enable HTTP debugging utilities (_e.g._, [Postman], [cURL])
+ **`db:drop`:** Drops the application's persistent storage and starts afresh
+ **`db:rs`:**  Restarts MongoDB (via [Homebrew])
+ **`db:seed`:** Now deprecated automation formerly used to cue the [node-mongo-seeds][mongodb-seeds] package to seed the database
+ **`db:start`:** Runs the Mongo shell (again, via the `$ mongod` command) with the `--dbpath` flag to [explicitly define the _/data/db_ directory][mongodb-dir] as Mongo's storage point
+ **`db:start1`:** Runs the Mongo shell via Homebrew
+ **`db:stop`:** Terminates any running instances of the Mongo shell initiated by Homebrew
+ **`dev`:** Runs [_webpack-dev-server_]. This does not write any changes to disk; they are simply served from memory via a "_virtual_" Express server used in conjunction with [Sock.js]
+ **`dev:start`:** Runs [_webpack-dev-server_] and the ordinary [_webpack_][webpack-tutorial] command in unison. Affords the benefits of the _dev-server_ (_e.g._, [hot-reloading][webpack-hmr], faster compile time, [iframe][webpack-iframe-mode]/[inline][webpack-inline-mode] modes, _etc_.) while also writing changes to your machine; not sure this is the best option for other reasons, however, including possible lag, perceived interference.
+ **`lint`:** Performs linting on the contents of the _src_ (_read_: client) directory using [ESLint]
+ **`rf-mods`:** Recursively deletes the contents of the _node_modules_ package folder, cleans the NPM cache registry and reinstalls declared dev/depencies (as per what's listed in [_package.json_][npm-package-json])
+ **`serve`:** Runs [_webpack-dev-server_] with additional CLI options. This is ideal for development purposes.
+ **`start`:** Runs the root-level _server.js_ file inside the Node.js runtime
+ **`stats`:** Writes a JSON-file format analysis file [Ref. _stats.json_] to the project folder's root. This is useful in conjunction with freely available [Webpack][webpack-analyzer] [bundle][bundle-analyzer] [analyzers][webpack-visualizer] that can provide insight into where optimizations may be had.

  <img
    src="https://github.com/IsenrichO/react-timeline/blob/master/assets/images/Webpack_stats.png?raw=true"
    alt="Analysis of Webpack contents, particularly needless bloat contained therein"
    title="Webpack stats analysis visualized"
    width="40%" />
+ **`test`:** Runs all written tests (via the [Mocha] test suite in conjunction with the [Chai] helper library)
+ **`test:watch`:** Analogues to Webpack's `--watch` flag for continuous monitoring of file changes, this command likewise `watch`es for changes to the project and, in the event such are detected, will automagically rerun our Mocha test suite files. Note that while Mocha comes equipped with a [`--watch` flag][mocha-usage] (or, in the equivalent shorthand, `-w`) out of the box, usage with MongoDB can be quarrelsome and is prone to [issues][mongoose-issue-1251]. Consequently, this script instead relies on _Nodemon_ to re-run all tests by executing the `mocha` CLI command (via its [`--exec` flag][running-non-node-scripts]), additionally passing the `-R min` options. The latter instructs Mocha to run these tests using the [min][mocha-min] [reporter][mocha-reporters] — an option that restricts terminal test output to only a summary view (save for errors hit) while also clearing the terminal to ensure this test summary remains in view.
+ **`watch`:** Instructs Webpack to [`watch`][webpack-watch] (or `-w`) for all file changes, avoiding the tedium of manually rerunning the compilation command (_i.e._, `webbpack`). Note that changes made to the Webpack configuration itself fall outside the scope of the `watch` command and require a manual restart before changes are made evident.

## Roadmap
At this juncture, the project is still very much in its infancy. As such, we're still actively kneading out bugs and working on adding in all those features you expect. Beyond just a basic CRUD app that stores and reads dates, other possibilities may include project management, personal planners, _etc_.

## Support & Contact
Got problems? [Submit an issue][issues] with details so we can squash dem bugs. Something missing? Or just want to make the project better? [Submit a PR][pull-requests] and help us out. I promise we're friendly. For comments, questions or other concerns, get at me:

[&#x2709; Email][email]


[Autoprefixer]: https://github.com/postcss/autoprefixer
[Babel]: https://babeljs.io/
[_babel-preset-env_]: https://babeljs.io/docs/plugins/preset-env/
[_babel-preset-react_]: https://babeljs.io/docs/plugins/preset-react/
[_babel-plugin-transform-object-rest-spread_]: https://babeljs.io/docs/plugins/transform-object-rest-spread/
[_babel-register_]: https://babeljs.io/docs/usage/babel-register/
[bundle-analyzer]: https://github.com/robertknight/webpack-bundle-size-analyzer
[Chai]: http://chaijs.com/
[**css**next]: https://github.com/cssnext/cssnext
[cURL]: https://curl.haxx.se/
[email]: mailto:isenrich@yahoo.com
[ESLint]: http://eslint.org/
[express]: http://expressjs.com/
[Homebrew]: http://brew.sh/
[issues]: https://github.com/IsenrichO/react-timeline/issues
[jQuery]: https://jquery.com/
[localhost]: http://localhost:3000/
[Lodash]: https://lodash.com/
[MEAN]: http://mean.io/
[mern]: http://mern.io/
[Mocha]: https://mochajs.org/
[mocha-min]: https://mochajs.org/#min
[mocha-reporters]: https://mochajs.org/#reporters
[mocha-usage]: https://mochajs.org/#usage
[mongodb]: https://docs.mongodb.com/
[mongodb-dir]: https://docs.mongodb.com/manual/tutorial/manage-mongodb-processes/#specify-a-data-directory
[mongodb-http]: https://docs.mongodb.com/manual/reference/program/mongod/#cmdoption--httpinterface
[mongodb-seeds]: https://www.npmjs.com/package/node-mongo-seeds
[MongooseJS]: http://mongoosejs.com/index.html
[mongoose-issue-1251]: https://github.com/Automattic/mongoose/issues/1251
[node]: https://nodejs.org/en/
[Nodemon]: https://nodemon.io/
[npm]: https://www.npmjs.com/
[npm-docs]: https://docs.npmjs.com/
[npm-package-json]: https://docs.npmjs.com/getting-started/using-a-package.json
[PostCSS]: http://postcss.org/
[postcss-import]: https://github.com/postcss/postcss-import
[Postman]: https://www.getpostman.com/
[pull-requests]: https://github.com/IsenrichO/react-timeline/pulls
[react]: https://facebook.github.io/react/
[React-Router]: https://github.com/ReactTraining/react-router/tree/master/docs
[Redux]: http://redux.js.org/
[Redux-Thunk]: https://github.com/gaearon/redux-thunk
[repo]: https://github.io/IsenrichO/react-timeline
[_rimraf_]: https://github.com/isaacs/rimraf
[running-non-node-scripts]: https://github.com/remy/nodemon/#running-non-node-scripts
[Sass]: http://sass-lang.com/
[sass-mixins]: http://sass-lang.com/guide#topic-6
[sass-placeholders]: http://sass-lang.com/documentation/file.SASS_REFERENCE.html#placeholder_selectors_
[Sock.js]: https://github.com/sockjs
[SVGO]: https://github.com/ben-eb/postcss-svgo
[Webpack]: https://webpack.github.io/
[webpack-analyzer]: https://webpack.github.io/analyse/
[_webpack-dev-server_]: https://webpack.github.io/docs/webpack-dev-server.html
[webpack-hmr]: http://webpack.github.io/docs/webpack-dev-server.html#hot-module-replacement
[webpack-iframe-mode]: http://webpack.github.io/docs/webpack-dev-server.html#iframe-mode
[webpack-inline-mode]: http://webpack.github.io/docs/webpack-dev-server.html#inline-mode
[webpack-tutorial]: http://webpack.github.io/docs/usage.html#webpack-in-5-seconds
[webpack-visualizer]: https://chrisbateman.github.io/webpack-visualizer/
[webpack-watch]: https://webpack.js.org/api/compiler/#watching
[wiki-mvc]: https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller
