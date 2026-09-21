const nodemailer = require('nodemailer');
const cron = require('node-cron');
const path = require('path');
const fs = require('fs');
const storage = require('./storage');

let DesktopNotification = null;
try {
    const electron = require('electron');
    DesktopNotification = electron.Notification || null;
} catch (error) {
    DesktopNotification = null;
}

const CONFIG_FILE = path.join(__dirname, '../../config.json');

// ==========================================
// TRANSPORTER DE CORREO
// ==========================================
const PROVIDER_DEFAULTS = {
    gmail: { host: 'smtp.gmail.com', port: 587, encryption: 'starttls' },
    office365: { host: 'smtp.office365.com', port: 587, encryption: 'starttls' },
    custom: { host: '', port: 587, encryption: 'starttls' }
};

function encryptionToTransportOptions(encryption) {
    switch (encryption) {
        case 'ssl':      // SSL/TLS directo, normalmente puerto 465
            return { secure: true };
        case 'none':     // Sin cifrado, normalmente puerto 25
            return { secure: false, ignoreTLS: true };
        case 'starttls': // STARTTLS, normalmente puerto 587
        default:
            return { secure: false, requireTLS: true };
    }
}

function getTransport() {
    const config = readSmtpConfig();
    const smtp = config.smtp || {};

    return nodemailer.createTransport({
        host: smtp.host,
        port: Number(smtp.port) || 587,
        ...encryptionToTransportOptions(smtp.encryption),
        auth: {
            user: smtp.auth ? smtp.auth.user : '',
            pass: smtp.auth ? smtp.auth.pass : '' // Contraseña directamente en texto plano
        }
    });
}

function getFromEmail() {
    const config = readSmtpConfig();
    return config.smtp && config.smtp.auth ? config.smtp.auth.user : '';
}

function readSmtpConfig() {
    if (!fs.existsSync(CONFIG_FILE)) {
        return { smtp: { provider: 'gmail', ...PROVIDER_DEFAULTS.gmail, auth: {} } };
    }
    return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
}

// ==========================================
// CONFIGURACIÓN DESDE LA UI
// ==========================================
function getSmtpStatus() {
    try {
        const config = readSmtpConfig();
        const smtp = config.smtp || {};
        const auth = smtp.auth || {};
        return {
            configured: Boolean(auth.pass), // Verifica la contraseña en texto plano
            provider: smtp.provider || 'gmail',
            user: auth.user || null,
            host: smtp.host || PROVIDER_DEFAULTS.gmail.host,
            port: smtp.port || PROVIDER_DEFAULTS.gmail.port,
            encryption: smtp.encryption || PROVIDER_DEFAULTS.gmail.encryption
        };
    } catch (error) {
        return { configured: false, provider: 'gmail', user: null, ...PROVIDER_DEFAULTS.gmail };
    }
}

// Guarda las credenciales en texto plano sin cifrar
function configureSmtp({ user, pass, provider, host, port, encryption }) {
    const trimmedUser = String(user || '').trim();
    const trimmedPass = String(pass || '').trim();
    const normalizedProvider = String(provider || 'gmail').toLowerCase();
    const defaults = PROVIDER_DEFAULTS[normalizedProvider] || PROVIDER_DEFAULTS.custom;

    if (!trimmedUser) throw new Error('El correo es obligatorio');
    if (!trimmedPass) throw new Error('La contraseña es obligatoria');

    const finalHost = String(host || defaults.host || '').trim();
    if (!finalHost) throw new Error('El servidor SMTP (host) es obligatorio');

    const finalPort = Number(port) || defaults.port;
    const finalEncryption = ['starttls', 'ssl', 'none'].includes(encryption) ? encryption : defaults.encryption;

    const config = {
        smtp: {
            provider: normalizedProvider,
            host: finalHost,
            port: finalPort,
            encryption: finalEncryption,
            auth: { 
                user: trimmedUser, 
                pass: trimmedPass // Se guarda sin encriptar
            }
        }
    };

    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8');

    return getSmtpStatus();
}

// Borra las credenciales guardadas
function clearSmtp() {
    const config = { smtp: { provider: 'gmail', ...PROVIDER_DEFAULTS.gmail, auth: {} } };
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8');
    return getSmtpStatus();
}

// Envía un correo de prueba usando la configuración guardada
async function sendTestEmail(destinatario) {
    const fromEmail = getFromEmail();
    const to = String(destinatario || fromEmail).trim();
    const transport = getTransport();

    const info = await transport.sendMail({
        from: `TaskMail <${fromEmail}>`,
        to,
        subject: '✅ TaskMail — Correo de prueba',
        html: `
            <div style="font-family: Arial, Helvetica, sans-serif; padding: 24px; color: #18343a;">
                <h2 style="margin: 0 0 8px;">¡Todo funciona! 🎉</h2>
                <p style="margin: 0; color: #66777a;">
                    Este es un correo de prueba enviado desde TaskMail para confirmar que la
                    configuración SMTP de este dispositivo es correcta.
                </p>
            </div>
        `
    });

    return { to, messageId: info && info.messageId };
}

// ==========================================
// VERIFICAR Y ENVIAR RECORDATORIOS
// ==========================================
async function checkAndSendReminders() {
    await runReminderCheck({ manual: false });
}

async function checkRemindersNow() {
    await runReminderCheck({ manual: true });
}

async function runReminderCheck({ manual }) {
    const now = new Date();
    const todayStr = formatLocalDate(now);
    const tomorrowStr = formatLocalDate(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1));
    const nextWeekStr = formatLocalDate(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7));
    const currentTime = formatLocalTime(now);
    let sentAnything = false;
    let anyUserHadRecipients = false;

    try {
        const allUsers = storage.getAllUsersForEmail();

        for (const user of allUsers) {
            if (!user.destinatarios || user.destinatarios.length === 0) continue;
            anyUserHadRecipients = true;

            const eventosHoy = user.tareas.filter(task => {
                if (!task.emailEnabled || !occursOnDate(task, todayStr)) return false;
                return manual || deliveryTimeFor(task) === currentTime;
            });
            const checkVentanasExtendidas = manual || currentTime === fallbackDeliveryTime;
            const eventosMañana = checkVentanasExtendidas
                ? user.tareas.filter(task => task.emailEnabled && occursOnDate(task, tomorrowStr))
                : [];
            const eventosSemanaProx = checkVentanasExtendidas
                ? user.tareas.filter(task => task.emailEnabled && occursOnDate(task, nextWeekStr))
                : [];

            if (eventosHoy.length === 0 && eventosMañana.length === 0 && eventosSemanaProx.length === 0) continue;

            const transport = getTransport();
            const fromEmail = getFromEmail();

            if (eventosHoy.length > 0) {
                const enviado = await sendReminderOnce(transport, fromEmail, user, todayStr, eventosHoy,
                    '🗓️ Evento programado — TaskMail', 'HOY');
                sentAnything = sentAnything || enviado;
            }

            if (eventosMañana.length > 0) {
                const enviado = await sendReminderOnce(transport, fromEmail, user, tomorrowStr, eventosMañana,
                    '⏰ Mañana: Recordatorio de eventos — TaskMail', 'MAÑANA');
                sentAnything = sentAnything || enviado;
            }

            if (eventosSemanaProx.length > 0) {
                const enviado = await sendReminderOnce(transport, fromEmail, user, nextWeekStr, eventosSemanaProx,
                    '📅 En 7 días: Próximos eventos — TaskMail', 'EN 7 DÍAS');
                sentAnything = sentAnything || enviado;
            }
        }

        if (manual && !sentAnything) {
            if (!anyUserHadRecipients) {
                showManualCheckNoRecipientsNotification();
            } else {
                showManualCheckEmptyNotification();
            }
        }

        console.log('✅ Verificación de recordatorios completada');
    } catch (err) {
        console.error('❌ Error enviando recordatorios:', err.message);
        if (manual) showManualCheckErrorNotification(err.message);
    }
}

function showManualCheckEmptyNotification() {
    if (!DesktopNotification || !DesktopNotification.isSupported()) return;
    new DesktopNotification({
        title: 'TaskMail · Recordatorios',
        body: 'Comprobado: no hay recordatorios pendientes por correo en este momento.',
        silent: true
    }).show();
}

function showManualCheckNoRecipientsNotification() {
    if (!DesktopNotification || !DesktopNotification.isSupported()) return;
    new DesktopNotification({
        title: 'TaskMail · Falta un destinatario',
        body: 'No tienes ningún correo destinatario configurado. Ve a Configuración → Preferencias de Email para agregar uno.',
        silent: true
    }).show();
}

function showManualCheckErrorNotification(message) {
    if (!DesktopNotification || !DesktopNotification.isSupported()) return;
    new DesktopNotification({
        title: 'TaskMail · Error al comprobar recordatorios',
        body: message || 'No se pudo completar la comprobación.',
        urgency: 'normal'
    }).show();
}

async function sendReminderOnce(transport, fromEmail, user, periodKey, events, subject, label) {
    const eventIds = events.map(event => event.id).sort().join(',');
    const key = `${user.username}:${periodKey}:${eventIds}`;
    if (sentReminderKeys.has(key)) return false;

    const result = await sendEmail(transport, fromEmail, user.destinatarios, subject, buildEmailBody(label, events));
    if (result) {
        sentReminderKeys.add(key);
        showDesktopNotification(label, events, user.username);
        return true;
    }
    return false;
}

function showDesktopNotification(period, events, username) {
    if (!DesktopNotification || !DesktopNotification.isSupported()) return;

    const eventNames = events.map(event => event.nombre || event.title || 'Evento').slice(0, 2).join(', ');
    const extraEvents = events.length > 2 ? ` y ${events.length - 2} más` : '';
    const notification = new DesktopNotification({
        title: `TaskMail · ${period}`,
        body: `${eventNames}${extraEvents} · ${events.length} evento${events.length === 1 ? '' : 's'} enviado${events.length === 1 ? '' : 's'} por correo.`,
        silent: false,
        urgency: 'normal'
    });
    notification.on('click', () => {
        console.log(`🔔 Notificación abierta para ${username}`);
    });
    notification.show();
}

function formatLocalDate(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function formatLocalTime(date) {
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
}

function normalizeTime(time) {
    const parts = String(time).split(':');
    return `${String(parts[0] || '00').padStart(2, '0')}:${String(parts[1] || '00').padStart(2, '0')}:${String(parts[2] || '00').padStart(2, '0')}`;
}

function occursOnDate(task, targetDate) {
    if (!task.fecha) return false;
    if (task.repeticion === 'none' || !task.repeticion) return task.fecha === targetDate;
    if (task.finRepeticion && targetDate > task.finRepeticion) return false;
    if (targetDate < task.fecha) return false;
    const start = new Date(`${task.fecha}T00:00:00`);
    const target = new Date(`${targetDate}T00:00:00`);
    const days = Math.round((target - start) / 86400000);
    if (task.repeticion === 'daily') return true;
    if (task.repeticion === 'weekly') return days % 7 === 0;
    if (task.repeticion === 'monthly') return start.getDate() === target.getDate();
    if (task.repeticion === 'yearly') return start.getMonth() === target.getMonth() && start.getDate() === target.getDate();
    return task.fecha === targetDate;
}

function deliveryTimeFor(task) {
    if (!task.hora) return fallbackDeliveryTime;
    const [hours, minutes, seconds] = normalizeTime(task.hora).split(':').map(Number);
    const reminder = Number(task.reminderMinutes) || 0;
    const scheduled = new Date(2000, 0, 1, hours, minutes, seconds);
    scheduled.setMinutes(scheduled.getMinutes() - reminder);
    return `${String(scheduled.getHours()).padStart(2, '0')}:${String(scheduled.getMinutes()).padStart(2, '0')}:${String(scheduled.getSeconds()).padStart(2, '0')}`;
}

// ==========================================
// CONSTRUIR CUERPO DEL CORREO
// ==========================================
function buildEmailBody(periodo, eventos) {
    const lista = eventos.map(e => `
        <tr>
            <td style="padding: 16px; border-bottom: 1px solid #e3ddd3; vertical-align: top;">
                <div style="font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 21px; font-weight: bold; color: #18343a;">${escapeHtml(e.nombre)}</div>
                <div style="font-family: Arial, Helvetica, sans-serif; margin-top: 4px; font-size: 13px; line-height: 19px; color: #66777a;">${escapeHtml(e.descripcion || 'Evento cultural de Guatemala')}</div>
            </td>
            <td style="width: 150px; padding: 16px; border-bottom: 1px solid #e3ddd3; vertical-align: top; white-space: nowrap;">
                <div style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 18px; font-weight: bold; color: #2c7c86;">${e.fecha ? escapeHtml(formatearFecha(e.fecha)) : 'Fecha por confirmar'}</div>
                <div style="font-family: Arial, Helvetica, sans-serif; margin-top: 3px; font-size: 12px; line-height: 18px; color: #66777a;">${e.hora ? `Hora: ${escapeHtml(e.hora)}` : 'Sin hora'}</div>
            </td>
        </tr>
    `).join('');

    return `
    <!DOCTYPE html>
    <html lang="es">
    <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
    <body style="margin: 0; padding: 0; background: #f4f1eb; color: #18343a;">
        <div style="display: none; max-height: 0; overflow: hidden; opacity: 0;">Tienes ${eventos.length} evento${eventos.length !== 1 ? 's' : ''} programado${eventos.length !== 1 ? 's' : ''} en TaskMail.</div>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; background: #f4f1eb;">
            <tr><td align="center" style="padding: 28px 12px;">
                <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width: 600px; background: #fffdf9; border: 1px solid #ded8ce;">
                    <tr><td style="padding: 24px 28px; background: #123c43; border-bottom: 5px solid #e36550;">
                        <div style="font-family: Arial, Helvetica, sans-serif; font-size: 24px; line-height: 30px; font-weight: bold; color: #fffdf9;">TaskMail</div>
                        <div style="font-family: Arial, Helvetica, sans-serif; margin-top: 5px; font-size: 13px; line-height: 19px; color: #c8dcd7;">Recordatorio de eventos</div>
                    </td></tr>
                    <tr><td style="padding: 28px;">
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr><td style="padding: 14px 16px; background: #f8e3d5; border-left: 4px solid #e36550;">
                                <div style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 22px; font-weight: bold; color: #18343a;">${escapeHtml(periodo)}</div>
                                <div style="font-family: Arial, Helvetica, sans-serif; margin-top: 4px; font-size: 13px; line-height: 19px; color: #66777a;">Tienes ${eventos.length} evento${eventos.length !== 1 ? 's' : ''} programado${eventos.length !== 1 ? 's' : ''}.</div>
                            </td></tr>
                        </table>
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 22px; border: 1px solid #ded8ce; border-collapse: collapse;">
                            <tr style="background: #f1ede5;">
                                <th align="left" style="padding: 11px 16px; font-family: Arial, Helvetica, sans-serif; font-size: 11px; line-height: 16px; letter-spacing: 1px; text-transform: uppercase; color: #66777a;">Evento</th>
                                <th align="left" style="padding: 11px 16px; font-family: Arial, Helvetica, sans-serif; font-size: 11px; line-height: 16px; letter-spacing: 1px; text-transform: uppercase; color: #66777a;">Programado</th>
                            </tr>
                            ${lista}
                        </table>
                    </td></tr>
                    <tr><td style="padding: 18px 28px; border-top: 1px solid #ded8ce; background: #f1ede5;">
                        <div style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 18px; color: #66777a;">Este correo fue enviado automáticamente por <strong style="color: #18343a;">TaskMail</strong>.</div>
                    </td></tr>
                </table>
            </td></tr>
        </table>
    </body>
    </html>
    `;
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function formatearFecha(fechaStr) {
    const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
    const d = new Date(fechaStr + 'T00:00:00');
    return `${d.getDate()} de ${meses[d.getMonth()]} de ${d.getFullYear()}`;
}

// ==========================================
// ENVIAR CORREO
// ==========================================
async function sendEmail(transport, from, destinatarios, subject, html) {
    try {
        const info = await transport.sendMail({
            from: `TaskMail <${from}>`,
            to: destinatarios.join(', '),
            subject,
            html
        });
        console.log(`✅ Email enviado: ${subject} → ${destinatarios.join(', ')}`);
        return info;
    } catch (err) {
        console.error(`❌ Error enviando email: ${err.message}`);
    }
}

// ==========================================
// CONFIGURAR CRON JOB
// ==========================================
let cronJob = null;
let fallbackDeliveryTime = '03:00:00';
let reminderCheckRunning = false;
const sentReminderKeys = new Set();

function setupDailyCron(hour = 3, minute = 0) {
    if (cronJob) {
        cronJob.stop();
        console.log('⏹ Cron anterior detenido');
    }

    fallbackDeliveryTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00`;
    const expression = '* * * * * *';
    console.log(`⏰ Recordatorios exactos activos; eventos sin hora y avisos anticipados salen a las ${fallbackDeliveryTime}`);

    cronJob = cron.schedule(expression, async () => {
        if (reminderCheckRunning) return;
        reminderCheckRunning = true;
        try {
            await checkAndSendReminders();
        } finally {
            reminderCheckRunning = false;
        }
    });

    checkAndSendReminders();
}

module.exports = { setupDailyCron, checkAndSendReminders, checkRemindersNow, getSmtpStatus, configureSmtp, clearSmtp, sendTestEmail };