const { contextBridge, ipcRenderer } = require("electron");
const fs = require("fs");
const path = require("path");
const { Buffer } = require("node:buffer");
const database = require("./database/service");
const Diffinstance = require("./backup/index.js");


const readme = fs.readFileSync(path.join(__dirname, "README.md"), {
  encoding: "utf-8",
});
const BD_APP_KEY = "uUDl9eiBcGG1YAaIeF6u97VI7fCkWAEt";
const BD_APP_SECRET_Key = "n7Regie4NzFzL109MZgM23CgrH7LYrnv";
contextBridge.exposeInMainWorld("appContext", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ipc: ipcRenderer,
  fs,
  path,
  database,
  cwd: () => process.cwd(),
  readme,
  BD_APP_KEY,
  BD_APP_SECRET_Key,
  Diffinstance,
  Buffer,
});
