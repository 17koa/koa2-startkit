/**
 * Created at 16/4/11.
 * @Author Ling.
 * @Email i@zeroling.com
 */
import fs from 'fs'
import lodash, { isPlainObject, defaultsDeep } from 'lodash'
import defaultConfig from './default'

const cfgs = []
fs.readdirSync(__dirname).map(filename => {
  if (filename === 'index.js') {
    return false
  }
  try {
    const cfg = require('./' + filename)
    if (isPlainObject(cfg)) {
      cfgs.push(cfg)
    }
  } catch (e) {}
})
cfgs.push(defaultConfig)

const config = defaultsDeep.apply(lodash, cfgs)
export default config
