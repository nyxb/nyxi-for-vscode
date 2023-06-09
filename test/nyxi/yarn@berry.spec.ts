import { expect, test } from 'vitest'
import { parseNyxi } from '../../src'

const agent = 'yarn@berry'
const _ = (arg: string, expected: string) => () => {
  expect(
    parseNyxi(agent, arg.split(' ').filter(Boolean)),
  ).toBe(
    expected,
  )
}

test('empty', _('', 'yarn install'))

test('single add', _('axios', 'yarn add axios'))

test('multiple', _('eslint @types/node', 'yarn add eslint @types/node'))

test('-D', _('eslint @types/node -D', 'yarn add eslint @types/node -D'))

test('global', _('eslint nyxi -g', 'npm i -g eslint nyxi'))

test('frozen', _('--frozen', 'yarn install --immutable'))
