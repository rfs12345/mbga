"use strict";
const electron = require("electron");
const path = require("path");
const fs = require("fs");
function _interopNamespaceDefault(e) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const path__namespace = /* @__PURE__ */ _interopNamespaceDefault(path);
const fs__namespace = /* @__PURE__ */ _interopNamespaceDefault(fs);
function createWindow() {
  const preloadPath = path__namespace.resolve(__dirname, "preload.js");
  console.log("Preload Path:", preloadPath);
  const mainWindow = new electron.BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: preloadPath,
      // Ensure this is correct
      contextIsolation: true
    }
  });
  mainWindow.loadURL("http://localhost:3000");
  mainWindow.webContents.openDevTools();
}
electron.app.whenReady().then(createWindow);
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
electron.ipcMain.handle(
  "save-file-programmatically",
  async (_, { filePath, content }) => {
    try {
      const filePatht = path__namespace.resolve(
        "C:\\Users\\ryans\\Desktop\\Development\\",
        filePath
      );
      fs__namespace.writeFileSync(filePatht, content, "utf-8");
      console.log("saved at !", filePath);
      return { success: true, filePath };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
);
