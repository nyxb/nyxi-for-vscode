import { expect, test } from 'vitest'
import { getCommandStatement } from '../src'

test('wrong agent', () => {
  expect(getCommandStatement('idk' as any, 'install', [])).toBeUndefined()
})
