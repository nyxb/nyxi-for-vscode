import { Agent, Agents } from './commands'
import fs from 'fs'
import path from 'path'
import { findUp } from 'find-up'

// the order here matters, more specific one comes first
export const Locks: Record<string, Agent> = {
  'bun.lockb': 'bun',
  'pnpm-lock.yaml': 'pnpm',
  'yarn.lock': 'yarn',
  'package-lock.json': 'npm',
  'npm-shrinkwrap.json': 'npm'
}

export interface DetectOptions {
  cwd?: string
}

export async function detect({ cwd }: DetectOptions = {}) {
  let agent: Agent | null = null

  const lockPath = await findUp(Object.keys(Locks), { cwd })
  let packageJsonPath: string | undefined

  if (lockPath) {
    packageJsonPath = path.resolve(lockPath, '../package.json')
  } else {
    packageJsonPath = await findUp('package.json', { cwd })
  }

  // read `packageManager` field in package.json
  if (packageJsonPath && fs.existsSync(packageJsonPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
      if (typeof pkg.packageManager === 'string') {
        const [name, version] = pkg.packageManager.split('@')
        if (name === 'yarn' && parseInt(version) > 1) {
          agent = 'yarn@berry'
        } else if (name === 'pnpm' && parseInt(version) < 7) {
          agent = 'pnpm@6'
        } else if (name in Agents) {
          agent = name
        } else {
          console.warn('[unpm] Unknown packageManager:', pkg.packageManager)
        }
      }
    } catch {}
  }

  // detect based on lock
  if (!agent && lockPath) {
    agent = Locks[path.basename(lockPath)]
  }

  return agent
}

export const InstallPages: Record<Agent, string> = {
  bun: 'https://bun.sh',
  pnpm: 'https://pnpm.io/installation',
  'pnpm@6': 'https://pnpm.io/6.x/installation',
  yarn: 'https://classic.yarnpkg.com/en/docs/install',
  'yarn@berry': 'https://yarnpkg.com/getting-started/install',
  npm: 'https://docs.npmjs.com/cli/v8/configuring-npm/install'
}
