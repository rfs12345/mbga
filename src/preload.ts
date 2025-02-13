import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  saveFileProgrammatically: async (filePath: string, content: string) => {
    return await ipcRenderer.invoke("save-file-programmatically", {
      filePath,
      content,
    });
  },
});
