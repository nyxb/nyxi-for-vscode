import { expect, test } from 'vitest'
import { parseNyxlx } from '../../src'

const agent = 'yarn@berry'
const _ = (arg: string, expected: string) => () => {
  expect(parseNyxlx(agent, arg.split(' ').filter(Boolean))).toBe(expected)
}

test('single uninstall', _('esbuild', 'yarn dlx esbuild'))
test('multiple', _('esbuild --version', 'yarn dlx esbuild --version'))
