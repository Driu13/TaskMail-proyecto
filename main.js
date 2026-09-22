console.log('**************************************************');
console.log('🚀 STARTING MAIN PROCESS - VERSION 2.0');
console.log('**************************************************');

const { app, BrowserWindow, ipcMain, Menu, Tray, nativeImage, screen, dialog } = require('electron');
const path = require('path');
const storage = require('./src/main/storage');
const emailService = require('./src/main/emailService');

// ==========================================
// IPC HANDLERS - REGISTERED IMMEDIATELY
// ==========================================

console.log('Registering IPC handlers...');

ipcMain.handle('auth:login', async (event, { username, password }) => {
    if (storage.validateUser(username, password)) {
        return { success: true, session: { usuario: username, rol: 'usuario' } };
    }
    return { success: false, error: 'Usuario o contraseña incorrectos' };
});

ipcMain.handle('auth:verifyPassword', async (event, { username, password }) => {
    try {
        const ok = storage.validateUser(username, password);
        return { success: ok, error: ok ? null : 'Contraseña incorrecta' };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

ipcMain.handle('auth:register', async (event, { username, password }) => {
    try {
        storage.createUser(username, password);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

ipcMain.handle('user:getData', async (event, username) => {
    return storage.getDataForUser(username);
});

ipcMain.handle('user:updateData', async (event, { username, userData }) => {
    try {
        const { password, rol, ...safeData } = userData;
        storage.updateUserData(username, safeData);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

ipcMain.handle('user:updateProfilePic', async (event, { username, imageBase64 }) => {
    try {
        storage.updateUserData(username, { profilePic: imageBase64 });
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

ipcMain.handle('user:updateTask', async (event, { username, taskId, updatedFields }) => {
    try {
        const updatedTask = storage.updateTask(username, taskId, updatedFields);
        return { success: true, task: updatedTask };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

ipcMain.handle('user:setTaskStatus', async (event, { username, taskId, status }) => {
    try {
        return { success: true, task: storage.setTaskStatus(username, taskId, status) };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

ipcMain.handle('user:exportData', async (event, username) => {
    const result = await dialog.showSaveDialog({
        title: 'Exportar eventos',
        defaultPath: 'taskmail-backup.json',
        filters: [{ name: 'TaskMail JSON', extensions: ['json'] }]
    });
    if (result.canceled) return { success: false, canceled: true };
    require('fs').writeFileSync(result.filePath, storage.exportUserData(username), 'utf8');
    return { success: true, path: result.filePath };
});

ipcMain.handle('user:importData', async (event, username) => {
    const result = await dialog.showOpenDialog({
        title: 'Importar respaldo',
        properties: ['openFile'],
        filters: [{ name: 'TaskMail JSON', extensions: ['json'] }]
    });
    if (result.canceled || !result.filePaths[0]) return { success: false, canceled: true };
    try {
        const content = require('fs').readFileSync(result.filePaths[0], 'utf8');
        storage.importUserData(username, content);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

ipcMain.handle('user:deleteTask', async (event, { username, taskId }) => {
    console.log(`Main: Deleting task ${taskId} for user ${username}`);
    try {
        storage.deleteTask(username, taskId);
        return { success: true };
    } catch (error) {
        console.error('Main: Error deleting task:', error);
        return { success: false, error: error.message };
    }
});

ipcMain.handle('user:restoreTask', async (event, { username, taskId }) => {
    console.log(`Main: Restoring task ${taskId} for user ${username}`);
    try {
        storage.restoreTask(username, taskId);
        return { success: true };
    } catch (error) {
        console.error('Main: Error restoring task:', error);
        return { success: false, error: error.message };
    }
});

ipcMain.handle('user:permanentDelete', async (event, { username, taskId }) => {
    console.log(`Main: Permanently deleting task ${taskId} for user ${username}`);
    try {
        storage.permanentDelete(username, taskId);
        return { success: true };
    } catch (error) {
        console.error('Main: Error permanently deleting task:', error);
        return { success: false, error: error.message };
    }
});

ipcMain.handle('user:getStats', async (event, username) => {
    try {
        const stats = storage.getStats(username);
        return { success: true, stats };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

ipcMain.handle('settings:updateTime', async (event, { hour, minute }) => {
    try {
        storage.updateSettings({ notificationHour: parseInt(hour), notificationMinute: parseInt(minute) });
        emailService.setupDailyCron(parseInt(hour), parseInt(minute));
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

ipcMain.handle('settings:get', () => storage.getSettings());

// ==========================================
// SMTP: configuración de correo desde la UI
// ==========================================
ipcMain.handle('smtp:get', () => {
    try {
        return emailService.getSmtpStatus();
    } catch (error) {
        return { configured: false, provider: 'gmail', user: null };
    }
});

ipcMain.handle('smtp:set', async (event, { user, pass, provider, host, port, encryption }) => {
    try {
        const status = emailService.configureSmtp({ user, pass, provider, host, port, encryption });
        return { success: true, status };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

ipcMain.handle('smtp:test', async (event, { to } = {}) => {
    try {
        const result = await emailService.sendTestEmail(to);
        return { success: true, ...result };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

ipcMain.handle('smtp:clear', () => {
    try {
        const status = emailService.clearSmtp();
        return { success: true, status };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

ipcMain.handle('settings:updatePreferences', (event, preferences) => {
    try {
        const current = storage.getSettings();
        const next = {
            ...current,
            ...preferences,
            theme: preferences.theme === 'dark' ? 'dark' : 'light',
            runInBackground: preferences.runInBackground !== false,
            startWithWindows: preferences.startWithWindows === true
        };
        storage.updateSettings(next);
        runInBackground = next.runInBackground;
        applyStartupPreference(next.startWithWindows);
        return { success: true, settings: next };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

ipcMain.on('session:logout', () => {
    if (mainWindow) {
        mainWindow.loadFile('login.html');
    }
});

let mainWindow;
let tray;
let trayWindow;
let isQuitting = false;
let runInBackground = true;

function applyStartupPreference(enabled) {
    app.setLoginItemSettings({
        openAtLogin: enabled,
        args: enabled ? ['--hidden'] : []
    });
}

function createTrayIcon() {
    const logoPath = path.join(__dirname, 'Build', 'taskmailicono.png');
    return nativeImage.createFromPath(logoPath).resize({ width: 32, height: 32 });
}

function createTrayMenuWindow() {
    trayWindow = new BrowserWindow({
        width: 292,
        height: 252,
        frame: false,
        transparent: true,
        resizable: false,
        movable: false,
        minimizable: false,
        maximizable: false,
        skipTaskbar: true,
        show: false,
        alwaysOnTop: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    trayWindow.loadFile('tray.html');
    trayWindow.on('blur', () => trayWindow.hide());
}

function showTrayMenu() {
    if (!trayWindow) createTrayMenuWindow();

    const trayBounds = tray.getBounds();
    const display = screen.getDisplayNearestPoint({ x: trayBounds.x, y: trayBounds.y });
    const menuWidth = 292;
    const menuHeight = 252;
    const x = Math.max(display.bounds.x, Math.min(trayBounds.x - menuWidth + trayBounds.width, display.bounds.x + display.bounds.width - menuWidth));
    const y = Math.max(display.bounds.y, trayBounds.y - menuHeight - 8);

    trayWindow.setPosition(Math.round(x), Math.round(y), false);
    trayWindow.show();
    trayWindow.focus();
}

function showMainWindow() {
    if (!mainWindow) return;
    mainWindow.show();
    mainWindow.focus();
    if (trayWindow) trayWindow.hide();
}

function closeMainWindow() {
    if (!mainWindow) return;
    if (runInBackground) {
        mainWindow.hide();
        return;
    }
    isQuitting = true;
    mainWindow.close();
}

function createTray() {
    tray = new Tray(createTrayIcon());
    tray.setToolTip('TaskMail - Recordatorios activos');
    tray.on('click', showMainWindow);
    tray.on('right-click', showTrayMenu);
    createTrayMenuWindow();
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        frame: false,
        titleBarStyle: 'hidden',
        backgroundColor: '#09090b',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    mainWindow.setMenuBarVisibility(false);
    mainWindow.on('close', (event) => {
        if (isQuitting) return;
        event.preventDefault();
        closeMainWindow();
    });
    mainWindow.loadFile('login.html');
}

ipcMain.on('tray:open', showMainWindow);
ipcMain.on('tray:check-reminders', () => emailService.checkRemindersNow());
ipcMain.on('window:minimize', () => mainWindow?.minimize());
ipcMain.on('window:toggle-maximize', () => {
    if (!mainWindow) return;
    if (mainWindow.isMaximized()) mainWindow.unmaximize();
    else mainWindow.maximize();
});
ipcMain.on('window:close', closeMainWindow);
ipcMain.on('tray:quit', () => {
    isQuitting = true;
    tray?.destroy();
    app.quit();
});

app.whenReady().then(() => {
    console.log('✅ Main Process: Ready. Handlers registered.');
    Menu.setApplicationMenu(null);
    const settings = storage.getSettings();
    runInBackground = settings.runInBackground !== false;
    applyStartupPreference(settings.startWithWindows === true);
    emailService.setupDailyCron();
    createWindow();
    createTray();
    if (process.argv.includes('--hidden') && runInBackground) mainWindow.hide();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('before-quit', () => {
    isQuitting = true;
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});