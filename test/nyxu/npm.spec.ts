import { expect, test } from 'vitest'
import { parseNyxu } from '../../src'

const agent = 'npm'
const _ = (arg: string, expected: string) => () => {
  expect(
    parseNyxu(agent, arg.split(' ').filter(Boolean)),
  ).toBe(
    expected,
  )
}

test('empty', _('', 'npm update'))
