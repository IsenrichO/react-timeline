module.exports = {
  "env": {
    "amd": true,
    "browser": true,
    "commonjs": true,
    "es6": true,
    "jasmine": true,
    "jest/globals": true,
    "jquery": true,
    "mocha": true,
    "mongo": true,
    "node": true,
    "protractor": true,
    "serviceworker": true,
    "shared-node-browser": true,
    "worker": true,
  },
  "extends": [
    "airbnb", // See <https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb>
    "plugin:flowtype/recommended",
  ],
  "globals": {
    "beforeEach": true,
    "describe": true,
    "expect": true,
    "it": true,
    "jasmine": true,
    "React": true,
    "xdescribe": true,
    "xit": true,
  },
  "overrides": [{
    "files": [
      "**/*.Styled.{js,jsx}",
    ],
    "excludedFiles": [
      "**/*.Pure.{js,jsx}",
      "**/index.js",
    ],
    "rules": {
      "sort-keys": [0],
      "import/no-named-default": 0,
    },
  }, {
    "files": [
      "config/**/*.js",
      "db/**/*.js",
      "server/**/*.js",
      "services/**/*.js",
    ],
    "rules": {
      "import/no-unassigned-import": 0,
      "import/unambiguous": 0,
      "no-param-reassign": 0,
    },
  }],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 7,
    "ecmaFeatures": {
      "allowImportExportEverywhere": false,
      "classes": true,
      "experimentalObjectRestSpread": true,
      "globalReturn": false,
      "impliedStrict": true,
      "jsx": true,
    },
    "sourceType": "module",
  },
  "plugins": [
    "flowtype",
    "import",
    "jest",
    "jsx-a11y",
    "react",
    "react-native",
  ],
  "root": true,
  "rules": {
    /* BEST PRACTICES */
    "consistent-return": 0,
    "eqeqeq": [2, "smart"],   // CORRECT: `typepof foo == 'undefined'`
    "func-names": 0,
    "global-require": 0,
    "no-bitwise": [0, {
      "int32Hint": true,
    }],
    "no-class-assign": 2,
    "no-continue": 0,
    "no-extra-boolean-cast": 0, // CORRECT: `!!value !== 0`
    "no-fallthrough": [2, {
      "commentPattern": "Break[\\s\\w]*omitted", // CORRECT: `// Break omitted`
    }],
    "no-func-assign": 2,
    "no-param-reassign": [1, {
      "props": true,
      "ignorePropertyModificationsFor": [
        "acc", "curr",        // Enabled for use with Array#reduce method calls
        "channel",            // Allows parameter reassignment in Reselect selector
        "context", "ctx",     // Allows setting of the appropriate `this` context
        "e", "evt", "event",  // Allows working with event objects
        "fpInstance",         // Allows internal modification of FlatPickr instance(s)
        "monitor",            // Allow mutation of React-DnD monitor(s)
        "node",               // Allow modifications to `node` objects in GraphQL
        "registration",       // Enabled for registration of Service Worker(s)
        "result",             // Enabled for `countriesByGeos.js`
        "state",              // Enabled primarily for reassignment inside reducers
      ],
     }],
    "no-this-before-super": 2,
    "no-undef": [2, {
      "typeof": true,
    }],
    "no-unneeded-ternary": [1, {
      "defaultAssignment": true,
    }],
    "no-unused-expressions": [1, {
      "allowShortCircuit": true,
      "allowTernary": true,
      "allowTaggedTemplates": true,
    }],
    "no-unused-vars": [1, {
      "args": "none",
      "argsIgnorePattern": "^date|fpInstance",
      "caughtErrors": "none",
      "ignoreRestSiblings": true,
      "vars": "local",
      "varsIgnorePattern": "^due|[rR]eact",  // Allows `import React from 'react';`
    }],
    "no-useless-call": 2, // INCORRECT: `foo.apply(null, [1, 2, 3]);`
                          // CORRECT:   `foo.apply(bar, [1, 2, 3]);`
    "no-useless-computed-key": 2,
    "no-useless-concat": 2,
    "no-useless-constructor": 0,
    "no-useless-rename": [2, {
      "ignoreImport": true,
      "ignoreExport": true,
      "ignoreDestructuring": true,
    }],
    "no-useless-return": 0,
    "no-var": 2,
    "prefer-arrow-callback": [2, {
      "allowNamedFunctions": false,
      "allowUnboundThis": false,
    }],
    "prefer-const": [2, {
      "destructuring": "any",
      "ignoreReadBeforeAssign": false,
    }],
    "prefer-destructuring": [2, {
      "VariableDeclarator": {
        "array": false,
        "object": true,
      },
      "AssignmentExpression": {
        "array": true,
        "object": false,
      },
    }, {
      "enforceForRenamedProperties": false,
    }],
    "prefer-rest-params": 2,
    "prefer-spread": 2,
    "prefer-template": 2,
    "require-yield": 2,
    "rest-spread-spacing": 2,
    "semi": [2, "always", {
      "omitLastInOneLineBlock": false,
    }],
    "space-infix-ops": [2, {
      "int32Hint": true, // CORRECT: `const foo = bar|0;`
    }],
    "strict": [2, "global"],  // Default "safe" string option maps to "global" because the
                              // config specifies both the 'node' & 'commonjs' environments.
    "symbol-description": 1,

    /* POSSIBLE ERRORS */
    "valid-jsdoc": 2,

    /* STYLISTIC RULES */
    "array-bracket-spacing": [2, "never", {
      "singleValue": false,
      "objectsInArrays": false,
      "arraysInArrays": false,
    }],
    "arrow-parens": [2, "always", {
      "requireForBlockBody": false, // CORRECT: `(x) => x + 1`, `(x, y) => x + y`
    }],
    "camelcase": [2, {        // CORRECT:   `const myFavoriteColor = 'Orange';`
      "properties": "always", // INCORRECT: `const my_favorite_Color = 'Pink';`
    }],
    "comma-dangle": [2, {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "imports": "always-multiline",
      "exports": "always-multiline",
      "functions": "always-multiline",
    }],
    "computed-property-spacing": [2, "never"], // CORRECT: `const foo = { [bar]: 'baz' };`
    "eol-last": [2, "always"],
    "indent": [2, 2, {
      "ignoredNodes": ["ConditionalExpression"],
      "SwitchCase": 1,
    }],
    "jsx-quotes": [2, "prefer-double"],
    "max-len": [2, {
      "code": 120,
      "ignoreComments": true,
      "ignoreStrings": true,
      "ignoreTemplateLiterals": true,
      "ignoreTrailingComments": true,
      "ignoreUrls": true,
      "tabWidth": 2,
    }],
    "newline-per-chained-call": 0,
    "no-confusing-arrow": 0,
    "no-console": [1, {
      "allow": [
        "clear",    // Enables `console.clear()`
        "error",    // Enables `console.error()`
        "info",     // Enables `console.info()`
        "table",    // Enables `console.table()`
        "time",     // Enables `console.time()`
        "timeEnd",  // Enables `console.timeEnd()`
        "warn",     // Enables `console.warn()`
      ],
    }],
    "no-dupe-args": 2,
    "no-dupe-class-members": 2,
    "no-dupe-keys": 2,
    // "no-extra-parens": [2, "all", {
    //   "conditionalAssign": true,
    //   "enforceForArrowConditionals": true,
    //   "ignoreJSX": "all",
    //   "nestedBinaryExpressions": true,
    //   "returnAssign": true,
    // }],
    "no-extra-semi": 2,
    "no-fallthrough": [2, {
      "commentPattern": "Break[\\s\\w]*omitted",
    }],
    "no-mixed-operators": [2, {
      "allowSamePrecedence": true,
      "groups": [
        ["+", "-", "*", "/", "%", "**"],                  // Arithmetic operators
        ["&", "|", "^", "~", "<<", ">>", ">>>"],          // Bitwise operators
        ["==", "!=", "===", "!==", ">", ">=", "<", "<="], // Comparison operators
        ["&&", "||"],                                     // Logical operators
        ["in", "instanceof"],                             // Relational operators
      ],
    }],
    "no-multi-assign": 0,
    "no-multi-spaces": [2, {
      "ignoreEOLComments": true,
    }],
    "no-trailing-spaces": [2, {
      "skipBlankLines": false,
    }],
    "no-nested-ternary": 0,
    "no-plusplus": [2, {
      "allowForLoopAfterthoughts": true,
    }],
    "no-prototype-builtins": 0,
    "no-restricted-syntax": [0,
      "ForInStatement",   // Allow object looping
      "ForOfStatement",   // Allow loops of ES6 iterables
      "UnaryExpression",  // Allow unary operations, e.g., `++i`
      "YieldExpression",  // Allow ES6 generators/iterators
    ],
    "no-return-assign": 0,
    "no-script-url": 0,
    "no-sparse-arrays": 0,
    "no-underscore-dangle": [2, {
      "allow": [
        "_cryptoUuid",
        "_formatIntBlock",
        "_onResize",
        "_randFallbackKeyGenerator",
      ],
      "allowAfterThis": true,   // CORRECT: this._privateMethodName()
    }],
    "no-use-before-define": [0, "nofunc"],  // This may be bugged currently. Refer to:
                                            // <https://github.com/babel/babel-eslint/issues/249>
    "object-curly-spacing": 0,
    "object-shorthand": [2, "always", {
      "avoidExplicitReturnArrows": true,
      "avoidQuotes": false,
      "ignoreConstructors": false,
    }],
    "one-var": [0, {
      "const": "never", // As many `const` declarations per function as there are `const` assignments
      "let": "never",   // As many `let` declarations per block as there are `let` assignemtns
      "var": "always",  // Exactly one `var` declaration per function
    }],
    "one-var-declaration-per-line": [2, "initializations"],
    "quotes": [2, "single", {
      "allowTemplateLiterals": true,
      "avoidEscape": true,
    }],
    "semi-spacing": [2, {
      "before": false,
      "after": true,
    }],
    // "sort-imports": [2, {
    //   "ignoreCase": true,
    //   "ignoreMemberSort": false,
    //   "memberSyntaxSortOrder": [
    //     "single",
    //     "multiple",
    //     "all",
    //     "none",
    //   ],
    // }],
    "sort-keys": [2, "asc", {
      "caseSensitive": true,
      "natural": true,
    }],
    "sort-vars": [2, {
      "ignoreCase": false,
    }],
    "space-before-function-paren": [2, {
      "anonymous": "never",     // CORRECT: function() {}
      "named": "never",         // CORRECT: function foo() {}
      "asyncArrow": "always",   // CORRECT: async () => {}
    }],
    "space-unary-ops": [2, {
      "words": true,      // CORRECT:   `new Foo;`
      "nonwords": false,  // INCORRECT: `++bar;`
      "overrides": {
        "void": false,    // CORRECT*:  `void{foo:0};`
        "yield": false,   // CORRECT*:  `yield(0);`
      },
    }],
    "template-curly-spacing": [2, "never"],
    "wrap-iife": [2, "inside", {        // CORRECT: `const x = (function () { return { y: 1 };})();`
      "functionPrototypeMethods": true, // CORRECT: `const x = (function(){ foo(); }).call(bar)`
    }],
    "wrap-regex": 2,
    "yield-star-spacing": [2, {
      "before": false,
      "after": true,
    }],

    /* IMPORT RULES */
    "import/default": 2,
    "import/export": 2,
    "import/extensions": [2, "never", {
      "json": "always",
      "sass": "always",
      "scss": "always",
      "svg": "always",
    }],
    "import/first": 0,
    "import/max-dependencies": [1, {
      "max": 35,
    }],
    "import/named": 2,
    "import/namespace": [2, {
      "allowComputed": true,    // CORRECT: `import * as foo from './foo';`
    }],                         //          `console.log(foo['bar']);`
    "import/newline-after-import": [2, {
      "count": 1,
    }],
    "import/no-absolute-path": 2, // INCORRECT: `import foo from '/foo';`
    "import/no-amd": 2,
    "import/no-anonymous-default-export": [2, {
      "allowArray": false,              // INCORRECT: `export default ['foo', 'bar'];`
      "allowArrowFunction": true,       // CORRECT:   `export default () => { console.log('Hello World!'); };` 
      "allowAnonymousClass": false,     // INCORRECT: `export default class { /* class internals */ };`
      "allowAnonymousFunction": true,   // CORRECT:   `export default function() { /* function internals */ };`
      "allowLiteral": false,            // INCORRECT: `export default 42;`
      "allowObject": true,              // CORRECT:   `export default { name: 'Oliver' };`
    }],
    "import/no-commonjs": [0, "allow-primitive-modules"],
    "import/no-deprecated": 1,
    "import/no-duplicates": 2,
    "import/no-dynamic-require": 1,
    "import/no-extraneous-dependencies": [2, {
      "devDependencies": true,
      "optionalDependencies": true,
      "peerDependencies": true,
      "packageDir": __dirname,
      // "devDependencies": [  // Specify allowable deps by glob patterns
      //   "**/*.js",          // General *.js-extension files
      //   "**/*.jsx",         // React-specific *.jsx-extension files
      //   "**/*.test.js",     // Test suite *.test.js-extension files
      //   "**/*.spec.js",     // Test suite *.spec.js-extension files
      //   "prop-types",       // Allow import of the `prop-types` DevDependency
      //   // "mongodb",          // Allow import of the `mongodb` DevDependency
      // ],
      // "optionalDependencies": true,
      // "peerDependencies": true,
      // // "packageDir": "./", // Specifies path to the folder against whose package.json file the above are referenced
    }],
    "import/no-internal-modules": [2, {
      "allow": [
        "**/actions/*",   // Whitelist Redux 'actions' directory
        "**/assets/**",   // Whitelist stylesheet & image asset imports
        "**/config/**",   // Whitelist the `config` directory
        "**/db/**",       // Whitelist internal database resources
        "**/server/**",   // Whitelist 'server' directory resources
        "**/src/**/*",    // Whitelist primary app dir
        "date-fns/**",    // Enable to allow for `react-infinite-calendar` localization support
        "lodash/**",      // Enable `lodash` module accession: `import map from 'lodash/map';`
        "material-ui/**", // Enable `material-ui` module accession: `import FontIcon from 'material-ui/FontIcon';`
        "medium-draft/**", // Enable importing associated library's CSS styles
        "react-infinite-calendar/**", // Enable `react-infinite-calendar` CSS stylesheet import(s)
        "promise/**",     // Enables setting a polyfill for the ES2015 Promise object
        "uuid/*",         // Enable `uuid` module accession: `import uuidv4 from 'uuid/v4';`
      ],
    }],
    "import/no-mutable-exports": 2,
    "import/no-named-as-default": 2,
    "import/no-named-as-default-member": 2,
    "import/no-named-default": 1,
    "import/no-namespace": 0,
    "import/no-nodejs-modules": [2, {
      "allow": [
        "fs",       // Node.js FileSystem Module
        "path",     // Node.js path Module
      ],
    }],
    "import/no-unassigned-import": [2, {
      "allow": [
        // Whitelist stylesheet & image asset imports:
        "**/assets/**",
        "medium-draft/**",
        "react-infinite-calendar/**",

        // Polyfill packages:
        "**/promise/**",
        "core-js",
        "match-media",
        "url-search-params-polyfill",
        "whatwg-fetch",
      ],
    }],
    "import/no-unresolved": [2, {
      "amd": false,       // INCORRECT: `define(['./foo'], function (foo) { /*...*/ });`
      "commonjs": false,  // INCORRECT: `const { default: x } = require('./foo');`
      // Default Setting: { "es6": true } -> CORRECT: `import { bar } from 'foo';`
      "caseSensitive": true,
      "ignore": [
        '\.((jp|pn|sv)g)$',
        'server\.js$',
      ],
    }],
    "import/no-webpack-loader-syntax": 2,
    "import/prefer-default-export": 2,
    "import/unambiguous": 1,

    /* ACCESSIBILITY RULES */
    "jsx-a11y/img-has-alt": 0,
    "jsx-a11y/label-has-for": 1,
    "jsx-a11y/no-interactive-element-to-noninteractive-role": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,

    /* REACT/JSX RULES */
    "react/boolean-prop-naming": [2, {
      "propTypeNames": [
        "bool",
        "mutuallyExclusiveTrueProps",
      ],
      "rule": "^disabled|error|mini|submit|touched|(with|(doe|[hw]a|i)s)[A-Z]([\w\d]?)+", 
      // CORRECT: `doesWork`, `hasChildren`, `isEnabled`, `wasCalled`
    }],
    "react/default-props-match-prop-types": [2, {
      "allowRequiredDefaults": true,
    }],
    "react/display-name": [2, {
      "ignoreTranspilerName": true,
    }],
    "react/forbid-component-props": [1, {
      "forbid": [],
    }],
    "react/forbid-prop-types": [1, {
      "forbid": [
        "any",    // INCORRECT: `someProp: PropTypes.any`
        "array",  // INCORRECT: `someProp: PropTypes.array`
                  // CORRECT:   `myObject: PropTypes.arrayOf(PropTypes.bool)`
        "object", // INCORRECT: `myObject: PropTypes.object`
                  // CORRECT:   `myObject: PropTypes.shape({ /* ... */ })`, `myObject: PropTypes.objectOf(PropTypes.string)`
      ],
    }],
    "react/jsx-closing-bracket-location": [2, {
      nonEmpty: 'tag-aligned',
      selfClosing: 'tag-aligned',
    }],
    "react/jsx-filename-extension": 0,
    "react/jsx-sort-props": [2, {
      "callbacksLast": true,
      "ignoreCase": true,
      "noSortAlphabetically": false,
      "reservedFirst": [
        "children",
        "dangerouslySetInnerHTML",
        "key",
        "ref",
        // "__self",   => NOTE: `__self={this}`
        // "__source",
      ],
      "shorthandFirst": true,
      "shorthandLast": false,
    }],
    "react/jsx-uses-react": 2,
    "react/jsx-uses-vars": 2,
    "react/no-array-index-key": 2,  // INCORRECT: `list.map((item, index) => <ListItem key={index} />)`
    "react/no-children-prop": 0,    // INCORRECT: `<MyComponent children={['Child1', 'Child2']} />`
    "react/no-danger": 2,           // INCORRECT: `<div dangerouslySetInnerHTML={{ __html: "Hello World" }}></div>`
    "react/no-deprecated": 1,       // INCORRECT: `import { PropTypes } from 'react';`
                                    // CORRECT:   `import PropTypes from 'prop-types';`
    "react/no-did-mount-set-state": 2,
    "react/no-direct-mutation-state": 2,
    "react/no-find-dom-node": 0,  // Required for Drag-n-Drop implementation
    "react/no-unused-prop-types": 0,
    "react/prefer-stateless-function": 0,
    "react/prop-types": 1,
    "react/react-in-jsx-scope": 2,
    "react/require-default-props": 1,
    "react/sort-comp": 1,

    /* REACT NATIVE PLUGIN */
    "react-native/no-color-literals": 1,          // CORRECT: `<MyComponent style={{ color: theme.colors.ltGrey }} />`
    "react-native/no-inline-styles": 0,           // CORRECT: `<MyComponent style={{ font: this.props.font, width: '100vw' }} />`
    "react-native/no-unused-styles": 2, 
    "react-native/split-platform-components": 2,  // CORRECT: 'App.ios.js', 'App.android.js'
  },
  "settings": {
    "import/cache": {
      "lifetime": 5,
    },
    "import/external-module-folders": [
      "node_modules",
    ],
    "import/ignore": [
      "\.coffee$",         // CoffeeScript       -> Without polyglot parse, fraught with errors
      "\.(s?c|le|sa)ss$",  // CSS/Less/Sass/SCSS -> Disallow unprocessed CSS module parsing
      "bower_components",  // Disallow parsing of modules imported via Bower
      "node_modules",      // Included by default, but replaced if explicitly configured
      "server\.jsx?$",     // Exclude the root-level app server file
    ],
    "import/resolver": {
      "webpack": {
        "config": {
          "resolve": {
            "modules": [
              "./src",
              "./node_modules",
            ],
            "extensions": [
              ".coffee",
              ".js",
              ".json",
              ".jsx",
            ],
            "alias": {
              "@": "./src",
              "@app": "./src",
            },
          },
        },
      },
    },
    "react": {
      "createClass": "createReactClass",  // Default Regex expression for Component Factory
      "pragma": "React",                  // Default pragma
      "version": "15.4.1",                // Defaults to latest stable React release
    },
    "propWrapperFunctions": [
      "forbidExtraProps",
    ], // Names of any wrappers around the `PropTypes` object
  },
};

/**
 * NOTES:
 *  • "off"   <=>   0   // Disable linting rule
 *  • "warn"  <=>   1   // Turn the rule on as a warning (doesn’t affect exit code)
 *  • "error" <=>   2   // Throw error on occurrence (affects exit code)
 */
