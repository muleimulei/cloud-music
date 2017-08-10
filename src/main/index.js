'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 590,
    useContentSize: true,
    width: 1064,
    frame: false,
    resize: false
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.on('maxWin', () => {
    console.log(8)
  })
}

ipcMain.on('exit', function () {
  app.quit()
})
ipcMain.on('maxWin', function () {
  mainWindow.maximize()
})
ipcMain.on('minWin', function () {
  mainWindow.unmaximize()
})
ipcMain.on('minimum', function () {
  mainWindow.minimize()
})
app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
var path = require('path')
var express = require('express')
var http = require('http')
var ap = express()
var config = require('../../config.js')
ap.use(express.static(path.join(__dirname, '../../static/')))
var server = http.createServer(ap)
server.listen(config.getValue('port'), config.getValue('host'))
