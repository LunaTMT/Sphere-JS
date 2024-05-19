const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800, // Set base width
    height: 600, // Set base height
    minWidth: 600, // Set minimum width
    minHeight: 400, // Set minimum height
    show: false, // Initially hide the window to prevent flickering
    fullscreen: true, // Make the window fullscreen
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  });

  mainWindow.loadFile('index.html');

  // No need to manually set fullscreen and show, as it's already set in the options

  // When the window is closed, quit the app on macOS
  mainWindow.on('closed', () => {
    app.quit();
  });
}

app.on('ready', createWindow);

// No need to handle window-all-closed and activate events, as they are mainly for macOS

