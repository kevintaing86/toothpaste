const { spawn } = require('child_process')

const deploySh = spawn('sh', [ 'bluetooth.sh' ], {
  cwd: process.env.HOME + './',
  env: Object.assign({}, process.env, { PATH: process.env.PATH + ':/usr/local/bin' })
})
