const { contextBridge, ipcRenderer } = require('electron')
const fs = require('fs');
const path = require('path');

contextBridge.exposeInMainWorld('appContext', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ipc: ipcRenderer,
  fs,
  path,
  cwd: () => process.cwd()
});
