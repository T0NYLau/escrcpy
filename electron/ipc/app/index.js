import { app, BrowserWindow, ipcMain } from 'electron'

export default (mainWindow) => {
  ipcMain.on('restart-app', () => {
    app.isQuiting = true
    app.relaunch()
    app.quit()
  })

  ipcMain.on('close-active-window', (event) => {
    const win = BrowserWindow.getFocusedWindow()

    if (win) {
      win.close()
    }
  })

  ipcMain.on('hide-active-window', (event) => {
    const win = BrowserWindow.getFocusedWindow()

    if (win) {
      win.hide()
    }
  })

  ipcMain.on('show-main-window', () => {
    if (mainWindow) {
      if (process.platform === 'darwin') {
        app.dock.show()
      }
      mainWindow.show()
      mainWindow.focus()
      
      // 销毁托盘图标，保持与showApp()逻辑一致
      // 避免通过文件管理等功能显示窗口时托盘图标重复创建
      if (mainWindow._trayApi && mainWindow._trayApi.destroyTray) {
        mainWindow._trayApi.destroyTray()
      }
    }
  })
}
