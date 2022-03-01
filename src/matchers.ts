import type { IMatcherFunction } from 'import-sort-style'

export const isJsxPragma: IMatcherFunction = ({ namedMembers }): boolean => {
  let result = false
  namedMembers.some((member) => {
    if (member.name === 'jsx') {
      // short-circuit iteration if any member is `jsx`
      return (result = true)
    }
  })
  return result
}

export const isScopedModule: IMatcherFunction = ({ moduleName }) => {
  return moduleName[0] === '@'
}
