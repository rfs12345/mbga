"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  saveFileProgrammatically: async (filePath, content) => {
    return await electron.ipcRenderer.invoke("save-file-programmatically", {
      filePath,
      content
    });
  }
});
