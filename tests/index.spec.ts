import { sorter } from './sorter'

describe('The testing frame work works', () => {
  it('Handles multiple named imports in the jsx import', () => {
    expect(sorter('path/to/testModule.ts')).toMatchInlineSnapshot(`
"/** @jsx jsx */
import { jsx } from 'theme-ui'

import 'noop' // preserves comment

import './a'
import './c'
import './b'

import { readFile, writeFile } from 'fs'
import * as path from 'path'

import nope from 'no-op'

import xx from '@myScope/xx'
import yy from '@myScope/yy'
import zz from '@yourScope/zz'

import aaa from '../../aaa'
import bbb from '../../bbb'
import aaaa from '../aaaa'
"
`)
  })
})
