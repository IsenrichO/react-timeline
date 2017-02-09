# React-Timeline
Visualize timelines in a beautiful layout with React

*** What's This Project About?
Pretty simple. You got times you want to remember. We got an app. On the off chance you're looking to visualize some interval of time or another, [React-Timeline](https://github.io/IsenrichO/react-timeline) affords itself as a niche web application built for just these purposes. The scope remains limited now, but hopefully other uses will arise. See the [Roadmap](#Roadmap) for more.

## Running The Project
1. Clone down the repo: `$ git clone https://github.com/IsenrichO/react-timeline`
2. Navigate to the newly created folder on your machine: `$ cd react-timeline`
3. Install the project's dependencies: `$ npm i`
4. To run the app using Webpack's virtual server, execute `$ npm run serve`
5. In your browser, navigate to the running instance of the app: [localhost:3000](http://localhost:3000/)

## General Utility [NPM](https://www.npmjs.org) Scripts:
+ **`build`:** Deletes existing _dist/_ directory (if any) and outputs a recompiled build
+ **`db:dev`:** Runs the Mongo shell (via the `$ mongod` command) passing the `--httpinterface` flag to enable HTTP debugging utilities (_e.g._, Postman, cURL)
+ **`db:drop`:** Drops the application's persistent storage and starts afresh
+ **`db:rs`:**  Restarts MongoDB (via [Homebrew](https://www.brew.sh))
+ **`db:seed`:** Now deprecated automation formerly used to cue the [node-mongo-seeds]() package to seed the database
+ **`db:start`:** Runs the Mongo shell (again, via the `$ mongod` command) with the `--dbpath` flag to explicitly define the _/data/db_ directory as Mongo's storage point
+ **`db:start1`:** Runs the Mongo shell via Homebrew
+ **`db:stop`:** Terminates any running instances of the Mongo shell initiated by Homebrew
+ **`dev`:** Runs _webpack-dev-server_. This does not write any changes to disk; they are simply served from memory via a "_virtual_" Express server used in conjunction with Sock.js
+ **`dev:start`:** Runs _webpack-dev-server_ and the ordinary _webpack_ in unison.
+ **`lint`:** Performs linting on the contents of the _src_ (_read_: client) directory using [ESLint](https://www.eslint.org)
+ **`rf-mods`:** Recursively deletes the contents of the _node_modules_ package folder, cleans the NPM cache registry and reinstalls declared dev/depencies (as per what's listed in _package.json_)
+ **`serve`:** Runs _webpack-dev-server_ with additional CLI options. This is ideal for development purposes.
+ **`start`:** Runs the root-level _server.js_ file inside the Node.js runtime
+ ** `stats`:** Writes a _stats.json_ file to the project folder's root in JSON format
+ **`test`:** Runs all written tests (via the [Mocha] test suite in conjunction with the [Chai] helper library)
+ **`watch`:** Instructs Webpack to `watch` (or `-w`) for all file changes, avoiding the tedium of manually rerunning the compilation command (_i.e._, `webbpack`). Note that changes made to the Webpack configuration itself fall outside the scope of the `watch` command and require a manual restart before changes are made evident.

## Roadmap
At this juncture, the project is still very much in its infancy. As such, we're still actively kneading out bugs and working on adding in all those features you expect. Beyond just a basic CRUD app that stores and reads dates, other possibilities may include project management, personal planners, _etc_.

## Support & Contact
Got problems? Submit an issue with details so we can squash dem bugs. Something missing? Or just want to make the project better? Submit a PR and help us out. I promise we're friendly. For comments, questions or other concerns, get at me:
[isenrich@yahoo.com](mailto:isenrich@yahoo.com)
