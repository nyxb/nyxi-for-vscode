import { expect, test } from 'vitest'
import { parseNyxu } from '../../src'

const agent = 'yarn@berry'
const _ = (arg: string, expected: string) => () => {
  expect(
    parseNyxu(agent, arg.split(' ').filter(Boolean)),
  ).toBe(
    expected,
  )
}

test('empty', _('', 'yarn up'))

test('interactive', _('-i', 'yarn up -i'))
