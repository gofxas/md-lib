const { contextBridge, ipcRenderer } = require('electron')
const fs = require('fs');
const path = require('path');
const database = require("./database/index");
contextBridge.exposeInMainWorld('appContext', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ipc: ipcRenderer,
  fs,
  path,
  database,
  cwd: () => process.cwd()
});
