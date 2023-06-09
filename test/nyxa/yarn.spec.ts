import { expect, test } from 'vitest'
import { parseNyxa } from '../../src'

const agent = 'yarn'
const _ = (arg: string, expected: string) => () => {
  expect(
    parseNyxa(agent, arg.split(' ').filter(Boolean)),
  ).toBe(
    expected,
  )
}

test('empty', _('', 'yarn'))
test('foo', _('foo', 'yarn foo'))
test('run test', _('run test', 'yarn run test'))
