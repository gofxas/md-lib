const { contextBridge, ipcRenderer } = require("electron");
const fs = require("fs");
const path = require("path");
const database = require("./database/service");
const readme = fs.readFileSync("README.md", { encoding: "utf-8" });
console.log(readme);
contextBridge.exposeInMainWorld("appContext", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ipc: ipcRenderer,
  fs,
  path,
  database,
  cwd: () => process.cwd(),
  readme
});
