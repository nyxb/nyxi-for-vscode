import { expect, test } from 'vitest'
import { parseNyxu } from '../../src'

const agent = 'pnpm'
const _ = (arg: string, expected: string) => () => {
  expect(
    parseNyxu(agent, arg.split(' ').filter(Boolean)),
  ).toBe(
    expected,
  )
}

test('empty', _('', 'pnpm update'))

test('interactive', _('-i', 'pnpm update -i'))

test('interactive latest', _('-i --latest', 'pnpm update -i --latest'))
