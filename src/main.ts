import { app, BrowserWindow, dialog, ipcMain } from "electron";
import * as path from "path";
import * as fs from "fs";

function createWindow() {
  const preloadPath = path.resolve(__dirname, "preload.js");
  console.log("Preload Path:", preloadPath); // Log to verify the path

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: preloadPath, // Ensure this is correct
      contextIsolation: true,
    },
  });

  mainWindow.loadURL("http://localhost:3000"); // Load Vite's dev server for the renderer process

  mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.handle(
  "save-file-programmatically",
  async (_, { filePath, content }: { filePath: string; content: string }) => {
    try {
      const filePatht = path.resolve(
        "C:\\Users\\ryans\\Desktop\\Development\\",
        filePath
      );
      fs.writeFileSync(filePatht, content, "utf-8");
      console.log("saved at !", filePath);
      return { success: true, filePath };
    } catch (error) {
      return { success: false, message: (error as Error).message };
    }
  }
);
