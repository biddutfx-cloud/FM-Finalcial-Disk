const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  exportNote: (data) => ipcRenderer.invoke('export-note', data)
});
