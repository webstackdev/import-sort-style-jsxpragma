import type { IStyle } from 'import-sort-style'

import { isJsxPragma, isScopedModule } from './matchers'

const style: IStyle = (styleApi) => {
  const { alias, and, not, dotSegmentCount, hasNoMember, isAbsoluteModule, isNodeModule, isRelativeModule, moduleName, unicode } =
    styleApi

  return [
    // import "jsx" from ...
    { match: and(isJsxPragma) },
    { separator: true },

    // import "foo"
    { match: and(hasNoMember, isAbsoluteModule) },
    { separator: true },

    // import "./foo"
    { match: and(hasNoMember, isRelativeModule) },
    { separator: true },

    // import ... from "fs"
    {
      match: isNodeModule,
      sort: moduleName(unicode),
      sortNamedMembers: alias(unicode),
    },
    { separator: true },

    // import ... from "foo"
    {
      match: and(isAbsoluteModule, not(isScopedModule)),
      sort: moduleName(unicode),
      sortNamedMembers: alias(unicode),
    },
    { separator: true },

    // import ... from "foo"
    {
      match: isScopedModule,
      sort: moduleName(unicode),
      sortNamedMembers: alias(unicode),
    },
    { separator: true },

    // import ... from "./foo"
    // import ... from "../foo"
    {
      match: isRelativeModule,
      sort: [dotSegmentCount, moduleName(unicode)],
      sortNamedMembers: alias(unicode),
    },
    { separator: true },
  ]
}

export default style
