import { expect, test } from 'vitest'
import { parseNyxi } from '../../src'

const agent = 'bun'
const _ = (arg: string, expected: string) => () => {
  expect(
    parseNyxi(agent, arg.split(' ').filter(Boolean)),
  ).toBe(
    expected,
  )
}

test('empty', _('', 'bun install'))

test('single add', _('axios', 'bun add axios'))

test('add dev', _('vite -D', 'bun add vite -d'))

test('multiple', _('eslint @types/node', 'bun add eslint @types/node'))

test('global', _('eslint -g', 'bun add -g eslint'))

test('frozen', _('--frozen', 'bun install --no-save'))
