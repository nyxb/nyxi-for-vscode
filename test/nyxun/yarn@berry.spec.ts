import { expect, test } from 'vitest'
import { parseNyxun } from '../../src'

const agent = 'yarn@berry'
const _ = (arg: string, expected: string) => () => {
  expect(
    parseNyxun(agent, arg.split(' ').filter(Boolean)),
  ).toBe(
    expected,
  )
}

test('single add', _('axios', 'yarn remove axios'))

test('multiple', _('eslint @types/node', 'yarn remove eslint @types/node'))

test('-D', _('eslint @types/node -D', 'yarn remove eslint @types/node -D'))

test('global', _('eslint nyxi -g', 'npm uninstall -g eslint nyxi'))
