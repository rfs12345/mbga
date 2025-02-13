export {};

declare global {
  interface Window {
    electronAPI: {
      saveFileProgrammatically: (
        filePath: string,
        content: string
      ) => Promise<{ success: boolean; filePath?: string; message?: string }>;
    };
  }
}
