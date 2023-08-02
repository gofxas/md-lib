// main.js

// electron 模块可以用来控制应用的生命周期和创建原生浏览窗口
const { app, Menu,globalShortcut , ipcMain, BrowserWindow, shell } = require('electron')

// shell.openExternal('https://github.com')
const path = require('path')
Menu.setApplicationMenu(null);
const createWindow = () => {
  // 创建浏览窗口
  const mainWindow = new BrowserWindow({
    width: 1100,
    minWidth: 900,
    height: 758,
    minHeight: 600,
    frame:false,
    webPreferences: {
      webSecurity:false,
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration:true,
      contextIsolation:true,
    }
  })
  let isDev = process.argv.some(t => t === 'DEV');
  // 加载 index.html
  isDev?mainWindow.loadURL('http://localhost:5173/'):mainWindow.loadFile('vitebuild/index.html');
  
  ipcMain.on('close', () => {
    mainWindow.close()
  })
  ipcMain.on('minimize', () => {
    mainWindow.minimize()
  })
  ipcMain.on('maximize', () => {
    mainWindow.maximize()
  })
  ipcMain.on('unmaximize', () => {
    mainWindow.unmaximize()
  })
  ipcMain.on('outerlink', (e, url) => {
    shell.openExternal(url)
  })
  
  isDev&& mainWindow.webContents.openDevTools();
}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createWindow();
  // globalShortcut.register('f5',function(){
  //   console.log('f5 is pressed')
  // })
  // globalShortcut.register('CommandOrControl+W',function(){
  //   console.log('CommandOrControl+W is pressed')
  // })
  app.on('activate', () => {
    // 在 macOS 系统内, 如果没有已开启的应用窗口
    // 点击托盘图标时通常会重新创建一个新窗口
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态, 
// 直到用户使用 Cmd + Q 明确退出
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// 在当前文件中你可以引入所有的主进程代码
// 也可以拆分成几个文件，然后用 require 导入。