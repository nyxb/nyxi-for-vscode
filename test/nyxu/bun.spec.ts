import { expect, test } from 'vitest'
import { parseNyxu } from '../../src'

const agent = 'bun'
const _ = (arg: string, expected: string | null) => () => {
  expect(
    parseNyxu(agent, arg.split(' ').filter(Boolean)),
  ).toBe(
    expected,
  )
}

test.fails('empty', _('', null))
test.fails('interactive', _('-i', null))
test.fails('interactive latest', _('-i --latest', null))
