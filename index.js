const { app, BrowserWindow, Menu } = require('electron');

process.env.NODE_ENV = 'development'; // Set env

const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';

let mainWindow;
let aboutWindow;

function createMainWindow () {
  mainWindow = new BrowserWindow({
    title: 'Image Shrink',
    width: 500,
    height: 600,
    icon: `${__dirname}/assets/icons/Icon_256x256.png`,
    resizable: isDev,
    backgroundColor: 'white',
    webPreferences: {
      nodeIntegration: true
    },
  });

  mainWindow.loadFile('./app/index.html');
}

function createAboutWindow () {
  aboutWindow = new BrowserWindow({
    title: 'About Image Shrink',
    width: 300,
    height: 300,
    icon: `${__dirname}/assets/icons/Icon_256x256.png`,
    resizable: false
  });

  aboutWindow.loadFile('./app/about.html');
}

app.on('ready', () => {
  createMainWindow();

  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);

  mainWindow.on('closed', () => mainWindow = null);
});

const menu = [
  ...(isMac ? [{
    label: app.name,
    submenu: [
      {
        label: 'About',
        click: createAboutWindow
      }
    ]
  }] : []),
  {
    role: 'fileMenu'
  },
  ...(isDev ? [
    {
      label: 'Developer',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { type: 'separator' },
        { role: 'toggledevtools' },
      ]
    }
  ] : [])
];


app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit();
  }
});


app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});
