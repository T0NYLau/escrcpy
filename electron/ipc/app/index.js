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

  ipcMain.on('show-main-window', (event) => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore()
      }
      mainWindow.show()
      mainWindow.focus()
    }
  })
}
