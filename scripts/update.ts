import fs from 'fs-extra'
import { version } from '../package.json'


async function run() {
  let readme = await fs.readFile('README.md', 'utf-8')

  readme = readme.replace(/img\.shields\.io\/badge\/npm\-(.+?)\-brightgreen/, `img.shields.io/badge/npm-${version.replace('-', '_')}-brightgreen`)

  await fs.writeFile('README.md', `${readme.trim()}\n`, 'utf-8')
}

run()