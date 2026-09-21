window.api.settings.get().then(settings => {
    document.body.classList.toggle('theme-dark', settings.theme === 'dark');
}).catch(() => {});

document.querySelectorAll('[data-window-action]').forEach(button => {
    button.addEventListener('click', () => {
        const action = button.dataset.windowAction;
        if (action === 'minimize') window.api.window.minimize();
        if (action === 'maximize') window.api.window.toggleMaximize();
        if (action === 'close') window.api.window.close();
    });
});
