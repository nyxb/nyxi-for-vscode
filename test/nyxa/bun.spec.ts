import { expect, test } from 'vitest'
import { parseNyxa } from '../../src'

const agent = 'bun'
const _ = (arg: string, expected: string) => () => {
  expect(parseNyxa(agent, arg.split(' ').filter(Boolean))).toBe(expected)
}

test('empty', _('', 'bun'))
test('foo', _('foo', 'bun foo'))
test('run test', _('run test', 'bun run test'))
