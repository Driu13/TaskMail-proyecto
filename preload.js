const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    auth: {
        login: (username, password) => ipcRenderer.invoke('auth:login', { username, password }),
        verifyPassword: (username, password) => ipcRenderer.invoke('auth:verifyPassword', { username, password }),
        register: (username, password) => ipcRenderer.invoke('auth:register', { username, password }),
    },
    user: {
        getData: (username) => ipcRenderer.invoke('user:getData', username),
        updateData: (username, userData) => ipcRenderer.invoke('user:updateData', { username, userData }),
        updateTask: (username, taskId, updatedFields) => ipcRenderer.invoke('user:updateTask', { username, taskId, updatedFields }),
        setTaskStatus: (username, taskId, status) => ipcRenderer.invoke('user:setTaskStatus', { username, taskId, status }),
        exportData: (username) => ipcRenderer.invoke('user:exportData', username),
        importData: (username) => ipcRenderer.invoke('user:importData', username),
        deleteTask: (username, taskId) => ipcRenderer.invoke('user:deleteTask', { username, taskId }),
        restoreTask: (username, taskId) => ipcRenderer.invoke('user:restoreTask', { username, taskId }),
        permanentDelete: (username, taskId) => ipcRenderer.invoke('user:permanentDelete', { username, taskId }),
        getStats: (username) => ipcRenderer.invoke('user:getStats', username),
        updateProfilePic: (username, imageBase64) => ipcRenderer.invoke('user:updateProfilePic', { username, imageBase64 }),
    },
    settings: {
        get: () => ipcRenderer.invoke('settings:get'),
        updateTime: (hour, minute) => ipcRenderer.invoke('settings:updateTime', { hour, minute }),
        updatePreferences: (preferences) => ipcRenderer.invoke('settings:updatePreferences', preferences),
    },
    smtp: {
        get: () => ipcRenderer.invoke('smtp:get'),
        set: (data) => ipcRenderer.invoke('smtp:set', data),
        test: (to) => ipcRenderer.invoke('smtp:test', { to }),
        clear: () => ipcRenderer.invoke('smtp:clear'),
    },
    session: {
        logout: () => ipcRenderer.send('session:logout'),
    },
    tray: {
        open: () => ipcRenderer.send('tray:open'),
        quit: () => ipcRenderer.send('tray:quit'),
        checkReminders: () => ipcRenderer.send('tray:check-reminders'),
    },
    window: {
        minimize: () => ipcRenderer.send('window:minimize'),
        toggleMaximize: () => ipcRenderer.send('window:toggle-maximize'),
        close: () => ipcRenderer.send('window:close'),
    }
});