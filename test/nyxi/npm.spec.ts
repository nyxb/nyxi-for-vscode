import { expect, test } from 'vitest'
import { parseNyxi } from '../../src'

const agent = 'npm'
const _ = (arg: string, expected: string) => () => {
  expect(
    parseNyxi(agent, arg.split(' ').filter(Boolean)),
  ).toBe(
    expected,
  )
}

test('empty', _('', 'npm i'))

test('single add', _('axios', 'npm i axios'))

test('multiple', _('eslint @types/node', 'npm i eslint @types/node'))

test('-D', _('eslint @types/node -D', 'npm i eslint @types/node -D'))

test('global', _('eslint -g', 'npm i -g eslint'))

test('frozen', _('--frozen', 'npm ci'))
