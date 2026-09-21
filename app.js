// ==========================================
// TRANSLATIONS
// ==========================================
const Translations = {
    en: {
        dashboard: 'Dashboard',
        calendar: 'Calendar',
        tasks: 'Task Manager',
        settings: 'Settings',
        newEvent: 'New Event',
        signOut: 'Sign Out',
        totalEvents: 'Total Events',
        completed: 'Completed',
        urgentTasks: 'Urgent Tasks',
        todayFocus: "Today's Focus",
        quickActions: 'Quick Actions',
        createEvent: 'Create New Event',
        manageTasks: 'Manage All Tasks',
        eventName: 'Event Name',
        date: 'Date',
        time: 'Time',
        category: 'Category',
        recurrence: 'Repeat',
        noRepeat: 'Does not repeat',
        daily: 'Daily',
        weekly: 'Weekly',
        monthly: 'Monthly',
        yearly: 'Yearly',
        filter: 'Filter',
        all: 'All',
        today: 'Today',
        upcoming: 'Upcoming',
        overdue: 'Overdue',
        exportData: 'Export backup',
        importData: 'Import backup',
        appearance: 'Appearance',
        darkTheme: 'Dark theme',
        backgroundMode: 'Keep running in background',
        startWithWindows: 'Start with Windows',
        priority: 'Priority',
        status: 'Status',
        actions: 'Actions',
        noTasks: 'No tasks found matching your search.',
        undo: 'Undo',
        complete: 'Complete',
        eventDetails: 'Event Details',
        selectDate: 'Select a date to view events.',
        eventsFor: 'Events for',
        noEvents: 'No events scheduled for this date.',
        createEventHeader: 'Create Event',
        saveEvent: 'Save Event',
        notificationSettings: 'Notification Settings',
        dailyDelivery: 'Daily Delivery Time',
        saveTime: 'Save Time',
        profile: 'Profile',
        username: 'Username',
        emailPrefs: 'Email Preferences',
        addEmail: 'Add',
        smtpTitle: 'Email Sending (SMTP)',
        smtpHelp: 'Required so TaskMail can send reminder emails from this device. Saving new settings fully replaces whatever was configured before.',
        smtpProviderLabel: 'Email provider',
        smtpProviderGmail: 'Gmail',
        smtpProviderOffice365: 'Outlook / Microsoft 365',
        smtpProviderCustom: 'Other (custom SMTP)',
        smtpHostLabel: 'SMTP server (host)',
        smtpPortLabel: 'Outgoing port',
        smtpEncryptionLabel: 'Encryption type',
        smtpEncryptionStarttls: 'STARTTLS (recommended, usually port 587)',
        smtpEncryptionSsl: 'SSL/TLS (usually port 465)',
        smtpEncryptionNone: 'None (usually port 25, rarely used)',
        smtpEmailLabel: 'Sender email address',
        smtpPasswordLabel: 'Password',
        smtpPasswordPlaceholder: 'Account or app password',
        smtpSave: 'Save & encrypt on this device',
        smtpTest: 'Send test email',
        smtpClear: 'Clear saved credentials',
        smtpConfigured: '✅ Configured on this device',
        smtpNotConfigured: '⚠️ Not configured yet — reminders will not be sent until you save valid settings.',
        smtpSaved: 'Settings saved and encrypted for this device.',
        smtpCleared: 'Saved credentials were removed.',
        smtpTestSent: 'Test email sent — check your inbox.',
        roleUser: 'User',
        roleAdmin: 'Administrator',
        changeLanguage: 'Change Language',
        langEn: 'English',
        langEs: 'Spanish',
        searchPlaceholder: 'Search events, tasks, or people...',
        trash: 'Trash',
        restore: 'Restore',
        deletePermanent: 'Delete Permanently',
        selected: 'selected',
        confirmBulkRestore: 'Restore {count} selected event(s)?',
        confirmBulkDelete: 'Permanently delete {count} selected event(s)? This cannot be undone.',
        edit: 'Edit',
        updateEvent: 'Update Event',
        // Priority Map
        priorityLow: 'Low',
        priorityMedium: 'Medium',
        priorityHigh: 'High',
        priorityUrgent: 'Urgent',
        // Days of week
        sun: 'Sun',
        mon: 'Mon',
        tue: 'Tue',
        wed: 'Wed',
        thu: 'Thu',
        fri: 'Fri',
        sat: 'Sat'
    },
    es: {
        dashboard: 'Panel Principal',
        calendar: 'Calendario',
        tasks: 'Gestor de Tareas',
        settings: 'Configuración',
        newEvent: 'Nuevo Evento',
        signOut: 'Cerrar Sesión',
        totalEvents: 'Eventos Totales',
        completed: 'Completados',
        urgentTasks: 'Tareas Urgentes',
        todayFocus: 'Enfoque de Hoy',
        quickActions: 'Acciones Rápidas',
        createEvent: 'Crear Nuevo Evento',
        manageTasks: 'Gestionar Tareas',
        eventName: 'Nombre del Evento',
        date: 'Fecha',
        time: 'Hora',
        category: 'Categoría',
        recurrence: 'Repetir',
        noRepeat: 'No se repite',
        daily: 'Diario',
        weekly: 'Semanal',
        monthly: 'Mensual',
        yearly: 'Anual',
        filter: 'Filtrar',
        all: 'Todos',
        today: 'Hoy',
        upcoming: 'Próximos',
        overdue: 'Atrasados',
        exportData: 'Exportar respaldo',
        importData: 'Importar respaldo',
        appearance: 'Apariencia y ejecución',
        darkTheme: 'Tema oscuro',
        backgroundMode: 'Mantener ejecutándose en segundo plano',
        startWithWindows: 'Iniciar con Windows',
        priority: 'Prioridad',
        status: 'Estado',
        actions: 'Acciones',
        noTasks: 'No se encontraron tareas que coincidan con tu búsqueda.',
        undo: 'Deshacer',
        complete: 'Completar',
        eventDetails: 'Detalles del Evento',
        selectDate: 'Selecciona una fecha para ver los eventos.',
        eventsFor: 'Eventos para el',
        noEvents: 'No hay eventos programados para esta fecha.',
        createEventHeader: 'Crear Evento',
        saveEvent: 'Guardar Evento',
        notificationSettings: 'Configuración de Notificaciones',
        dailyDelivery: 'Hora de Entrega Diaria',
        saveTime: 'Guardar Hora',
        profile: 'Perfil',
        username: 'Nombre de Usuario',
        emailPrefs: 'Preferencias de Email',
        addEmail: 'Agregar',
        smtpTitle: 'Envío de Correo (SMTP)',
        smtpHelp: 'Necesario para que TaskMail pueda enviar los correos de recordatorio desde este dispositivo. Guardar valores nuevos reemplaza por completo los anteriores.',
        smtpProviderLabel: 'Proveedor de correo',
        smtpProviderGmail: 'Gmail',
        smtpProviderOffice365: 'Outlook / Microsoft 365',
        smtpProviderCustom: 'Otro (SMTP personalizado)',
        smtpHostLabel: 'Servidor SMTP (host)',
        smtpPortLabel: 'Puerto de salida',
        smtpEncryptionLabel: 'Tipo de cifrado',
        smtpEncryptionStarttls: 'STARTTLS (recomendado, normalmente puerto 587)',
        smtpEncryptionSsl: 'SSL/TLS (normalmente puerto 465)',
        smtpEncryptionNone: 'Ninguno (normalmente puerto 25, poco usado)',
        smtpEmailLabel: 'Correo remitente',
        smtpPasswordLabel: 'Contraseña',
        smtpPasswordPlaceholder: 'Contraseña de la cuenta o de aplicación',
        smtpSave: 'Guardar y cifrar en este dispositivo',
        smtpTest: 'Enviar correo de prueba',
        smtpClear: 'Borrar credenciales guardadas',
        smtpConfigured: '✅ Configurado en este dispositivo',
        smtpNotConfigured: '⚠️ Aún no configurado — no se enviarán recordatorios hasta que guardes valores válidos.',
        smtpSaved: 'Valores guardados y contraseña cifrada para este dispositivo.',
        smtpCleared: 'Se borraron las credenciales guardadas.',
        smtpTestSent: 'Correo de prueba enviado — revisa tu bandeja de entrada.',
        roleUser: 'Usuario',
        roleAdmin: 'Administrador',
        changeLanguage: 'Cambiar Idioma',
        langEn: 'Inglés',
        langEs: 'Español',
        searchPlaceholder: 'Buscar eventos, tareas o personas...',
        trash: 'Papelera',
        restore: 'Restaurar',
        deletePermanent: 'Eliminar Permanentemente',
        selected: 'seleccionados',
        confirmBulkRestore: '¿Restaurar {count} evento(s) seleccionados?',
        confirmBulkDelete: '¿Eliminar permanentemente {count} evento(s) seleccionados? Esta acción no se puede deshacer.',
        edit: 'Editar',
        updateEvent: 'Actualizar Evento',
        // Priority Map
        priorityLow: 'Baja',
        priorityMedium: 'Media',
        priorityHigh: 'Alta',
        priorityUrgent: 'Urgente',
        // Days of week
        sun: 'Dom',
        mon: 'Lun',
        tue: 'Mar',
        wed: 'Mié',
        thu: 'Jue',
        fri: 'Vie',
        sat: 'Sáb'
    }
};

function t(key) {
    return Translations[State.language][key] || key;
}

function tPriority(priority) {
    if (!priority) return priority;
    const key = 'priority' + priority.charAt(0).toUpperCase() + priority.slice(1);
    return t(key) || priority;
}

// ==========================================
// TASKMAIL ENTERPRISE - FRONTEND ENGINE
// ==========================================
const State = {
    currentUser: null,
    currentView: 'dashboard',
    tasks: [],
    searchQuery: '',
    selectedDate: formatLocalDate(new Date()),
    calendarDate: new Date(),
    language: localStorage.getItem('appLanguage') || 'es',
    taskFilter: 'all',
    categoryFilter: 'all',
    trashSelection: new Set(),
};

function formatLocalDate(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function applyTheme(theme) {
    document.body.classList.toggle('theme-dark', theme === 'dark');
}

// Initialize Application
function updateSidebarLanguage() {
    const navItems = document.querySelectorAll('.nav-item');
    const labels = {
        'dashboard': t('dashboard'),
        'calendar': t('calendar'),
        'tasks': t('tasks'),
        'trash': t('trash'),
        'settings': t('settings')
    };

    navItems.forEach(item => {
        const view = item.dataset.view;
        if (labels[view]) {
            const svg = item.querySelector('svg');
            item.innerHTML = '';
            if (svg) item.appendChild(svg);
            item.appendChild(document.createTextNode(' ' + labels[view]));
        }
    });

    const logoutBtn = document.querySelector('.btn-logout');
    if (logoutBtn) {
        const icon = logoutBtn.querySelector('svg');
        logoutBtn.innerHTML = '';
        if (icon) logoutBtn.appendChild(icon);
        logoutBtn.appendChild(document.createTextNode(' ' + t('signOut')));
    }

    const newEventBtn = document.getElementById('btn-new-event');
    if (newEventBtn) {
        const icon = newEventBtn.querySelector('svg');
        newEventBtn.innerHTML = '';
        if (icon) newEventBtn.appendChild(icon);
        newEventBtn.appendChild(document.createTextNode(' ' + t('newEvent')));
    }

    const searchInput = document.getElementById('globalSearch');
    if (searchInput) {
        searchInput.placeholder = t('searchPlaceholder');
    }
}

async function initApp() {
    try {
        document.body.classList.add('app-entering');
        const session = JSON.parse(localStorage.getItem('sesionActual'));
        if (!session) {
            window.location.href = 'login.html';
            return;
        }

        State.currentUser = session;
        const preferences = await window.api.settings.get();
        applyTheme(preferences.theme);
        await loadUserData();

        if (!State.userProfile || !State.userProfile.exists) {
            localStorage.removeItem('sesionActual');
            window.location.href = 'login.html';
            return;
        }

        // Ensure profile upload input exists
        if (!document.getElementById('profile-upload')) {
            const input = document.createElement('input');
            input.type = 'file';
            input.id = 'profile-upload';
            input.style.display = 'none';
            input.accept = 'image/*';
            input.onchange = handleProfilePicUpload;
            document.body.appendChild(input);
        }

        updateUserProfile();
        updateSidebarLanguage();

        setupEventListeners();
        startClock();
        renderView(State.currentView);
        window.requestAnimationFrame(() => document.body.classList.add('app-ready'));
    } catch (error) {
        console.error('Initialization error:', error);
        cerrarSesion();
    }
}

function normalizeUiTask(task = {}) {
    if (!task || typeof task !== 'object') return null;

    const safeTitle = task.title ?? task.nombre ?? task.eventName ?? 'Sin título';
    const safeDate = task.date ?? task.fecha ?? task.day ?? '';
    const safeTime = task.time ?? task.hora ?? '';
    const safeDesc = task.description ?? task.descripcion ?? task.details ?? '';
    const safeCategory = task.category ?? task.categoria ?? task.type ?? 'general';
    const safeRecurrence = task.recurrence ?? task.repeticion ?? 'none';
    const safePriority = (task.priority ?? task.prioridad ?? 'medium').toString().toLowerCase();
    const safeStatus = (task.status ?? task.estado ?? 'todo').toString().toLowerCase();

    // Normaliza strings vacíos sin romper tareas válidas.
    const normalizedPriority = ['low', 'medium', 'high', 'urgent'].includes(safePriority) ? safePriority : 'medium';
    const normalizedStatus = ['todo', 'completed', 'in-progress'].includes(safeStatus) ? safeStatus : 'todo';

    return {
        id: task.id || task._id || `task-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        title: String(safeTitle || 'Sin título'),
        date: String(safeDate || ''),
        time: String(safeTime || ''),
        description: String(safeDesc || ''),
        duration: Number(task.duration ?? task.duracion ?? 60),
        location: String(task.location ?? task.ubicacion ?? ''),
        url: String(task.url ?? task.enlace ?? ''),
        priority: normalizedPriority,
        status: normalizedStatus,
        category: String(safeCategory || 'general'),
        tags: Array.isArray(task.tags) ? task.tags : [],
        recurrence: String(safeRecurrence),
        recurrenceEnd: String(task.recurrenceEnd ?? task.finRepeticion ?? ''),
        reminderMinutes: Number(task.reminderMinutes ?? 0),
        emailEnabled: task.emailEnabled !== false,
        createdAt: task.createdAt || Date.now(),
        updatedAt: task.updatedAt || task.createdAt || Date.now(),
    };
}

function getSafeTaskList(rawTasks) {
    if (!Array.isArray(rawTasks)) return [];
    return rawTasks.map(normalizeUiTask).filter(Boolean);
}

async function loadUserData() {
    const data = await window.api.user.getData(State.currentUser.usuario);
    const taskList = getSafeTaskList(Array.isArray(data?.tasks) ? data.tasks : Array.isArray(data?.tareas) ? data.tareas : []);
    State.tasks = taskList;
    State.userProfile = {
        ...data,
        exists: !!data,
        tasks: State.tasks,
        deletedTasks: Array.isArray(data?.deletedTasks) ? data.deletedTasks : Array.isArray(data?.papelera) ? data.papelera : [],
        emails: Array.isArray(data?.emails) ? data.emails : Array.isArray(data?.destinatarios) ? data.destinatarios : []
    };
}

function updateUserProfile() {
    const username = State.currentUser.usuario;
    const nameElement = document.getElementById('sidebarUserName');
    const avatarElement = document.getElementById('userAvatar');
    const roleElement = document.getElementById('sidebarUserRole');

    if (nameElement) {
        nameElement.textContent = username.charAt(0).toUpperCase() + username.slice(1);
    }

    if (avatarElement) {
        if (State.userProfile && State.userProfile.profilePic) {
            avatarElement.style.backgroundImage = `url(${State.userProfile.profilePic})`;
            avatarElement.style.backgroundSize = 'cover';
            avatarElement.style.backgroundPosition = 'center';
            avatarElement.textContent = '';
        } else {
            avatarElement.style.backgroundImage = 'none';
            const initials = username.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
            avatarElement.textContent = initials || username.charAt(0).toUpperCase();
        }

        avatarElement.onclick = () => {
            const input = document.getElementById('profile-upload');
            if (input) input.click();
        };
    }

    if (roleElement) {
        roleElement.textContent = State.currentUser.rol === 'admin' ? t('roleAdmin') : t('roleUser');
    }
}

async function handleProfilePicUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
        const base64 = event.target.result;
        const result = await window.api.user.updateProfilePic(State.currentUser.usuario, base64);
        if (result.success) {
            State.userProfile = { ...State.userProfile, profilePic: base64 };
            updateUserProfile();
        }
    };
    reader.readAsDataURL(file);
}

// ==========================================
// VIEW ROUTER
// ==========================================
function renderView(viewName) {
    State.currentView = viewName;

    // Update sidebar active state
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === viewName);
    });

    const container = document.getElementById('view-container');
    container.innerHTML = ''; // Clear current view

    switch (viewName) {
        case 'dashboard':
        case 'calendar': // El calendario ahora vive dentro del Dashboard
            renderDashboard(container);
            break;
        case 'tasks':
            renderTaskManager(container);
            break;
        case 'trash':
            renderTrash(container);
            break;
        case 'settings':
            renderSettings(container);
            break;
        default:
            renderDashboard(container);
    }
}

// ==========================================
// VIEW: DASHBOARD
// ==========================================
async function renderDashboard(container) {
    const statsResponse = await window.api.user.getStats(State.currentUser.usuario);
    const stats = statsResponse && statsResponse.success === true ? (statsResponse.stats || {}) : (statsResponse || {});

    const today = formatLocalDate(new Date());
    const todayTasks = State.tasks.filter(t => t.date === today);
    const urgentTasks = todayTasks.filter(t => t.priority === 'urgent' || t.priority === 'high');
    const upcomingTasks = State.tasks.filter(t => t.date > today && t.status !== 'completed').sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`)).slice(0, 4);
    const overdueTasks = State.tasks.filter(t => t.date && t.date < today && t.status !== 'completed').length;

    container.innerHTML = `
        <div class="view-intro">
            <div>
                <span class="view-kicker">TASKMAIL / ${formatLocalDate(new Date())}</span>
                <h1>${t('dashboard')}</h1>
                <p>${State.currentUser.usuario}, aquí tienes el pulso de tus eventos.</p>
            </div>
            <div class="view-intro-mark">✦</div>
        </div>
        <div class="dashboard-grid">
            <div class="stats-card">
                <h3>${t('totalEvents')}</h3>
                <div class="stats-value">${stats.total ?? 0}</div>
            </div>
            <div class="stats-card">
                <h3>${t('completed')}</h3>
                <div class="stats-value" style="color: var(--color-success)">${stats.completed ?? 0}</div>
            </div>
            <div class="stats-card">
                <h3>${t('urgentTasks')}</h3>
                <div class="stats-value" style="color: var(--color-danger)">${stats.urgent ?? 0}</div>
            </div>
            <div class="stats-card">
                <h3>${t('overdue')}</h3>
                <div class="stats-value" style="color: var(--color-warning)">${overdueTasks}</div>
            </div>
        </div>

        <div class="dashboard-main-section">
            <div class="focus-panel">
                <div class="panel-header">
                    <h2>${t('todayFocus')}</h2>
                </div>
                <div class="focus-list">
                    ${urgentTasks.length > 0
                        ? urgentTasks.map(t => `
                            <div class="focus-item">
                                <div class="priority-badge priority-${t.priority}">${tPriority(t.priority)}</div>
                                <div class="focus-item-info">
                                    <div class="focus-item-title">${t.title}</div>
                                    <div class="focus-item-desc">${t.description || 'No description'}</div>
                                </div>
                            </div>
                        `).join('')
                        : `<p style="color: var(--text-secondary); text-align: center; padding: 20px;">${t('noEvents')}</p>`
                    }
                </div>
            </div>
            <div class="upcoming-panel">
                <div class="panel-header">
                    <h2>${t('upcoming')}</h2>
                </div>
                <div class="upcoming-list">
                    ${upcomingTasks.length ? upcomingTasks.map(task => `<button class="upcoming-item" onclick="selectCalendarDate('${task.date}')"><span>${task.date}</span><b>${task.title}</b><small>${task.time || '--:--:--'}</small></button>`).join('') : `<p class="empty-state">${t('noEvents')}</p>`}
                </div>
                <button class="btn-primary dashboard-action" onclick="openNewEventModal()">+ ${t('newEvent')}</button>
            </div>
        </div>

        <div class="calendar-layout" style="margin-top: 24px;">
            <div class="calendar-wrapper">
                <div class="calendar-controls">
                    <button id="btn-prev-month" class="btn-icon-nav">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    </button>
                    <h2 id="month-display">Calendar</h2>
                    <button id="btn-next-month" class="btn-icon-nav">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>
                </div>
                <div class="calendar-days-header">
                    <span>${t('sun')}</span><span>${t('mon')}</span><span>${t('tue')}</span><span>${t('wed')}</span><span>${t('thu')}</span><span>${t('fri')}</span><span>${t('sat')}</span>
                </div>
                <div class="calendar-grid" id="cal-grid"></div>
            </div>
            <div class="event-detail-panel">
                <div id="detail-content">
                    <h3 style="margin-bottom: 12px;">${t('eventDetails')}</h3>
                    <p style="color: var(--text-secondary); font-size: 13px;">${t('selectDate')}</p>
                </div>
            </div>
        </div>
    `;

    renderCalendarGrid();
}

// ==========================================
// CALENDARIO (integrado en el Dashboard)
// ==========================================
function renderCalendarGrid() {
    const tasks = Array.isArray(State.tasks) ? State.tasks : [];

    const monthDisplay = document.getElementById('month-display');
    const grid = document.getElementById('cal-grid');
    if (!monthDisplay || !grid) return; // La vista actual no incluye el calendario

    const year = State.calendarDate.getFullYear();
    const month = State.calendarDate.getMonth();

    const locale = State.language === 'es' ? 'es-ES' : 'en-US';
    monthDisplay.textContent = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(State.calendarDate);

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    grid.innerHTML = '';

    // Empty days for previous month
    for (let i = 0; i < firstDayOfMonth; i++) {
        const empty = document.createElement('div');
        empty.className = 'cal-day empty';
        grid.appendChild(empty);
    }

    // Actual days
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayEl = document.createElement('div');
        dayEl.className = 'cal-day';
        dayEl.textContent = day;

        // Highlight if it's today
        if (dateStr === formatLocalDate(new Date())) {
            dayEl.style.border = '2px solid var(--bg-accent)';
        }

        // Highlight if it has events
        const hasEvents = tasks.some(t => t.date === dateStr);
        if (hasEvents) {
            dayEl.classList.add('has-event');
        }

        // Highlight if selected
        if (dateStr === State.selectedDate) {
            dayEl.classList.add('selected');
        }

        dayEl.onclick = () => selectCalendarDate(dateStr);
        grid.appendChild(dayEl);
    }

    document.getElementById('btn-prev-month').onclick = () => {
        State.calendarDate.setMonth(State.calendarDate.getMonth() - 1);
        renderCalendarGrid();
    };
    document.getElementById('btn-next-month').onclick = () => {
        State.calendarDate.setMonth(State.calendarDate.getMonth() + 1);
        renderCalendarGrid();
    };

    // Initial detail load if date is selected
    selectCalendarDate(State.selectedDate, false);
}

async function selectCalendarDate(dateStr, updateView = true) {
    State.selectedDate = dateStr;
    const detailContent = document.getElementById('detail-content');
    if (!detailContent) return;
    const tasks = Array.isArray(State.tasks) ? State.tasks : [];

    const eventsToday = tasks.filter(t => t.date === dateStr);

    let html = `<h3 style="margin-bottom: 16px;">${t('eventsFor')} ${dateStr}</h3>`;

    if (eventsToday.length > 0) {
        html += `<div class="focus-list">
            ${eventsToday.map(task => `
                <div class="focus-item">
                    <div class="priority-badge priority-${task.priority}">${tPriority(task.priority)}</div>
                    <div class="focus-item-info">
                        <div class="focus-item-title">${task.title}</div>
                        <div class="focus-item-desc">${task.description || 'No description'}${task.time ? ` · ${t('time')}: ${task.time}` : ''}</div>
                    </div>
                </div>
            `).join('')}
        </div>`;
    } else {
        html += `<p style="color: var(--text-secondary); font-size: 13px;">${t('noEvents')}</p>`;
    }

    html += `<div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid var(--border-subtle)"><p style="color: var(--text-secondary); font-size: 13px; margin: 0;">${t('createEventHeader')} se gestiona desde el botón superior.</p></div>`;

    detailContent.innerHTML = html;

    if (updateView) renderCalendarGrid();
}

// ==========================================
// VIEW: TASK MANAGER
// ==========================================
async function renderTaskManager(container) {
    // 1. Carga forzada de datos para asegurar que no esté vacío
    await loadUserData();

    const taskList = Array.isArray(State.tasks) ? State.tasks : [];

    console.log('--- DIAGNÓSTICO GESTOR DE TAREAS ---');
    console.log('Usuario actual:', State.currentUser?.usuario);
    console.log('Total de tareas en State.tasks:', taskList.length);
    console.log('Query de búsqueda actual:', `"${State.searchQuery}"`);

    // 2. Filtro simplificado con validación extra
    const today = formatLocalDate(new Date());
    const filteredTasks = taskList.filter(t => {
        if (State.taskFilter === 'today' && t.date !== today) return false;
        if (State.taskFilter === 'upcoming' && (!t.date || t.date < today || t.status === 'completed')) return false;
        if (State.taskFilter === 'overdue' && (!t.date || t.date >= today || t.status === 'completed')) return false;
        if (State.taskFilter === 'completed' && t.status !== 'completed') return false;
        if (State.categoryFilter !== 'all' && t.category !== State.categoryFilter) return false;
        if (!State.searchQuery) return true;

        const title = (t.title || '').toLowerCase();
        const desc = (t.description || '').toLowerCase();
        const query = State.searchQuery.toLowerCase();

        return title.includes(query) || desc.includes(query);
    });

    console.log('Tareas después del filtro:', filteredTasks.length);
    console.log('----------------------------------');

    container.innerHTML = `
        <div class="task-manager-container">
            <div style="padding: 20px; display: flex; justify-content: space-between; align-items: center; background: var(--bg-surface); border-bottom: 1px solid var(--border-subtle);">
                <h2 style="font-size: 18px; font-weight: 600;">${t('tasks')}</h2>
                <div class="task-filters">
                    <select id="task-filter">
                        <option value="all">${t('all')}</option>
                        <option value="today">${t('today')}</option>
                        <option value="upcoming">${t('upcoming')}</option>
                        <option value="overdue">${t('overdue')}</option>
                        <option value="completed">${t('completed')}</option>
                    </select>
                    <select id="category-filter"><option value="all">${t('category')}</option>${[...new Set(taskList.map(task => task.category))].map(category => `<option value="${category}">${category}</option>`).join('')}</select>
                </div>
            </div>
            <table class="task-table">
                <thead>
                    <tr>
                        <th>${t('eventName')}</th>
                        <th>${t('date')}</th>
                        <th>${t('time')}</th>
                        <th>${t('priority')}</th>
                        <th>${t('status')}</th>
                        <th>${t('actions')}</th>
                    </tr>
                </thead>
                <tbody id="task-table-body">
                    ${filteredTasks.length > 0
                        ? filteredTasks.map(task => `
                            <tr>
                                <td>${task.title}</td>
                                <td>${task.date}</td>
                                <td>${task.time || '--:--:--'}</td>
                                <td><span class="priority-badge priority-${task.priority}">${tPriority(task.priority)}</span></td>
                                <td><span class="status-pill ${task.status === 'completed' ? 'status-completed' : ''}">${task.status}</span></td>
                                <td>
                                    <div style="display: flex; gap: 8px; align-items: center;">
                                        <button onclick="toggleTaskStatus('${task.id}')" style="background: transparent; border: none; color: var(--bg-accent); cursor: pointer; font-size: 12px;">
                                            ${task.status === 'completed' ? t('undo') : t('complete')}
                                        </button>
                                        <button onclick="openEditEventModal('${task.id}')" style="background: transparent; border: none; color: var(--text-secondary); cursor: pointer; font-size: 12px;">
                                            ${t('edit')}
                                        </button>
                                        <button onclick="deleteTask('${task.id}')" style="background: transparent; border: none; color: var(--color-danger); cursor: pointer; font-size: 12px;">
                                            ${t('trash')}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')
                        : `<tr><td colspan="6" style="text-align: center; padding: 40px; color: var(--text-secondary)">
                            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.5;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                <p>${t('noTasks')}</p>
                            </div>
                        </td></tr>`
                    }
                </tbody>
            </table>
        </div>
    `;

    document.getElementById('task-filter').value = State.taskFilter;
    document.getElementById('category-filter').value = State.categoryFilter;
    document.getElementById('task-filter').onchange = event => { State.taskFilter = event.target.value; renderView('tasks'); };
    document.getElementById('category-filter').onchange = event => { State.categoryFilter = event.target.value; renderView('tasks'); };
}

async function toggleTaskStatus(taskId) {
    const task = State.tasks.find(item => item.id === taskId);
    if (!task) return;
    const nextStatus = task.status === 'completed' ? 'todo' : 'completed';
    const result = await window.api.user.setTaskStatus(State.currentUser.usuario, taskId, nextStatus);
    if (result.success) {
        await loadUserData();
        renderView(State.currentView);
    }
}

// ==========================================
// TASK HELPERS (DELETE, RESTORE, PERMANENT)
// ==========================================
async function deleteTask(taskId) {
    console.log('Intentando eliminar tarea:', taskId);
    if (!confirm('¿Estás seguro de mover esta tarea a la papelera?')) return;

    try {
        const result = await window.api.user.deleteTask(State.currentUser.usuario, taskId);
        console.log('Resultado de eliminar tarea:', result);
        if (result.success) {
            await loadUserData();
            renderView(State.currentView);
        } else {
            alert('Error al eliminar tarea: ' + result.error);
        }
    } catch (error) {
        console.error('Error crítico al eliminar tarea:', error);
        alert('Ocurrió un error inesperado al intentar eliminar la tarea.');
    }
}

async function restoreTask(taskId) {
    console.log('Intentando restaurar tarea:', taskId);
    try {
        const result = await window.api.user.restoreTask(State.currentUser.usuario, taskId);
        console.log('Resultado de restaurar tarea:', result);
        if (result.success) {
            await loadUserData();
            renderView(State.currentView);
        } else {
            alert('Error al restaurar tarea: ' + result.error);
        }
    } catch (error) {
        console.error('Error crítico al restaurar tarea:', error);
        alert('Ocurrió un error inesperado al intentar restaurar la tarea.');
    }
}

async function permanentDeleteTask(taskId) {
    console.log('Intentando eliminar permanentemente tarea:', taskId);
    if (!confirm('¿Estás seguro de eliminar esta tarea permanentemente? Esta acción no se puede deshacer.')) return;

    try {
        const result = await window.api.user.permanentDelete(State.currentUser.usuario, taskId);
        console.log('Resultado de eliminación permanente:', result);
        if (result.success) {
            await loadUserData();
            renderView(State.currentView);
        } else {
            alert('Error al eliminar permanentemente: ' + result.error);
        }
    } catch (error) {
        console.error('Error crítico al eliminar permanentemente:', error);
        alert('Ocurrió un error inesperado al eliminar permanentemente la tarea.');
    }
}

async function openEditEventModal(taskId) {
    const task = State.tasks.find(t => t.id === taskId);
    if (!task) return;

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    overlay.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${t('updateEvent')}</h2>
                <button class="modal-close" id="modal-close">&times;</button>
            </div>
            <form class="modal-form" id="edit-event-form">
                <div class="modal-field">
                    <label>${t('eventName')}</label>
                    <input type="text" id="edit-title" value="${task.title}" required>
                </div>
                <div class="modal-field">
                    <label>${t('date')}</label>
                    <input type="date" id="edit-date" value="${task.date}" required>
                </div>
                <div class="modal-field">
                    <label>${t('time')}</label>
                    <input type="time" id="edit-time" value="${task.time || '12:00:00'}" step="1">
                </div>
                <div class="modal-field modal-grid-two">
                    <div><label>${t('category')}</label><input type="text" id="edit-category" value="${task.category}"></div>
                    <div><label>${t('recurrence')}</label><select id="edit-recurrence"><option value="none">${t('noRepeat')}</option><option value="daily">${t('daily')}</option><option value="weekly">${t('weekly')}</option><option value="monthly">${t('monthly')}</option><option value="yearly">${t('yearly')}</option></select></div>
                </div>
                <div class="modal-grid-two">
                    <div class="modal-field"><label>Duración (min)</label><input type="number" id="edit-duration" min="1" value="${task.duration || 60}"></div>
                    <div class="modal-field"><label>Minutos de aviso</label><input type="number" id="edit-reminder" min="0" value="${task.reminderMinutes || 0}"></div>
                </div>
                <div class="modal-grid-two">
                    <div class="modal-field"><label>Ubicación</label><input type="text" id="edit-location" value="${task.location || ''}"></div>
                    <div class="modal-field"><label>Enlace</label><input type="url" id="edit-url" value="${task.url || ''}"></div>
                </div>
                <div class="modal-field">
                    <label>${t('emailPrefs')}</label>
                    <textarea id="edit-desc" rows="3">${task.description || ''}</textarea>
                </div>
                <div class="modal-field">
                    <label>${t('priority')}</label>
                    <select id="edit-priority">
                        <option value="low" ${task.priority === 'low' ? 'selected' : ''}>Low</option>
                        <option value="medium" ${task.priority === 'medium' ? 'selected' : ''}>Medium</option>
                        <option value="high" ${task.priority === 'high' ? 'selected' : ''}>High</option>
                        <option value="urgent" ${task.priority === 'urgent' ? 'selected' : ''}>Urgent</option>
                    </select>
                </div>
                <div class="modal-actions">
                    <button type="button" class="btn-logout" id="modal-cancel">${t('undo')}</button>
                    <button type="submit" class="btn-primary" style="padding: 10px 24px;">${t('saveEvent')}</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(overlay);

    const closeBtn = document.getElementById('modal-close');
    const cancelBtn = document.getElementById('modal-cancel');
    const form = document.getElementById('edit-event-form');

    const closeModal = () => {
        overlay.remove();
        document.removeEventListener('keydown', onKeyDown);
    };
    const onKeyDown = (e) => { if (e.key === 'Escape') closeModal(); };
    document.addEventListener('keydown', onKeyDown);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });

    closeBtn.onclick = closeModal;
    cancelBtn.onclick = closeModal;

    form.onsubmit = async (e) => {
        e.preventDefault();
        const updatedFields = {
            title: document.getElementById('edit-title').value,
            date: document.getElementById('edit-date').value,
            time: document.getElementById('edit-time').value,
            category: document.getElementById('edit-category').value || 'general',
            recurrence: document.getElementById('edit-recurrence').value,
            duration: Number(document.getElementById('edit-duration').value) || 60,
            reminderMinutes: Number(document.getElementById('edit-reminder').value) || 0,
            location: document.getElementById('edit-location').value,
            url: document.getElementById('edit-url').value,
            description: document.getElementById('edit-desc').value,
            priority: document.getElementById('edit-priority').value,
        };

        const result = await window.api.user.updateTask(State.currentUser.usuario, taskId, updatedFields);
        if (result.success) {
            await loadUserData();
            renderView(State.currentView);
            closeModal();
        }
    };

    document.getElementById('edit-recurrence').value = task.recurrence || 'none';
}

async function renderTrash(container) {
    await loadUserData();
    const deletedTasks = State.userProfile.deletedTasks || [];
    State.trashSelection = new Set(); // Limpia la selección cada vez que se entra/recarga la vista

    container.innerHTML = `
        <div class="task-manager-container">
            <div style="padding: 20px; display: flex; justify-content: space-between; align-items: center; background: var(--bg-surface); border-bottom: 1px solid var(--border-subtle); gap: 16px; flex-wrap: wrap;">
                <h2 style="font-size: 18px; font-weight: 600;">${t('trash')}</h2>
                <div id="trash-bulk-bar" style="display: none; align-items: center; gap: 12px;">
                    <span id="trash-selection-count" style="font-size: 13px; color: var(--text-secondary);"></span>
                    <button id="btn-bulk-restore" class="btn-save btn-secondary" type="button" style="padding: 8px 14px;">${t('restore')}</button>
                    <button id="btn-bulk-delete" class="btn-save" type="button" style="padding: 8px 14px; background: var(--color-danger); border-color: var(--color-danger);">${t('deletePermanent')}</button>
                </div>
            </div>
            <table class="task-table">
                <thead>
                    <tr>
                        <th style="width: 36px;"><input type="checkbox" id="trash-select-all" ${deletedTasks.length === 0 ? 'disabled' : ''}></th>
                        <th>${t('eventName')}</th>
                        <th>${t('date')}</th>
                        <th>${t('time')}</th>
                        <th>${t('priority')}</th>
                        <th>${t('actions')}</th>
                    </tr>
                </thead>
                <tbody id="trash-table-body">
                    ${deletedTasks.length > 0
                        ? deletedTasks.map(task => `
                            <tr>
                                <td><input type="checkbox" class="trash-row-check" data-id="${task.id}"></td>
                                <td>${task.title}</td>
                                <td>${task.date}</td>
                                <td>${task.time || '--:--:--'}</td>
                                <td><span class="priority-badge priority-${task.priority}">${tPriority(task.priority)}</span></td>
                                <td>
                                    <div style="display: flex; gap: 8px; align-items: center;">
                                        <button onclick="restoreTask('${task.id}')" style="background: transparent; border: none; color: var(--bg-accent); cursor: pointer; font-size: 12px;">
                                            ${t('restore')}
                                        </button>
                                        <button onclick="permanentDeleteTask('${task.id}')" style="background: transparent; border: none; color: var(--color-danger); cursor: pointer; font-size: 12px;">
                                            ${t('deletePermanent')}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')
                        : `<tr><td colspan="6" style="text-align: center; padding: 40px; color: var(--text-secondary)">
                            <p>${t('noEvents')}</p>
                        </td></tr>`
                    }
                </tbody>
            </table>
        </div>
    `;

    const selectAllCheckbox = document.getElementById('trash-select-all');
    const rowCheckboxes = () => Array.from(document.querySelectorAll('.trash-row-check'));
    const bulkBar = document.getElementById('trash-bulk-bar');
    const selectionCount = document.getElementById('trash-selection-count');
    const bulkRestoreBtn = document.getElementById('btn-bulk-restore');
    const bulkDeleteBtn = document.getElementById('btn-bulk-delete');

    const refreshBulkBar = () => {
        const total = rowCheckboxes().length;
        const selected = State.trashSelection.size;

        if (selectAllCheckbox) {
            selectAllCheckbox.checked = total > 0 && selected === total;
            selectAllCheckbox.indeterminate = selected > 0 && selected < total;
        }

        if (bulkBar) bulkBar.style.display = selected > 0 ? 'flex' : 'none';
        if (selectionCount) selectionCount.textContent = `${selected} ${t('selected')}`;
    };

    rowCheckboxes().forEach(cb => {
        cb.addEventListener('change', () => {
            if (cb.checked) State.trashSelection.add(cb.dataset.id);
            else State.trashSelection.delete(cb.dataset.id);
            refreshBulkBar();
        });
    });

    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', () => {
            rowCheckboxes().forEach(cb => {
                cb.checked = selectAllCheckbox.checked;
                if (selectAllCheckbox.checked) State.trashSelection.add(cb.dataset.id);
                else State.trashSelection.delete(cb.dataset.id);
            });
            refreshBulkBar();
        });
    }

    if (bulkRestoreBtn) {
        bulkRestoreBtn.addEventListener('click', () => bulkRestoreTasks([...State.trashSelection]));
    }
    if (bulkDeleteBtn) {
        bulkDeleteBtn.addEventListener('click', () => bulkPermanentDeleteTasks([...State.trashSelection]));
    }

    refreshBulkBar();
}

async function bulkRestoreTasks(taskIds) {
    if (!taskIds.length) return;
    if (!confirm(t('confirmBulkRestore').replace('{count}', taskIds.length))) return;

    try {
        for (const taskId of taskIds) {
            const result = await window.api.user.restoreTask(State.currentUser.usuario, taskId);
            if (!result.success) console.error('Error al restaurar', taskId, result.error);
        }
        await loadUserData();
        renderView('trash');
    } catch (error) {
        console.error('Error crítico al restaurar en lote:', error);
        alert('Ocurrió un error inesperado al restaurar los eventos seleccionados.');
    }
}

async function bulkPermanentDeleteTasks(taskIds) {
    if (!taskIds.length) return;
    if (!confirm(t('confirmBulkDelete').replace('{count}', taskIds.length))) return;

    try {
        for (const taskId of taskIds) {
            const result = await window.api.user.permanentDelete(State.currentUser.usuario, taskId);
            if (!result.success) console.error('Error al eliminar permanentemente', taskId, result.error);
        }
        await loadUserData();
        renderView('trash');
    } catch (error) {
        console.error('Error crítico al eliminar en lote:', error);
        alert('Ocurrió un error inesperado al eliminar los eventos seleccionados.');
    }
}

// ==========================================
// VIEW: CALENDAR (Full Implementation)
// ==========================================
// (El calendario ahora se renderiza como parte del Dashboard — ver renderCalendarGrid)

// ==========================================
// VIEW: SETTINGS
// ==========================================
const SMTP_PROVIDER_DEFAULTS = {
    gmail: { host: 'smtp.gmail.com', port: 587, encryption: 'starttls' },
    office365: { host: 'smtp.office365.com', port: 587, encryption: 'starttls' },
    custom: { host: '', port: 587, encryption: 'starttls' }
};
const SMTP_ENCRYPTION_PORTS = { starttls: 587, ssl: 465, none: 25 };

async function renderSettings(container) {
    const userData = await window.api.user.getData(State.currentUser.usuario);
    const settings = await window.api.settings.get();
    const smtpStatus = await window.api.smtp.get();
    const deliveryTime = `${String(settings?.notificationHour ?? 3).padStart(2, '0')}:${String(settings?.notificationMinute ?? 0).padStart(2, '0')}`;
    const emails = Array.isArray(userData?.emails) ? userData.emails : Array.isArray(userData?.destinatarios) ? userData.destinatarios : [];

    const smtpProvider = smtpStatus?.provider || 'gmail';
    const smtpEncryption = smtpStatus?.encryption || 'starttls';

    container.innerHTML = `
        <div class="settings-container">
            <div class="settings-section">
                <h2>${t('notificationSettings')}</h2>
                <div class="field-group">
                    <label>${t('dailyDelivery')}</label>
                    <div style="display: flex; gap: 10px;">
                        <input type="time" id="setting-time" value="${deliveryTime}">
                        <button class="btn-save" id="btn-save-time">${t('saveTime')}</button>
                    </div>
                </div>
            </div>
            <div class="settings-section">
                <h2>${t('smtpTitle')}</h2>
                <p class="settings-help">${t('smtpHelp')}</p>
                <div class="field-group" id="smtp-lock-row" style="background: rgba(227, 101, 80, 0.08); border: 1px solid rgba(227, 101, 80, 0.25); border-radius: var(--radius-sm); padding: 14px;">
                    <label>🔒 Confirma tu contraseña de TaskMail para editar estos ajustes</label>
                    <div style="display: flex; gap: 8px;">
                        <input type="password" id="smtp-unlock-pass" placeholder="Tu contraseña de la cuenta" autocomplete="off" style="flex: 1;">
                        <button class="btn-save" id="btn-unlock-smtp" type="button">Desbloquear</button>
                    </div>
                    <span class="field-error" id="smtp-unlock-error"></span>
                </div>
                <fieldset id="smtp-fields" disabled style="border: none; padding: 0; margin: 0; opacity: 0.55;">
                <div class="field-group">
                    <label>${t('smtpProviderLabel')}</label>
                    <select id="smtp-provider">
                        <option value="gmail" ${smtpProvider === 'gmail' ? 'selected' : ''}>${t('smtpProviderGmail')}</option>
                        <option value="office365" ${smtpProvider === 'office365' ? 'selected' : ''}>${t('smtpProviderOffice365')}</option>
                        <option value="custom" ${smtpProvider === 'custom' ? 'selected' : ''}>${t('smtpProviderCustom')}</option>
                    </select>
                </div>
                <div class="field-group">
                    <label>${t('smtpHostLabel')}</label>
                    <input type="text" id="smtp-host" placeholder="smtp.ejemplo.com" value="${smtpStatus?.host || ''}">
                </div>
                <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                    <div class="field-group" style="flex: 1; min-width: 120px;">
                        <label>${t('smtpPortLabel')}</label>
                        <input type="number" id="smtp-port" min="1" max="65535" value="${smtpStatus?.port || 587}">
                    </div>
                    <div class="field-group" style="flex: 2; min-width: 220px;">
                        <label>${t('smtpEncryptionLabel')}</label>
                        <select id="smtp-encryption">
                            <option value="starttls" ${smtpEncryption === 'starttls' ? 'selected' : ''}>${t('smtpEncryptionStarttls')}</option>
                            <option value="ssl" ${smtpEncryption === 'ssl' ? 'selected' : ''}>${t('smtpEncryptionSsl')}</option>
                            <option value="none" ${smtpEncryption === 'none' ? 'selected' : ''}>${t('smtpEncryptionNone')}</option>
                        </select>
                    </div>
                </div>
                <div class="field-group">
                    <label>${t('smtpEmailLabel')}</label>
                    <input type="email" id="smtp-user" placeholder="correo@dominio.com" value="${smtpStatus?.user || ''}">
                </div>
                <div class="field-group">
                    <label>${t('smtpPasswordLabel')}</label>
                    <input type="password" id="smtp-pass" placeholder="${t('smtpPasswordPlaceholder')}" autocomplete="off">
                </div>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    <button class="btn-save" id="btn-save-smtp">${t('smtpSave')}</button>
                    <button class="btn-save btn-secondary" id="btn-test-smtp">${t('smtpTest')}</button>
                    <button class="btn-save btn-secondary" id="btn-clear-smtp">${t('smtpClear')}</button>
                </div>
                </fieldset>
                <p id="smtp-status" class="settings-help" style="color: ${smtpStatus?.configured ? 'var(--color-success)' : '#e36550'};">${smtpStatus?.configured ? t('smtpConfigured') : t('smtpNotConfigured')}</p>
                <p id="smtp-feedback" class="settings-feedback" role="status"></p>
            </div>
            <div class="settings-section">
                <h2>${t('profile')}</h2>
                <div class="field-group">
                    <label>${t('username')}</label>
                    <input type="text" value="${State.currentUser.usuario}" disabled>
                </div>
                <div class="field-group">
                    <label>${t('emailPrefs')}</label>
                    <div id="email-list" style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px;">
                        ${emails.map(e => `<div style="font-size: 13px; color: var(--text-secondary)">${e}</div>`).join('') || '<div style="font-size: 13px; color: var(--text-secondary)">No emails configured</div>'}
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <input type="email" id="new-email" placeholder="Add new email...">
                        <button class="btn-save" id="btn-add-email">${t('addEmail')}</button>
                    </div>
                </div>
            </div>
            <div class="settings-section">
                <h2>${t('changeLanguage')}</h2>
                <div class="field-group">
                    <select id="lang-selector" style="padding: 12px; background: var(--bg-canvas); border: 1px solid var(--border-subtle); color: white; border-radius: var(--radius-sm); width: 100%;">
                        <option value="en" ${State.language === 'en' ? 'selected' : ''}>${t('langEn')}</option>
                        <option value="es" ${State.language === 'es' ? 'selected' : ''}>${t('langEs')}</option>
                    </select>
                </div>
            </div>
            <div class="settings-section">
                <h2>${t('appearance')}</h2>
                <label class="settings-toggle"><span><b>${t('darkTheme')}</b><small>Usa una interfaz oscura con menos luz visual.</small></span><input type="checkbox" id="setting-dark-theme" ${settings.theme === 'dark' ? 'checked' : ''}><i></i></label>
                <label class="settings-toggle"><span><b>${t('backgroundMode')}</b><small>Al cerrar la ventana, conserva los recordatorios activos.</small></span><input type="checkbox" id="setting-background" ${settings.runInBackground !== false ? 'checked' : ''}><i></i></label>
                <label class="settings-toggle"><span><b>${t('startWithWindows')}</b><small>Inicia TaskMail al entrar a Windows y se queda en la bandeja.</small></span><input type="checkbox" id="setting-startup" ${settings.startWithWindows === true ? 'checked' : ''}><i></i></label>
                <p id="settings-feedback" class="settings-feedback" role="status"></p>
            </div>
            <div class="settings-section">
                <h2>Datos y preferencias</h2>
                <div class="settings-actions-grid">
                    <button class="btn-save" id="btn-export-data">${t('exportData')}</button>
                    <button class="btn-save btn-secondary" id="btn-import-data">${t('importData')}</button>
                </div>
                <p class="settings-help">Conserva tus eventos y destinatarios en un archivo JSON para restaurarlos cuando lo necesites.</p>
            </div>
        </div>
    `;

    document.getElementById('btn-save-time').addEventListener('click', async () => {
        const time = document.getElementById('setting-time').value;
        const [hour, minute] = time.split(':');
        await window.api.settings.updateTime(hour, minute);
        alert('Time updated successfully!');
    });

    const savePreferences = async () => {
        const result = await window.api.settings.updatePreferences({
            theme: document.getElementById('setting-dark-theme').checked ? 'dark' : 'light',
            runInBackground: document.getElementById('setting-background').checked,
            startWithWindows: document.getElementById('setting-startup').checked
        });
        const feedback = document.getElementById('settings-feedback');
        if (!result.success) {
            if (feedback) feedback.textContent = `No se pudo guardar: ${result.error}`;
            return;
        }
        applyTheme(result.settings.theme);
        if (feedback) {
            feedback.textContent = 'Preferencias guardadas';
            feedback.classList.add('is-visible');
            window.setTimeout(() => feedback.classList.remove('is-visible'), 2200);
        }
    };
    document.getElementById('setting-dark-theme').addEventListener('change', savePreferences);
    document.getElementById('setting-background').addEventListener('change', savePreferences);
    document.getElementById('setting-startup').addEventListener('change', savePreferences);

    // Los campos SMTP empiezan bloqueados; solo se habilitan si se confirma
    // la contraseña de la cuenta de TaskMail (no la del correo SMTP).
    const smtpFields = document.getElementById('smtp-fields');
    const unlockBtn = document.getElementById('btn-unlock-smtp');
    const unlockInput = document.getElementById('smtp-unlock-pass');
    const unlockRow = document.getElementById('smtp-lock-row');
    const unlockError = document.getElementById('smtp-unlock-error');

    const unlockSmtp = async () => {
        const pass = unlockInput.value;
        if (!pass) {
            unlockError.textContent = 'Ingresa tu contraseña.';
            return;
        }
        unlockBtn.disabled = true;
        unlockBtn.textContent = 'Verificando...';
        try {
            const result = await window.api.auth.verifyPassword(State.currentUser.usuario, pass);
            if (result && result.success) {
                smtpFields.disabled = false;
                smtpFields.style.opacity = '1';
                unlockRow.style.display = 'none';
            } else {
                unlockError.textContent = (result && result.error) || 'Contraseña incorrecta.';
                unlockInput.value = '';
                unlockInput.focus();
            }
        } catch (err) {
            unlockError.textContent = 'Error al verificar la contraseña.';
        } finally {
            unlockBtn.disabled = false;
            unlockBtn.textContent = 'Desbloquear';
        }
    };
    unlockBtn.addEventListener('click', unlockSmtp);
    unlockInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); unlockSmtp(); } });

    // Al cambiar de proveedor, sugiere host/puerto/cifrado típicos —
    // pero el usuario puede sobrescribirlos libremente después.
    document.getElementById('smtp-provider').addEventListener('change', (e) => {
        const defaults = SMTP_PROVIDER_DEFAULTS[e.target.value] || SMTP_PROVIDER_DEFAULTS.custom;
        document.getElementById('smtp-host').value = defaults.host;
        document.getElementById('smtp-port').value = defaults.port;
        document.getElementById('smtp-encryption').value = defaults.encryption;
    });

    // Al cambiar el tipo de cifrado, sugiere el puerto típico asociado.
    document.getElementById('smtp-encryption').addEventListener('change', (e) => {
        const suggestedPort = SMTP_ENCRYPTION_PORTS[e.target.value];
        if (suggestedPort) document.getElementById('smtp-port').value = suggestedPort;
    });

    const smtpFeedback = (message) => {
        const feedback = document.getElementById('smtp-feedback');
        if (!feedback) return;
        feedback.textContent = message;
        feedback.classList.add('is-visible');
        window.setTimeout(() => feedback.classList.remove('is-visible'), 3200);
    };

    document.getElementById('btn-save-smtp').addEventListener('click', async () => {
        const provider = document.getElementById('smtp-provider').value;
        const host = document.getElementById('smtp-host').value.trim();
        const port = document.getElementById('smtp-port').value;
        const encryption = document.getElementById('smtp-encryption').value;
        const user = document.getElementById('smtp-user').value.trim();
        const pass = document.getElementById('smtp-pass').value.trim();
        const statusEl = document.getElementById('smtp-status');

        if (!user || !pass) {
            smtpFeedback('Completa el correo y la contraseña.');
            return;
        }
        if (!host) {
            smtpFeedback('Completa el servidor SMTP (host).');
            return;
        }

        const result = await window.api.smtp.set({ user, pass, provider, host, port, encryption });
        if (!result.success) {
            smtpFeedback('No se pudo guardar: ' + result.error);
            return;
        }

        document.getElementById('smtp-pass').value = '';
        if (statusEl) {
            statusEl.textContent = t('smtpConfigured');
            statusEl.style.color = 'var(--color-success)';
        }
        smtpFeedback(t('smtpSaved'));
    });

    document.getElementById('btn-test-smtp').addEventListener('click', async () => {
        const to = emails[0];
        const result = await window.api.smtp.test(to);
        if (!result.success) {
            smtpFeedback('Error al enviar la prueba: ' + result.error);
            return;
        }
        smtpFeedback(t('smtpTestSent'));
    });

    document.getElementById('btn-clear-smtp').addEventListener('click', async () => {
        if (!confirm('¿Borrar las credenciales de correo guardadas en este dispositivo?')) return;

        const result = await window.api.smtp.clear();
        if (!result.success) {
            smtpFeedback('No se pudo borrar: ' + result.error);
            return;
        }

        document.getElementById('smtp-user').value = '';
        document.getElementById('smtp-pass').value = '';
        const statusEl = document.getElementById('smtp-status');
        if (statusEl) {
            statusEl.textContent = t('smtpNotConfigured');
            statusEl.style.color = '#e36550';
        }
        smtpFeedback(t('smtpCleared'));
    });

    document.getElementById('btn-add-email').addEventListener('click', async () => {
        const email = document.getElementById('new-email').value;
        if (!email) return;

        const updatedEmails = [...emails, email];
        const result = await window.api.user.updateData(State.currentUser.usuario, { emails: updatedEmails });
        if (result && result.success === false) {
            alert('No se pudo guardar el correo: ' + result.error);
            return;
        }
        renderView('settings');
    });

    document.getElementById('btn-export-data').addEventListener('click', async () => {
        const result = await window.api.user.exportData(State.currentUser.usuario);
        if (result.success) alert('Respaldo exportado correctamente.');
    });

    document.getElementById('btn-import-data').addEventListener('click', async () => {
        const result = await window.api.user.importData(State.currentUser.usuario);
        if (result.success) {
            await loadUserData();
            renderView('settings');
            alert('Respaldo importado correctamente.');
        } else if (result.error) {
            alert(`No se pudo importar: ${result.error}`);
        }
    });

    document.getElementById('lang-selector').addEventListener('change', (e) => {
        State.language = e.target.value;
        localStorage.setItem('appLanguage', State.language);
        updateSidebarLanguage();
        renderView(State.currentView);
    });
}

async function openNewEventModal() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    overlay.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${t('createEventHeader')}</h2>
                <button class="modal-close" id="modal-close">&times;</button>
            </div>
            <form class="modal-form" id="new-event-form">
                <div class="modal-field">
                    <label>${t('eventName')}</label>
                    <input type="text" id="modal-title" placeholder="e.g. Quarterly Review" required>
                </div>
                <div class="modal-field">
                    <label>${t('date')}</label>
                    <input type="date" id="modal-date" value="${formatLocalDate(new Date())}" required>
                </div>
                <div class="modal-field">
                    <label>${t('time')}</label>
                    <input type="time" id="modal-time" value="12:00:00" step="1" required>
                </div>
                <div class="modal-field modal-grid-two">
                    <div><label>${t('category')}</label><input type="text" id="modal-category" value="general"></div>
                    <div><label>${t('recurrence')}</label><select id="modal-recurrence"><option value="none">${t('noRepeat')}</option><option value="daily">${t('daily')}</option><option value="weekly">${t('weekly')}</option><option value="monthly">${t('monthly')}</option><option value="yearly">${t('yearly')}</option></select></div>
                </div>
                <div class="modal-grid-two">
                    <div class="modal-field"><label>Duración (min)</label><input type="number" id="modal-duration" min="1" value="60"></div>
                    <div class="modal-field"><label>Minutos de aviso</label><input type="number" id="modal-reminder" min="0" value="0"></div>
                </div>
                <div class="modal-grid-two">
                    <div class="modal-field"><label>Ubicación</label><input type="text" id="modal-location"></div>
                    <div class="modal-field"><label>Enlace</label><input type="url" id="modal-url"></div>
                </div>
                <div class="modal-field">
                    <label>${t('emailPrefs')}</label>
                    <textarea id="modal-desc" placeholder="Details about the event..." rows="3"></textarea>
                </div>
                <div class="modal-field">
                    <label>${t('priority')}</label>
                    <select id="modal-priority">
                        <option value="low">Low</option>
                        <option value="medium" selected>Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                    </select>
                </div>
                <div class="modal-actions">
                    <button type="button" class="btn-logout" id="modal-cancel">${t('undo')}</button>
                    <button type="submit" class="btn-primary" style="padding: 10px 24px;">${t('saveEvent')}</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(overlay);

    const closeBtn = document.getElementById('modal-close');
    const cancelBtn = document.getElementById('modal-cancel');
    const form = document.getElementById('new-event-form');

    const closeModal = () => {
        overlay.remove();
        document.removeEventListener('keydown', onKeyDown);
    };
    const onKeyDown = (e) => { if (e.key === 'Escape') closeModal(); };
    document.addEventListener('keydown', onKeyDown);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });

    closeBtn.onclick = closeModal;
    cancelBtn.onclick = closeModal;

    form.onsubmit = async (e) => {
        e.preventDefault();
        const title = document.getElementById('modal-title').value;
        const date = document.getElementById('modal-date').value;
        const time = document.getElementById('modal-time').value;
        const category = document.getElementById('modal-category').value || 'general';
        const recurrence = document.getElementById('modal-recurrence').value;
        const duration = Number(document.getElementById('modal-duration').value) || 60;
        const reminderMinutes = Number(document.getElementById('modal-reminder').value) || 0;
        const location = document.getElementById('modal-location').value;
        const url = document.getElementById('modal-url').value;
        const description = document.getElementById('modal-desc').value;
        const priority = document.getElementById('modal-priority').value;

        const newTask = {
            title,
            date,
            time,
            category,
            recurrence,
            duration,
            reminderMinutes,
            location,
            url,
            description,
            priority,
            status: 'todo',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        const updatedTasks = [...State.tasks, newTask];
        await window.api.user.updateData(State.currentUser.usuario, { tasks: updatedTasks });

        await loadUserData();
        renderView(State.currentView);
        closeModal();
    };
}

// ==========================================
// GLOBAL HELPERS
// ==========================================
function setupEventListeners() {
    // Sidebar navigation
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.addEventListener('click', () => renderView(btn.dataset.view));
    });

    // Mostrar/ocultar panel izquierdo (3 barras)
    const sidebarEl = document.querySelector('.main-sidebar');
    const toggleSidebarBtn = document.getElementById('btn-toggle-sidebar');
    if (sidebarEl && toggleSidebarBtn) {
        if (localStorage.getItem('sidebarCollapsed') === 'true') {
            sidebarEl.classList.add('is-collapsed');
        }
        toggleSidebarBtn.addEventListener('click', () => {
            const collapsed = sidebarEl.classList.toggle('is-collapsed');
            localStorage.setItem('sidebarCollapsed', collapsed);
        });
    }

    // New Event Action
    document.getElementById('btn-new-event').addEventListener('click', () => {
        openNewEventModal();
    });

    // Global Search
    document.getElementById('globalSearch').addEventListener('input', (e) => {
        State.searchQuery = e.target.value.toLowerCase();
        // Switch to task manager view automatically if not already there
        if (State.currentView !== 'tasks') {
            renderView('tasks');
        } else {
            renderTaskManager(document.getElementById('view-container'));
        }
    });

    // Notification Bell
    const bell = document.querySelector('.notification-bell');
    bell.onclick = () => toggleNotifications();

    setupContextMenu();
}

function setupContextMenu() {
    document.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        showContextMenu(event.clientX, event.clientY, event.target);
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('#app-context-menu')) closeContextMenu();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeContextMenu();
    });
}

function showContextMenu(x, y, target) {
    closeContextMenu();

    const editable = target.closest('input, textarea, select, [contenteditable="true"]');
    const menu = document.createElement('div');
    menu.id = 'app-context-menu';
    menu.className = 'app-context-menu';
    menu.innerHTML = `
        <div class="context-menu-header">
            <span class="context-menu-logo"><img src="Build/Imagen de Codex 16 sept 2026, 21_59_42.ico" alt=""></span>
            <div><strong>TaskMail</strong><small>${State.currentView === 'dashboard' ? t('dashboard') : State.currentView}</small></div>
        </div>
        <div class="context-menu-section-label">${State.language === 'es' ? 'Acciones rápidas' : 'Quick actions'}</div>
        <button class="context-menu-item context-menu-primary" data-action="new-event"><span class="context-menu-icon">+</span><b>${t('newEvent')}</b><kbd>Ctrl N</kbd></button>
        <div class="context-menu-divider"></div>
        <div class="context-menu-section-label">${State.language === 'es' ? 'Edición' : 'Edit'}</div>
        <button class="context-menu-item" data-action="cut" ${editable ? '' : 'disabled'}><span class="context-menu-icon">✂</span>${State.language === 'es' ? 'Cortar' : 'Cut'}<kbd>Ctrl X</kbd></button>
        <button class="context-menu-item" data-action="copy" ${editable ? '' : 'disabled'}><span class="context-menu-icon">▣</span>${State.language === 'es' ? 'Copiar' : 'Copy'}<kbd>Ctrl C</kbd></button>
        <button class="context-menu-item" data-action="paste" ${editable ? '' : 'disabled'}><span class="context-menu-icon">▤</span>${State.language === 'es' ? 'Pegar' : 'Paste'}<kbd>Ctrl V</kbd></button>
        <button class="context-menu-item" data-action="select-all" ${editable ? '' : 'disabled'}><span class="context-menu-icon">□</span>${State.language === 'es' ? 'Seleccionar todo' : 'Select all'}<kbd>Ctrl A</kbd></button>
        <div class="context-menu-divider"></div>
        <div class="context-menu-section-label">${State.language === 'es' ? 'Ventana' : 'Window'}</div>
        <button class="context-menu-item" data-action="reload"><span class="context-menu-icon">↻</span>${State.language === 'es' ? 'Recargar vista' : 'Reload view'}</button>
        <button class="context-menu-item" data-action="fullscreen"><span class="context-menu-icon">⛶</span>${State.language === 'es' ? 'Pantalla completa' : 'Fullscreen'}<kbd>F11</kbd></button>
    `;

    menu.addEventListener('click', async (event) => {
        const action = event.target.closest('[data-action]')?.dataset.action;
        if (!action || event.target.closest('[disabled]')) return;

        if (action === 'new-event') openNewEventModal();
        if (action === 'cut') document.execCommand('cut');
        if (action === 'copy') document.execCommand('copy');
        if (action === 'paste') {
            try {
                const text = await navigator.clipboard.readText();
                document.execCommand('insertText', false, text);
            } catch (error) {
                console.warn('No se pudo leer el portapapeles:', error.message);
            }
        }
        if (action === 'select-all') document.execCommand('selectAll');
        if (action === 'reload') window.location.reload();
        if (action === 'fullscreen') {
            if (document.fullscreenElement) await document.exitFullscreen();
            else await document.documentElement.requestFullscreen();
        }

        closeContextMenu();
    });

    document.body.appendChild(menu);
    const menuRect = menu.getBoundingClientRect();
    menu.style.left = `${Math.min(x, window.innerWidth - menuRect.width - 12)}px`;
    menu.style.top = `${Math.min(y, window.innerHeight - menuRect.height - 12)}px`;
}

function closeContextMenu() {
    document.getElementById('app-context-menu')?.remove();
}

function toggleNotifications() {
    const existing = document.getElementById('notif-dropdown');
    if (existing) {
        existing.remove();
        return;
    }

    const today = formatLocalDate(new Date());
    const urgentTasks = State.tasks.filter(t => t.date === today && (t.priority === 'urgent' || t.priority === 'high'));

    const dropdown = document.createElement('div');
    dropdown.id = 'notif-dropdown';
    dropdown.style.cssText = `
        position: absolute;
        top: 50px;
        right: 24px;
        width: 300px;
        background: var(--bg-surface);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        padding: 16px;
    `;

    let content = `<h4 style="font-size: 14px; margin-bottom: 12px; color: var(--text-primary)">Notifications</h4>`;
    if (urgentTasks.length > 0) {
        content += `<div style="display: flex; flex-direction: column; gap: 8px;">
            ${urgentTasks.map(t => `
                <div style="font-size: 12px; padding: 8px; background: var(--bg-canvas); border-radius: 4px; border-left: 3px solid var(--color-danger)">
                    <strong style="color: white">${t.title}</strong><br>
                    <span style="color: var(--text-secondary)">Urgent task for today!</span>
                </div>
            `).join('')}
        </div>`;
    } else {
        content += `<p style="font-size: 12px; color: var(--text-secondary); text-align: center;">No new notifications.</p>`;
    }

    dropdown.innerHTML = content;
    document.body.appendChild(dropdown);

    // Close on click outside
    setTimeout(() => {
        window.onclick = (e) => {
            if (!e.target.closest('.notification-bell') && !e.target.closest('#notif-dropdown')) {
                dropdown.remove();
                window.onclick = null;
            }
        };
    }, 100);
}

// ... existing code ...
function startClock() {
    setInterval(() => {
        const now = new Date();
        const timeDisplay = document.getElementById('currentTimeDisplay');
        if (timeDisplay) {
            timeDisplay.textContent = now.toLocaleTimeString();
        }
        updateNotificationBadge();
    }, 1000);
}

function updateNotificationBadge() {
    const badge = document.querySelector('.notification-badge');
    if (!badge) return;

    const today = formatLocalDate(new Date());
    const urgentTasks = State.tasks.filter(t => t.date === today && (t.priority === 'urgent' || t.priority === 'high'));

    badge.style.display = urgentTasks.length > 0 ? 'block' : 'none';
}

function cerrarSesion() {
    localStorage.removeItem('sesionActual');
    document.body.classList.add('session-exiting');
    window.setTimeout(() => window.api.session.logout(), 260);
}

// Start the app
initApp();