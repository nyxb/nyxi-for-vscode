import { expect, test } from 'vitest'
import { parseNyxa } from '../../src'

const agent = 'pnpm'
const _ = (arg: string, expected: string) => () => {
  expect(
    parseNyxa(agent, arg.split(' ').filter(Boolean)),
  ).toBe(
    expected,
  )
}

test('empty', _('', 'pnpm'))
test('foo', _('foo', 'pnpm foo'))
test('run test', _('run test', 'pnpm run test'))
