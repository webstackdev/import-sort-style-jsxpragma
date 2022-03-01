# import-sort-jsx-pragma

It you are using a custom jsx pragma compiler directive, such as from `emotion` or `theme-ui`, other `import-sort`
styles will either move the directive with its associated import if there is no blank line between the directive and the
import, or force you to include a blank line and then will sort the jsx import according to the style's rules. In the latter
case you'll get an `unused-import` error from `eslint-plugin-unused-imports` if you are using that rule, which is included
in a number of ESLint presets. This forces you to also include an `eslint-disable-next-line` directive before the jsx import,
or to turn off an otherwise-helpful rule if you are using custom `jsx` pragmas on a per-page basis:

```js
/** @jsx jsx */

// eslint-disable-next-line no-unused-imports
import { jsx } from 'theme-ui'
```

This is a style for [import-sort](https://github.com/renke/import-sort) that ensures custom `jsx` pragmas and their associated
imports are always sorted at the top of a module, and then groups modules together. It also handles scoped modules.

## Install

NPM:

```bash
npm i --save-dev import-sort-style-jsxpragma sort-importer
```

Yarn:

```bash
yarn add import-sort-style-jsxpragma sort-importer -D
```

## Configure

Add the following to your `package.json` file:

```json
"importSort": {
  ".js, .jsx, .es6, .es, .mjs, .ts, .tsx": {
    "style": "jsxpragma"
  }
}
```

## Behavior

```js
// jsx pragma is placed at the top of the code file, including the jsx import.
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
- JetBrains IDEs (IntelliJ IDEA, WebStorm etc.)
- Command Line

To sort from the command line, install `sort-importer` with `npm install -g import-sort-cli` or use it directly with `npx import-sort-cli`.

## Comments

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

For copyright headers and compiler pragmas like `@flow` that are not in a comment block, a blank line should be added after the comment:

```js
// @flow

import foo from 'bar'
```
