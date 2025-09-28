import appEvents from './app/index.js'
import handles from './handles/index.js'
import shortcuts from './shortcuts/index.js'
import theme from './theme/index.js'
import tray from './tray/index.js'
import updater from './updater/index.js'

export default (mainWindow) => {
  appEvents(mainWindow)
  handles(mainWindow)
  updater(mainWindow)
  const trayApi = tray(mainWindow)
  theme(mainWindow)
  shortcuts(mainWindow)

  // 将托盘API挂载到mainWindow上，供其他模块使用
  if (trayApi) {
    mainWindow._trayApi = trayApi
  }
}
