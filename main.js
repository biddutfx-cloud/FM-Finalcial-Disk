const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow () {
  const win = new BrowserWindow({
    width: 1050,
    height: 610,
    title: 'Financial Disk',
    icon: path.join(__dirname, 'assets', 'Icon.png'),
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile('index.html');
}

ipcMain.handle('export-note', async (event, { filename, content }) => {
  try {
    const downloadsPath = app.getPath('downloads');
    const exportDir = path.join(downloadsPath, 'Financial Disk Exports');
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, { recursive: true });
    }
    const filePath = path.join(exportDir, filename);

    // Read Icon 2.png specifically for the exported note document
    let iconDataUrl = '';
    try {
      const iconPath = path.join(__dirname, 'assets', 'Icon 2.png');
      if (fs.existsSync(iconPath)) {
        const iconBuf = fs.readFileSync(iconPath);
        iconDataUrl = 'data:image/png;base64,' + iconBuf.toString('base64');
      }
    } catch (e) {}

    const finalContent = content.replace(/LOGO_ICON_SRC/g, iconDataUrl || 'assets/Icon 2.png');
    fs.writeFileSync(filePath, finalContent, 'utf8');

    // Open file URL using default web browser
    const fileUrl = 'file:///' + filePath.replace(/\\/g, '/');
    await shell.openExternal(fileUrl);
    return { success: true, filePath };
  } catch (err) {
    console.error('Export error:', err);
    return { success: false, error: err.message };
  }
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
