import { expect, test } from 'vitest'
import { parseNyxlx } from '../../src'

const agent = 'npm'
const _ = (arg: string, expected: string) => () => {
  expect(parseNyxlx(agent, arg.split(' ').filter(Boolean))).toBe(expected)
}

test('single uninstall', _('esbuild', 'npx esbuild'))
test('multiple', _('esbuild --version', 'npx esbuild --version'))
