import { app, dialog, Menu, Tray } from 'electron'
import { trayPath } from '$electron/configs/index.js'
import { executeI18n } from '$electron/helpers/index.js'
import appStore from '$electron/helpers/store.js'
import { eventEmitter } from '$electron/helpers/emitter.js'
import { sleep } from '$/utils'
import adb from '$electron/exposes/adb/index.js'

export default (mainWindow) => {
  const t = value => executeI18n(mainWindow, value)

  let tray = null

  // 初始化adb模块
  adb.init()

  eventEmitter.on('tray:destroy', () => {
    tray?.destroy?.()
  })

  const showApp = () => {
    if (process.platform === 'darwin') {
      app.dock.show()
    }

    mainWindow.show()

    if (tray) {
      tray.destroy()
      tray = null
    }

    return true
  }

  const hideApp = () => {
    if (process.platform === 'darwin') {
      app.dock.hide()
    }

    mainWindow.hide()

    return true
  }

  const quitApp = async () => {
    app.isQuiting = true

    mainWindow.webContents.send('quit-before')

    await sleep(1 * 1000)

    app.quit()

    return true
  }

  const getConnectedDevices = async () => {
    try {
      const devices = await adb.getDeviceList() || []
      return devices.filter(device => device.type === 'device')
    } catch (error) {
      console.error('Failed to get device list:', error)
      return []
    }
  }

  const startMirror = async (device) => {
    try {
      mainWindow.webContents.send('tray-start-mirror', device)
      // 不显示主界面，只在后台启动镜像
    } catch (error) {
      console.error('Failed to start mirror:', error)
    }
  }

  const closeApp = async (response) => {
    if (response === 0) {
      quitApp()
      return true
    }
    else if (response === 1) {
      hideApp()

      tray = new Tray(trayPath)

      tray.setToolTip('escrcpy')

      tray.on('click', () => {
        showApp()
      })

      const contextMenu = Menu.buildFromTemplate([
        {
          label: await t('common.open'),
          click: () => {
            showApp()
          },
        },
        {
          type: 'separator'
        },
        {
          label: await t('device.mirror.start'),
          click: async () => {
            const devices = await getConnectedDevices()
            if (devices.length === 0) {
              dialog.showMessageBox({
                type: 'info',
                title: await t('common.tips'),
                message: await t('device.mirror.noDevice'),
                buttons: [await t('common.confirm')]
              })
              return
            }
            
            if (devices.length === 1) {
              await startMirror(devices[0])
            } else {
              const deviceChoices = devices.map(device => ({
                label: `${device.id} (${device.product || device.name})`,
                value: device
              }))
              
              const { response } = await dialog.showMessageBox({
                type: 'question',
                title: await t('device.mirror.selectDevice'),
                message: await t('device.mirror.multipleDevices'),
                buttons: deviceChoices.map(choice => choice.label),
                defaultId: 0
              })
              
              if (response >= 0 && response < devices.length) {
                await startMirror(devices[response])
              }
            }
          }
        },
        {
          type: 'separator'
        },
        {
          label: await t('common.restart'),
          click: () => {
            app.relaunch()
            quitApp()
          },
        },
        {
          label: await t('appClose.quit'),
          click: () => {
            quitApp()
          },
        },
      ])

      tray.setContextMenu(contextMenu)

      return true
    }

    return false
  }

  mainWindow.on('close', async (event) => {
    if (app.isQuiting) {
      mainWindow = null
      return true
    }

    event.preventDefault()

    let appCloseCode = appStore.get('common.appCloseCode')

    if (![0, 1].includes(appCloseCode)) {
      const { response } = await dialog.showMessageBox({
        type: 'question',
        cancelId: 2,
        buttons: [
          await t('appClose.quit'),
          await t('appClose.minimize'),
          await t('appClose.quit.cancel'),
        ],
        title: await t('common.tips'),
        message: await t('appClose.message'),
      })

      appCloseCode = response
    }

    closeApp(appCloseCode)
  })
}
