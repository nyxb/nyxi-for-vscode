import { exclude } from './utils'

// pnpm v6.x or below and npm require the extra -- in the command
const run = (agent: string) => (args: string[]) => {
  if (args.length > 1) {
    return `${agent} run ${args[0]} -- ${args.slice(1).join(' ')}`
  } else {
    return `${agent} run ${args[0]}`
  }
}

const npm = {
  agent: 'npm {0}',
  run: run('npm'),
  install: 'npm i {0}',
  frozen: 'npm ci',
  global: 'npm i -g {0}',
  add: 'npm i {0}',
  upgrade: 'npm update {0}',
  execute: 'npx {0}',
  uninstall: 'npm uninstall {0}',
  global_uninstall: 'npm uninstall -g {0}'
} as const

const yarn = {
  agent: 'yarn {0}',
  run: 'yarn run {0}',
  install: 'yarn install {0}',
  frozen: 'yarn install --frozen-lockfile',
  global: 'yarn global add {0}',
  add: 'yarn add {0}',
  upgrade: 'yarn upgrade {0}',
  'upgrade-interactive': 'yarn upgrade-interactive {0}',
  execute: 'npx {0}',
  uninstall: 'yarn remove {0}',
  global_uninstall: 'yarn global remove {0}'
} as const

const pnpm = {
  agent: 'pnpm {0}',
  run: 'pnpm run {0}',
  install: 'pnpm i {0}',
  frozen: 'pnpm i --frozen-lockfile',
  global: 'pnpm add -g {0}',
  add: 'pnpm add {0}',
  upgrade: 'pnpm update {0}',
  'upgrade-interactive': 'pnpm update -i {0}',
  execute: 'pnpm dlx {0}',
  uninstall: 'pnpm remove {0}',
  global_uninstall: 'pnpm remove --global {0}'
} as const

const bun = {
  agent: 'bun {0}',
  run: 'bun run {0}',
  install: 'bun install {0}',
  frozen: 'bun install --no-save',
  global: 'bun add -g {0}',
  add: 'bun add {0}',
  execute: 'bunx {0}',
  uninstall: 'bun remove {0}',
  global_uninstall: 'bun remove -g {0}'
} as const

const Commands = {
  npm,
  pnpm,
  // pnpm v6.x or below
  'pnpm@6': {
    ...pnpm,
    run: run('pnpm')
  },
  yarn,
  'yarn@berry': {
    ...yarn,
    frozen: 'yarn install --immutable',
    upgrade: 'yarn up {0}',
    'upgrade-interactive': 'yarn up -i {0}',
    execute: 'yarn dlx {0}',
    // Yarn 2+ removed 'global', see https://github.com/yarnpkg/berry/issues/821
    global: 'npm i -g {0}',
    global_uninstall: 'npm uninstall -g {0}'
  },
  bun
} as const

export type Agent = keyof typeof Commands
export const Agents = /*#__PURE__*/ <Agent[]>Object.keys(Commands)

type KeysOfUnion<T> = T extends T ? keyof T : never

export type Command = KeysOfUnion<typeof Commands[Agent]>

export type CommandStatement = string | null | ((args: string[]) => string)

export const getCommandStatement = (agent: Agent, command: Command, args: string[] = []) => {
  if (!Agents.includes(agent)) {
    return
  }

  const statements = (Commands[agent] as any)[command] as CommandStatement
  if (!statements) {
    return
  }

  return typeof statements === 'function'
    ? statements(args)
    : statements.replace('{0}', args.join(' ')).trim()
}

export const resolveCommandStatement = (
  agent: Agent,
  command: Command,
  args: string[] = [],
  hasLock?: boolean
) => {
  if (!Agents.includes(agent)) {
    return
  }

  args = args.slice()

  switch (command) {
    case 'install':
      // bun use `-d` instead of `-D`
      if (agent === 'bun') {
        args = args.map((i) => (i === '-D' ? '-d' : i))
      }
      if (args.includes('-g')) {
        args = exclude(args, '-g')
        command = 'global'
        break
      } else if (args.includes('--frozen-if-present')) {
        args = exclude(args, '--frozen-if-present')
        command = hasLock ? 'frozen' : 'install'
        break
      } else if (args.includes('--frozen')) {
        args = exclude(args, '--frozen')
        command = 'frozen'
      } else if (args.length === 0 || args.every((i) => i.startsWith('-'))) {
        command = 'install'
      } else {
        command = 'add'
      }
      break

    case 'run':
      if (args.length === 0) args.push('start')
      if (args.includes('--if-present')) {
        args = exclude(args, '--if-present')
        args[0] = `--if-present ${args[0]}`
      }
      break

    case 'upgrade':
      if (args.includes('-i')) {
        args = exclude(args, '-i')
        command = 'upgrade-interactive'
      }
      break

    case 'uninstall':
      if (args.includes('-g')) {
        args = exclude(args, '-g')
        command = 'global_uninstall'
      }
      break
  }

  return getCommandStatement(agent, command, args)
}
