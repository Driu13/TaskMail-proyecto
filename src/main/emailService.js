const cron = require('node-cron');
const path = require('path');
const fs = require('fs');
const storage = require('./storage');

let electronApp = null;
let DesktopNotification = null;
try {
    const electron = require('electron');
    electronApp = electron.app || null;
    DesktopNotification = electron.Notification || null;
} catch (error) {
    electronApp = null;
    DesktopNotification = null;
}

<<<<<<< HEAD
// El archivo con las credenciales de Microsoft Graph vive en la carpeta de
// datos de usuario del sistema (p. ej. C:\Users\<tú>\AppData\Roaming\TaskMail),
// NUNCA dentro de la carpeta del proyecto/código fuente. Solo se crea cuando
// alguien lo configura desde Configuración → Envío de Correo en la interfaz;
// no existe ningún archivo de plantilla que se pueda editar a mano.
=======
// Las credenciales de Microsoft Graph viven en la carpeta de datos de usuario
// del sistema (p. ej. C:\Users\<tú>\AppData\Roaming\TaskMail), nunca dentro de
// la carpeta del proyecto.
>>>>>>> 42f842c2e4980ed01d97605f30559cc61240e240
function getConfigFilePath() {
    if (electronApp && typeof electronApp.getPath === 'function') {
        return path.join(electronApp.getPath('userData'), 'config.json');
    }
<<<<<<< HEAD
    // Solo como respaldo si este archivo llegara a correr fuera de Electron.
=======
>>>>>>> 42f842c2e4980ed01d97605f30559cc61240e240
    return path.join(__dirname, '../../config.json');
}

// ==========================================
// ENVÍO DE CORREO VÍA MICROSOFT GRAPH API
// (flujo de credenciales de cliente / app-only —
//  el servicio envía correos sin un usuario logueado)
// ==========================================
const GRAPH_SCOPE = 'https://graph.microsoft.com/.default';

// Cache del token de acceso en memoria (evita pedir uno nuevo en cada correo)
let cachedToken = null; // { accessToken, expiresAt }

function readGraphConfig() {
    const configFile = getConfigFilePath();
    if (!fs.existsSync(configFile)) {
        return { graph: {} };
    }
    const raw = JSON.parse(fs.readFileSync(configFile, 'utf-8'));
    return { graph: raw.graph || {} };
}

// ==========================================
// CONFIGURACIÓN DESDE LA UI
// ==========================================
function getGraphStatus() {
    try {
        const { graph } = readGraphConfig();
        return {
            configured: Boolean(graph.tenantId && graph.clientId && graph.clientSecret && graph.senderEmail),
            tenantId: graph.tenantId || null,
            clientId: graph.clientId || null,
            senderEmail: graph.senderEmail || null
            // clientSecret nunca se expone de vuelta a la UI
        };
    } catch (error) {
        return { configured: false, tenantId: null, clientId: null, senderEmail: null };
    }
}

// Guarda las credenciales de la app de Azure AD (App Registration)
function configureGraph({ tenantId, clientId, clientSecret, senderEmail }) {
    const trimmedTenant = String(tenantId || '').trim();
    const trimmedClientId = String(clientId || '').trim();
    const trimmedSecret = String(clientSecret || '').trim();
    const trimmedSender = String(senderEmail || '').trim();

    if (!trimmedTenant) throw new Error('El Tenant ID es obligatorio');
    if (!trimmedClientId) throw new Error('El Client ID es obligatorio');
    if (!trimmedSecret) throw new Error('El Client Secret es obligatorio');
    if (!trimmedSender) throw new Error('El correo remitente es obligatorio');

    const config = {
        graph: {
            tenantId: trimmedTenant,
            clientId: trimmedClientId,
            clientSecret: trimmedSecret,
            senderEmail: trimmedSender
        }
    };

    fs.writeFileSync(getConfigFilePath(), JSON.stringify(config, null, 2), 'utf-8');
    cachedToken = null; // fuerza a pedir un token nuevo con las credenciales actualizadas

    return getGraphStatus();
}

// Borra las credenciales guardadas
function clearGraph() {
    fs.writeFileSync(getConfigFilePath(), JSON.stringify({ graph: {} }, null, 2), 'utf-8');
    cachedToken = null;
    return getGraphStatus();
}

// Obtiene (y cachea) un token de acceso app-only vía client_credentials
async function getAccessToken() {
    const { graph } = readGraphConfig();
    if (!graph.tenantId || !graph.clientId || !graph.clientSecret) {
        throw new Error('Microsoft Graph no está configurado. Ve a Configuración → Envío de Correo.');
    }

    if (cachedToken && cachedToken.expiresAt > Date.now() + 30000) {
        return cachedToken.accessToken;
    }

    const tokenUrl = `https://login.microsoftonline.com/${encodeURIComponent(graph.tenantId)}/oauth2/v2.0/token`;
    const body = new URLSearchParams({
        client_id: graph.clientId,
        client_secret: graph.clientSecret,
        scope: GRAPH_SCOPE,
        grant_type: 'client_credentials'
    });

    const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString()
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(`Error de autenticación con Microsoft Graph: ${data.error_description || data.error || response.status}`);
    }

    cachedToken = {
        accessToken: data.access_token,
        expiresAt: Date.now() + (Number(data.expires_in) || 3600) * 1000
    };
    return cachedToken.accessToken;
}

// Envía un correo a través de Microsoft Graph (POST /users/{sender}/sendMail)
async function sendViaGraph(destinatarios, subject, html) {
    const { graph } = readGraphConfig();
    const accessToken = await getAccessToken();

    const message = {
        message: {
            subject,
            body: { contentType: 'HTML', content: html },
            toRecipients: destinatarios.map(email => ({ emailAddress: { address: email } }))
        },
        saveToSentItems: true
    };

    const url = `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(graph.senderEmail)}/sendMail`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    });

    if (!response.ok) {
        let errorMessage = `${response.status} ${response.statusText}`;
        try {
            const errorData = await response.json();
            errorMessage = errorData.error && errorData.error.message ? errorData.error.message : errorMessage;
        } catch (_) { /* respuesta sin cuerpo JSON */ }
        throw new Error(`Error al enviar correo vía Microsoft Graph: ${errorMessage}`);
    }

    // sendMail no devuelve un id de mensaje directamente (202 Accepted, sin cuerpo)
    return { accepted: destinatarios };
}

// Envía un correo de prueba usando la configuración guardada.
// Acepta un solo correo o un arreglo de correos — antes solo mandaba
// al primero de la lista aunque el usuario tuviera varios configurados.
async function sendTestEmail(destinatario) {
    const { graph } = readGraphConfig();

    let recipients = Array.isArray(destinatario)
        ? destinatario.map(e => String(e || '').trim()).filter(Boolean)
        : (destinatario ? [String(destinatario).trim()] : []);

    if (recipients.length === 0 && graph.senderEmail) {
        recipients = [graph.senderEmail];
    }
    if (recipients.length === 0) throw new Error('No hay ningún destinatario para la prueba.');

    const info = await sendViaGraph(recipients, '✅ TaskMail — Correo de prueba', `
        <div style="font-family: Arial, Helvetica, sans-serif; padding: 24px; color: #18343a;">
            <h2 style="margin: 0 0 8px;">¡Todo funciona! 🎉</h2>
            <p style="margin: 0; color: #66777a;">
                Este es un correo de prueba enviado desde TaskMail vía Microsoft Graph API para
                confirmar que la configuración de este dispositivo es correcta.
            </p>
        </div>
    `);

    return { to: recipients.join(', '), messageId: info && info.accepted ? info.accepted.join(', ') : null };
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

            if (eventosHoy.length > 0) {
                const enviado = await sendReminderOnce(user, todayStr, eventosHoy,
                    '🗓️ Evento programado — TaskMail', 'HOY');
                sentAnything = sentAnything || enviado;
            }

            if (eventosMañana.length > 0) {
                const enviado = await sendReminderOnce(user, tomorrowStr, eventosMañana,
                    '⏰ Mañana: Recordatorio de eventos — TaskMail', 'MAÑANA');
                sentAnything = sentAnything || enviado;
            }

            if (eventosSemanaProx.length > 0) {
                const enviado = await sendReminderOnce(user, nextWeekStr, eventosSemanaProx,
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

async function sendReminderOnce(user, periodKey, events, subject, label) {
    const eventIds = events.map(event => event.id).sort().join(',');
    const key = `${user.username}:${periodKey}:${eventIds}`;
    if (sentReminderKeys.has(key)) return false;

    const result = await sendEmail(user.destinatarios, subject, buildEmailBody(label, events));
    if (result) {
        sentReminderKeys.add(key);
        storage.addSentReminderKey(key);
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
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

function normalizeTime(time) {
    const parts = String(time).split(':');
    return `${String(parts[0] || '00').padStart(2, '0')}:${String(parts[1] || '00').padStart(2, '0')}`;
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
    const [hours, minutes] = normalizeTime(task.hora).split(':').map(Number);
    const reminder = Number(task.reminderMinutes) || 0;
    const scheduled = new Date(2000, 0, 1, hours, minutes, 0);
    scheduled.setMinutes(scheduled.getMinutes() - reminder);
    return `${String(scheduled.getHours()).padStart(2, '0')}:${String(scheduled.getMinutes()).padStart(2, '0')}`;
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
async function sendEmail(destinatarios, subject, html) {
    try {
        const info = await sendViaGraph(destinatarios, subject, html);
        console.log(`✅ Email enviado (Microsoft Graph): ${subject} → ${destinatarios.join(', ')}`);
        return info;
    } catch (err) {
        console.error(`❌ Error enviando email: ${err.message}`);
    }
}

// ==========================================
// CONFIGURAR CRON JOB
// ==========================================
let cronJob = null;
let fallbackDeliveryTime = '03:00';
let reminderCheckRunning = false;
const sentReminderKeys = new Set(storage.getSentReminderKeys());

function setupDailyCron(hour = 3, minute = 0) {
    if (cronJob) {
        cronJob.stop();
        console.log('⏹ Cron anterior detenido');
    }

    fallbackDeliveryTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    const expression = '* * * * *';
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

module.exports = { setupDailyCron, checkAndSendReminders, checkRemindersNow, getGraphStatus, configureGraph, clearGraph, sendTestEmail };