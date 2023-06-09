import { expect, test } from 'vitest'
import { parseNyxr } from '../../src'

const agent = 'pnpm'
const _ = (arg: string, expected: string) => () => {
  expect(
    parseNyxr(agent, arg.split(' ').filter(Boolean)),
  ).toBe(
    expected,
  )
}

test('empty', _('', 'pnpm run start'))

test('if-present', _('test --if-present', 'pnpm run --if-present test'))

test('script', _('dev', 'pnpm run dev'))

test('script with arguments', _('build --watch -o', 'pnpm run build --watch -o'))

test('colon', _('build:dev', 'pnpm run build:dev'))
