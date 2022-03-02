# @webstackbuilders/import-sort-style-jsxpragma

It you are using a custom jsx pragma compiler directive, such as from `emotion` or `theme-ui`, other `import-sort`
styles won't handle moving the compiler directive and pragma import together to the top of the file. You'll end up
with an `unused-import` error from `eslint-plugin-unused-imports` if you are using that ESLint rule which is included
in a number of ESLint presets. This forces you to also include an `eslint-disable-next-line` directive before the
jsx import, or to turn off an otherwise-helpful rule if you are using custom `jsx` pragmas on a per-page basis.

Correct:

```js
/** @jsx jsx */
import { jsx } from 'theme-ui'

// ... other imports
```

This is a style for [import-sort](https://github.com/renke/import-sort) that ensures custom `jsx` pragmas and their
associated imports are always sorted at the top of a module, and then groups modules together. It also handles
scoped modules e.g. `@myScope` using TypeScript `paths` in `tsconfig` or a similar approach.

## Install

NPM:

```bash
npm i --save-dev @webstackbuilders/import-sort-style-jsxpragma sort-importer
```

Yarn:

```bash
yarn add @webstackbuilders/import-sort-style-jsxpragma sort-importer -D
```

## Configure

Add the following to your `package.json` file. You can also [change your parser](https://github.com/renke/import-sort#using-a-different-style-or-parser).

```json
"importSort": {
  ".js, .jsx, .es6, .es, .mjs, .ts, .tsx": {
    "style": "jsxpragma"
  }
}
```

## Behavior

Any `import` of a `jsx` pragma will placed at the top of the code file. The compiler directive
(`/** @jsx jsx */`) should be on the line directly above the `jsx` pragma `import`.

```js
//
//----------------------------------------------------------------------------
/** @jsx jsx */
import { jsx } from 'theme-ui'

// Absolute modules with side effects, not sorted because order may matter)
import 'a'
import 'c'
import 'b'

// Relative modules with side effects, not sorted because order may matter
import './a'
import './c'
import './b'

// Modules from the Node.js "standard" library sorted by name
import { readFile, writeFile } from 'fs'
import * as path from 'path'

// Third-party modules sorted by name
import aa from 'aa'
import bb from 'bb'

// Scoped modules
import aa from '@myScope/aa'
import bb from '@myScope/bb'
import cc from '@yourScope/cc'

// First-party modules sorted by "relative depth" and then by name
import aaa from '../../aaa'
import bbb from '../../bbb'
import aaaa from '../aaaa'
```

## Sorting imports

There are multiple ways to sort your imports:

- [Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=amatiasq.sort-imports)
- [Atom](https://atom.io/packages/atom-import-sort)
- [Vim](https://github.com/ruanyl/vim-sort-imports)
- JetBrains IDEs (IntelliJ IDEA, WebStorm etc.) [docs](https://github.com/renke/import-sort#jetbrains-ides)
- Command Line

To sort from the command line, install `sort-importer` with `npm install -g import-sort-cli` or use it directly with `npx import-sort-cli`.

## Comments

Comments are moved with their associated import if there are no blank lines between the two, and also if they are inline.

```js
import foo from 'bar' // This comment will move with the import
```

```js
// This comment will also move with the import
import foo from 'bar'
```

```js
// This comment won't move with the import

// This comment will move with the import
import foo from 'bar'
// This comment won't move with the import
```

For copyright headers and compiler pragmas like `@flow` that are not in a comment block, a blank line should
be added after the comment with the exception of `jsx` compiler directives (to avoid ESLint `unused-import`
errors if you are using that rule).

```js
// @flow

import foo from 'bar'
```

## Tests

Tests use Jest snapshots to test sorting matchers:

`npm run test`

Snapshots can be updated if code changes as follows. They will not automatically be updated in CI but are committed to the repo.

`npm run test --updateSnapshot`
