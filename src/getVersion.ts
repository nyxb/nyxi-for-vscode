import { execa } from 'execa'
import { Agent } from './commands'

export function getVersion(agent: Agent) {
  return execa(agent, ['--version']).then((res) => res.stdout)
}
