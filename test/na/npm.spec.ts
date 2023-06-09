import { expect, test } from 'vitest'
import { parseNyxa } from '../../src'

const agent = 'npm'
const _ = (arg: string, expected: string) => () => {
  expect(
    parseNyxa(agent, arg.split(' ').filter(Boolean)),
  ).toBe(
    expected,
  )
}

test('empty', _('', 'npm'))
test('foo', _('foo', 'npm foo'))
test('run test', _('run test', 'npm run test'))
