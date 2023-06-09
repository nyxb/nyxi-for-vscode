import { Agent, resolveCommandStatement } from './commands'

export const NyxiCommands = ['nyxi', 'nyxr', 'nyxlx', 'nyxu', 'nyxun', 'nyxci', 'nyxa'] as const
export type NyxiCommands = typeof NyxiCommands[number]

export type Runner = (agent: Agent, args?: string[], hasLock?: boolean) => string | undefined

export const parseNyxi = <Runner>(
  ((agent, args, hasLock) => resolveCommandStatement(agent, 'install', args, hasLock))
)

export const parseNyxr = <Runner>((agent, args) => resolveCommandStatement(agent, 'run', args))

export const parseNyxu = <Runner>((agent, args) => resolveCommandStatement(agent, 'upgrade', args))

export const parseNyxun = <Runner>((agent, args) => resolveCommandStatement(agent, 'uninstall', args))

export const parseNyxlx = <Runner>((agent, args) => resolveCommandStatement(agent, 'execute', args))

export const parseNyxa = <Runner>((agent, args) => resolveCommandStatement(agent, 'agent', args))

export function resolveNyxiCommandStatement(command: NyxiCommands, ...args: Parameters<Runner>) {
  switch (command) {
    case 'nyxi':
      return parseNyxi(...args)
    case 'nyxr':
      return parseNyxr(...args)
    case 'nyxu':
      return parseNyxu(...args)
    case 'nyxun':
      return parseNyxun(...args)
    case 'nyxlx':
      return parseNyxlx(...args)
    case 'nyxa':
      return parseNyxa(...args)
  }
}
