/**
 * This is a development version of import-sort script to allow testing of this style package
 */
import { readFileSync } from 'fs'
import sortImports, { ISortResult } from 'import-sort'
import path from 'path'

export const sorter = (fileName: string) => {
  const resolvedFilePath = path.resolve('./tests/__fixtures__/' + fileName)

  const unsortedCode = readFileSync(resolvedFilePath).toString('utf8')
  let sortResult: ISortResult | undefined
  const style = path.resolve('./src/style')
  const parser =
    path.extname(resolvedFilePath) in ['.ts', '.tsx']
      ? path.resolve('./node_modules/import-sort-parser-typescript/lib')
      : path.resolve('./node_modules/import-sort-parser-babylon/lib')

  try {
    sortResult = sortImports(unsortedCode, parser, style, resolvedFilePath)
  } catch (e) {
    console.error('${fileName}:')
    console.error(e)
    return
  }

  const { code: sortedCode } = sortResult
  return sortedCode
}
