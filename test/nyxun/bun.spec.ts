import { expect, test } from 'vitest'
import { parseNyxun } from '../../src'

const agent = 'bun'
const _ = (arg: string, expected: string) => () => {
  expect(
    parseNyxun(agent, arg.split(' ').filter(Boolean)),
  ).toBe(
    expected,
  )
}

test('single uninstall', _('axios', 'bun remove axios'))

test('multiple', _('eslint @types/node', 'bun remove eslint @types/node'))

test('global', _('eslint nyxi -g', 'bun remove -g eslint nyxi'))
