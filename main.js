const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
// IPC listener for menu items
const {ipcMain} = require('electron')
// For the About dialog box
const dialog = require('electron').dialog
const path = require('path')
const url = require('url')
// For reworking menus that differ from standard
const Menu = electron.Menu
//For listening for track changes
const {systemPreferences} = require('electron');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));


  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// Custom menus
app.on('ready', function () {

  const menuTemplate = [
    {
      label: 'Mirada',
      submenu: [
        {
          label: 'About Mirada',
          click: () => {
            dialog.showMessageBox({ message: "Mirada v. 2.0, made with love.",buttons: ["OK"] });
          }
        }, {
          type: 'separator'
        },{
          label: 'Themes',
          submenu: [
            {
              label: 'Dark',
              type: 'checkbox',
              checked: true,
              click: () => {
                store.set('selectedTheme', 'themeDark');
<<<<<<< HEAD
=======
                console.log(store.get('selectedTheme'));
>>>>>>> bfd5e5a70b1c0dde81c97da98b8a924af5fb0283
                mainWindow.webContents.executeJavaScript('switchTheme("' + (store.get('selectedTheme')) + '");');
              }
            },
            {
              label: 'Light',
              type: 'checkbox',
              click: () => {
                store.set('selectedTheme', 'themeLight');
<<<<<<< HEAD
=======
                console.log(store.get('selectedTheme'));
>>>>>>> bfd5e5a70b1c0dde81c97da98b8a924af5fb0283
                mainWindow.webContents.executeJavaScript('switchTheme("' + (store.get('selectedTheme')) + '");');
              }
            },
            {
              label: 'Valentine',
              type: 'checkbox',
              click: () => {
                store.set('selectedTheme', 'themeValentine');
<<<<<<< HEAD
=======
                console.log(store.get('selectedTheme'));
>>>>>>> bfd5e5a70b1c0dde81c97da98b8a924af5fb0283
                mainWindow.webContents.executeJavaScript('switchTheme("' + (store.get('selectedTheme')) + '");');
              }
            },
            {
              label: 'Halloween',
              type: 'checkbox',
              click: () => {
                store.set('selectedTheme', 'themeHalloween');
<<<<<<< HEAD
=======
                console.log(store.get('selectedTheme'));
>>>>>>> bfd5e5a70b1c0dde81c97da98b8a924af5fb0283
                mainWindow.webContents.executeJavaScript('switchTheme("' + (store.get('selectedTheme')) + '");');
              }
            },
            {
              label: 'Christmas',
              type: 'checkbox',
              click: () => {
                store.set('selectedTheme', 'themeXmas');
<<<<<<< HEAD
=======
                console.log(store.get('selectedTheme'));
>>>>>>> bfd5e5a70b1c0dde81c97da98b8a924af5fb0283
                mainWindow.webContents.executeJavaScript('switchTheme("' + (store.get('selectedTheme')) + '");');
              }
            }
          ]
        }, {
          type: 'separator'
        }, {
          role: 'quit'
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {role: 'reload'},
        {
          label: 'Fake reload',
          // accelerator: 'CmdOrCtrl+R',
          click: () => {
            mainWindow.webContents.reload();
            mainWindow.webContents.executeJavaScript('switchTheme("' + (store.get('selectedTheme')) + '");');
          }
        },
        {role: 'toggledevtools'},
        {type: 'separator'},
        {role: 'resetzoom'},
        {role: 'zoomin'},
        {role: 'zoomout'},
        {type: 'separator'},
        {role: 'togglefullscreen'}
      ]
    },
    {
      role: 'window',
      submenu: [
        {role: 'minimize'},
        {role: 'zoom'},
      ]
    },
  ];
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
});

//Listen for track changes
systemPreferences.subscribeNotification('com.apple.iTunes.playerInfo', () => {
  mainWindow.webContents.executeJavaScript('newSong()');
})

//Preferences storage and recall
const Store = require('electron-store');
const store = new Store();

app.on('ready', function () {
  mainWindow.webContents.executeJavaScript('switchTheme("' + (store.get('selectedTheme')) + '");');
});
