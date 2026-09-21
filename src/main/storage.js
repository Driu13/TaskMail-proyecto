const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

let app;
try {
    const electronApp = require('electron');
    app = electronApp && electronApp.app && typeof electronApp.app.getPath === 'function'
        ? electronApp.app
        : { getPath: () => path.join(process.cwd(), '.taskmail-data') };
} catch (error) {
    app = {
        getPath: () => path.join(process.cwd(), '.taskmail-data')
    };
}

// ==========================================
// CARPETA DE DATOS: AppData/Roaming/taskmail-proyecto
// No visible para usuarios normales
// Persiste aunque borren caché del navegador
// ==========================================
const DATA_DIR = app.getPath('userData');
const DATA_FILE = path.join(DATA_DIR, 'taskmail-data.json');
const UPLOADS_DIR = path.join(DATA_DIR, 'uploads');

// Crear carpetas si no existen
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

console.log('📁 Datos guardados en:', DATA_FILE);

// ==========================================
// EVENTOS CULTURALES DE GUATEMALA - COMPLETOS
// Basados en el Código de Trabajo (Decreto 1441)
// y el calendario oficial del MINTRAB 2026
// ==========================================
const EVENTOS_GUATEMALA = [
    // ── ENERO ──
    { id: 'gt-001', nombre: 'Año Nuevo', fecha: '2026-01-01', email: '', tipo: 'Feriado Nacional', descripcion: 'Inicio del año nuevo. Asueto nacional con goce de salario.' },
    { id: 'gt-002', nombre: 'Día de Reyes / Epifanía', fecha: '2026-01-06', email: '', tipo: 'Religioso', descripcion: 'Conmemoración de la llegada de los Reyes Magos al niño Jesús.' },
    { id: 'gt-003', nombre: 'Fiesta de San Sebastián', fecha: '2026-01-20', email: '', tipo: 'Patronal', descripcion: 'Feria patronal en varios municipios de Guatemala.' },
    { id: 'gt-004', nombre: 'Día del Señor de Esquipulas', fecha: '2026-01-15', email: '', tipo: 'Religioso', descripcion: 'Peregrinación masiva al santuario del Cristo Negro de Esquipulas, Chiquimula. Una de las celebraciones católicas más importantes de Centroamérica.' },
    { id: 'gt-005', nombre: 'Día del Trabajador Social', fecha: '2026-01-27', email: '', tipo: 'Profesional', descripcion: 'Reconocimiento a los trabajadores sociales de Guatemala.' },
    { id: 'gt-006', nombre: 'Día del Perito Contador', fecha: '2026-01-29', email: '', tipo: 'Profesional', descripcion: 'Celebración del gremio de peritos contadores.' },
    { id: 'gt-007', nombre: 'Día del Ingeniero', fecha: '2026-01-30', email: '', tipo: 'Profesional', descripcion: 'Reconocimiento a los profesionales de ingeniería.' },
    { id: 'gt-008', nombre: 'Día del Mago', fecha: '2026-01-31', email: '', tipo: 'Cultural', descripcion: 'Celebración del arte de la magia y la ilusión.' },

    // ── FEBRERO ──
    { id: 'gt-009', nombre: 'Día de la Candelaria', fecha: '2026-02-02', email: '', tipo: 'Religioso', descripcion: 'Festividad religiosa de la Virgen de la Candelaria, celebrada con procesiones y ferias en varios municipios.' },
    { id: 'gt-010', nombre: 'Día Mundial de los Humedales', fecha: '2026-02-02', email: '', tipo: 'Ambiental', descripcion: 'Conmemoración de la Convención de Ramsar sobre humedales de importancia internacional.' },
    { id: 'gt-011', nombre: 'Día del Dentista', fecha: '2026-02-09', email: '', tipo: 'Profesional', descripcion: 'Reconocimiento al gremio odontológico de Guatemala.' },
    { id: 'gt-012', nombre: 'Día Mundial de la Radio', fecha: '2026-02-13', email: '', tipo: 'Cultural', descripcion: 'Celebración del medio de comunicación radial a nivel mundial.' },
    { id: 'gt-013', nombre: 'Día del Amor y la Amistad', fecha: '2026-02-14', email: '', tipo: 'Cultural', descripcion: 'Celebración del amor y la amistad. Conocido también como Día de San Valentín.' },
    { id: 'gt-014', nombre: 'Día de la Marimba y de Tecún Umán', fecha: '2026-02-20', email: '', tipo: 'Cívico', descripcion: 'Se honra a la Marimba, instrumento nacional de Guatemala, y al héroe indígena Tecún Umán, considerado el último guerrero maya quiché.' },
    { id: 'gt-015', nombre: 'Día del Biólogo', fecha: '2026-02-21', email: '', tipo: 'Profesional', descripcion: 'Reconocimiento a los profesionales de Biología en Guatemala.' },
    { id: 'gt-016', nombre: 'Día Internacional de la Lengua Materna', fecha: '2026-02-21', email: '', tipo: 'Cultural', descripcion: 'Promovido por la UNESCO para fomentar la diversidad lingüística y el multilingüismo.' },
    { id: 'gt-017', nombre: 'Día de la Dignidad de las Víctimas del Conflicto Armado', fecha: '2026-02-25', email: '', tipo: 'Cívico', descripcion: 'Conmemoración nacional en memoria de las víctimas del conflicto armado interno de Guatemala (1960-1996).' },
    { id: 'gt-018', nombre: 'Día del Patrimonio Cultural de la Nación', fecha: '2026-02-26', email: '', tipo: 'Cultural', descripcion: 'Celebración de la riqueza patrimonial cultural e histórica de Guatemala.' },
    { id: 'gt-019', nombre: 'Carnaval', fecha: '', email: '', tipo: 'Cultural', descripcion: 'Celebración de Carnaval antes del Miércoles de Ceniza. Fecha variable según el calendario litúrgico.' },

    // ── MARZO ──
    { id: 'gt-020', nombre: 'Miércoles de Ceniza (inicio de Cuaresma)', fecha: '', email: '', tipo: 'Religioso', descripcion: 'Inicio de la Cuaresma católica, 40 días antes de la Semana Santa. Fecha variable.' },
    { id: 'gt-021', nombre: 'Día del Escultor', fecha: '2026-03-04', email: '', tipo: 'Profesional', descripcion: 'Reconocimiento a los artistas escultores de Guatemala.' },
    { id: 'gt-022', nombre: 'Día Internacional de la Mujer', fecha: '2026-03-08', email: '', tipo: 'Social', descripcion: 'Celebración de los derechos de la mujer y la igualdad de género a nivel mundial.' },
    { id: 'gt-023', nombre: 'Día de la Ceiba (Árbol Nacional)', fecha: '2026-03-08', email: '', tipo: 'Ambiental', descripcion: 'Reconocimiento a la Ceiba Pentandra, árbol nacional de Guatemala y símbolo de vida y fortaleza.' },
    { id: 'gt-024', nombre: 'Aniversario del Himno Nacional de Guatemala', fecha: '2026-03-14', email: '', tipo: 'Cívico', descripcion: 'Conmemoración del aniversario del Himno Nacional de Guatemala, compuesto por Cubas y con letra de Palma.' },
    { id: 'gt-025', nombre: 'Día Mundial del Agua', fecha: '2026-03-22', email: '', tipo: 'Ambiental', descripcion: 'Concienciación sobre la importancia del agua potable y la gestión sostenible del recurso hídrico.' },
    { id: 'gt-026', nombre: 'Día del Teatro', fecha: '2026-03-27', email: '', tipo: 'Cultural', descripcion: 'Celebración mundial del arte teatral. Se realizan presentaciones en teatros de Guatemala.' },
    { id: 'gt-027', nombre: 'Huelga de Dolores (USAC)', fecha: '', email: '', tipo: 'Cultural', descripcion: 'Tradicional desfile estudiantil de la Universidad de San Carlos. Grupos encapuchados recorren la ciudad con sátira política. Fecha variable (viernes antes de Semana Santa).' },

    // ── ABRIL ──
    { id: 'gt-028', nombre: 'Día Mundial del Autismo', fecha: '2026-04-02', email: '', tipo: 'Social', descripcion: 'Concienciación sobre el Trastorno del Espectro Autista (TEA) a nivel mundial.' },
    { id: 'gt-029', nombre: 'Jueves Santo', fecha: '2026-04-02', email: '', tipo: 'Feriado Nacional', descripcion: 'Asueto nacional por Semana Santa. Procesiones solemnes en toda Guatemala, especialmente en Antigua Guatemala.' },
    { id: 'gt-030', nombre: 'Viernes Santo', fecha: '2026-04-03', email: '', tipo: 'Feriado Nacional', descripcion: 'Asueto nacional. Día de mayor fervor de la Semana Santa guatemalteca. Famosas alfombras de aserrín y procesiones.' },
    { id: 'gt-031', nombre: 'Sábado de Gloria', fecha: '2026-04-04', email: '', tipo: 'Feriado Nacional', descripcion: 'Asueto nacional según el Código de Trabajo. Último día de duelo en Semana Santa.' },
    { id: 'gt-032', nombre: 'Domingo de Resurrección', fecha: '2026-04-05', email: '', tipo: 'Religioso', descripcion: 'Celebración de la resurrección de Jesucristo. Cierre de la Semana Santa.' },
    { id: 'gt-033', nombre: 'Día de la Secretaria', fecha: '2026-04-26', email: '', tipo: 'Profesional', descripcion: 'Reconocimiento al trabajo de las secretarias en todo el país.' },
    { id: 'gt-034', nombre: 'Día del Idioma Español / Día del Libro', fecha: '2026-04-23', email: '', tipo: 'Cultural', descripcion: 'Conmemoración en honor a Miguel de Cervantes. Se promueve la lectura y el idioma español.' },
    { id: 'gt-035', nombre: 'Día de la Tierra', fecha: '2026-04-22', email: '', tipo: 'Ambiental', descripcion: 'Jornada mundial de concienciación ambiental promovida desde 1970.' },

    // ── MAYO ──
    { id: 'gt-036', nombre: 'Día del Trabajo', fecha: '2026-05-01', email: '', tipo: 'Feriado Nacional', descripcion: 'Asueto nacional inamovible. Reconocimiento internacional a los derechos de los trabajadores.' },
    { id: 'gt-037', nombre: 'Día de la Cruz / Santa Cruz', fecha: '2026-05-03', email: '', tipo: 'Religioso', descripcion: 'Festividad religiosa popular en Guatemala. Se adornan cruces en iglesias, hogares y comunidades.' },
    { id: 'gt-038', nombre: 'Día de la Madre', fecha: '2026-05-10', email: '', tipo: 'Feriado Nacional', descripcion: 'Asueto remunerado para las madres trabajadoras. Una de las celebraciones más importantes de Guatemala.' },
    { id: 'gt-039', nombre: 'Día del Agricultor / San Isidro Labrador', fecha: '2026-05-15', email: '', tipo: 'Religioso/Cultural', descripcion: 'Patrono de los agricultores. Celebrado especialmente en comunidades rurales guatemaltecas.' },
    { id: 'gt-040', nombre: 'Día Internacional de los Museos', fecha: '2026-05-18', email: '', tipo: 'Cultural', descripcion: 'Los museos guatemaltecos abren sus puertas con actividades especiales y entrada gratuita.' },

    // ── JUNIO ──
    { id: 'gt-041', nombre: 'Día Mundial del Medio Ambiente', fecha: '2026-06-05', email: '', tipo: 'Ambiental', descripcion: 'Promovido por la ONU para sensibilizar sobre la protección del medio ambiente.' },
    { id: 'gt-042', nombre: 'Fiesta de San Antonio de Padua', fecha: '2026-06-13', email: '', tipo: 'Patronal', descripcion: 'Feria patronal en municipios que tienen a San Antonio como patrono.' },
    { id: 'gt-043', nombre: 'Día del Padre', fecha: '2026-06-21', email: '', tipo: 'Cultural', descripcion: 'Celebración en honor a los padres de familia. Se festeja el tercer domingo de junio.' },
    { id: 'gt-044', nombre: 'Fiesta de San Juan Bautista', fecha: '2026-06-24', email: '', tipo: 'Patronal', descripcion: 'Festividades patronales en San Juan Sacatepéquez y otros municipios.' },
    { id: 'gt-045', nombre: 'Día del Maestro', fecha: '2026-06-25', email: '', tipo: 'Cívico', descripcion: 'Conmemoración a los educadores guatemaltecos, en homenaje a la maestra María Chinchilla, quien murió en 1944 durante una manifestación.' },
    { id: 'gt-046', nombre: 'Día del Ejército (trasladado al 29 de junio)', fecha: '2026-06-29', email: '', tipo: 'Feriado Nacional', descripcion: 'Asueto nacional trasladado. Conmemora la Revolución Liberal de 1871. En 2026 se corre del martes 30 al lunes 29 por la Ley de Turismo Interno.' },
    { id: 'gt-047', nombre: 'Día del Empleado Bancario', fecha: '2026-06-26', email: '', tipo: 'Profesional', descripcion: 'Cierre de bancos. Junto al traslado del Día del Ejército, genera cuatro días sin atención bancaria presencial.' },
    { id: 'gt-048', nombre: 'Fiesta de San Pedro y San Pablo', fecha: '2026-06-29', email: '', tipo: 'Patronal', descripcion: 'Feria patronal en municipios bajo la advocación de estos apóstoles.' },

    // ── JULIO ──
    { id: 'gt-049', nombre: 'Feria de Antigua Guatemala (inicio)', fecha: '2026-07-17', email: '', tipo: 'Cultural', descripcion: 'Inicio de las festividades de Antigua Guatemala en honor a Santiago Apóstol. Una semana de celebraciones coloniales.' },
    { id: 'gt-050', nombre: 'Fiesta de Santiago Apóstol (Antigua Guatemala)', fecha: '2026-07-25', email: '', tipo: 'Patronal', descripcion: 'Feria patronal de Antigua Guatemala y Sacatepéquez. Procesiones, danzas folclóricas y eventos culturales en el centro colonial.' },
    { id: 'gt-051', nombre: 'Festival Rabin Ajau (Cobán, Alta Verapaz)', fecha: '', email: '', tipo: 'Cultural', descripcion: 'Festival folclórico nacional celebrado en Cobán. Se elige a la Reina Indígena de Guatemala. Danzas tradicionales mayas. Fecha variable (finales de julio o principios de agosto).' },

    // ── AGOSTO ──
    { id: 'gt-052', nombre: 'Virgen de la Asunción (Ciudad de Guatemala)', fecha: '2026-08-15', email: '', tipo: 'Patronal/Feriado', descripcion: 'Feriado local de la Ciudad de Guatemala y Jocotenango. Patrona de la capital. En 2026 cae sábado.' },
    { id: 'gt-053', nombre: 'Festival Folklórico El Paab\'anc (Cobán)', fecha: '', email: '', tipo: 'Cultural', descripcion: 'Celebración religiosa y cultural de los pueblos indígenas Q\'eqchi\' en Cobán. Ofrendas, velas y danzas tradicionales. Fecha variable.' },

    // ── SEPTIEMBRE ──
    { id: 'gt-054', nombre: 'Víspera de Independencia / Carrera de Antorchas', fecha: '2026-09-14', email: '', tipo: 'Cívico', descripcion: 'La noche del 14 de septiembre, niños y jóvenes de todo Guatemala corren con antorchas encendidas para conmemorar la independencia.' },
    { id: 'gt-055', nombre: 'Día de la Independencia de Guatemala', fecha: '2026-09-15', email: '', tipo: 'Feriado Nacional', descripcion: 'Asueto nacional inamovible. Guatemala declaró su independencia el 15 de septiembre de 1821. Desfiles, conciertos y ceremonias en todo el país.' },

    // ── OCTUBRE ──
    { id: 'gt-056', nombre: 'Día del Niño', fecha: '2026-10-01', email: '', tipo: 'Social', descripcion: 'Celebración de la niñez en Guatemala. Actividades en escuelas y centros comunitarios.' },
    { id: 'gt-057', nombre: 'Fiestas de San Francisco de Asís (Totonicapán)', fecha: '2026-10-04', email: '', tipo: 'Patronal', descripcion: 'Feria patronal en Totonicapán y otros municipios. Danzas folclóricas, procesiones y eventos culturales.' },
    { id: 'gt-058', nombre: 'Día de la Hispanidad / Día del Pueblo Indígena', fecha: '2026-10-12', email: '', tipo: 'Cívico', descripcion: 'Fecha de reflexión sobre la herencia indígena y el encuentro de culturas entre América y Europa.' },
    { id: 'gt-059', nombre: 'Día de la Revolución de 1944', fecha: '2026-10-20', email: '', tipo: 'Feriado Nacional', descripcion: 'Asueto nacional inamovible. Conmemora la Revolución Guatemalteca de 1944 que puso fin al gobierno de Federico Ponce Vaides.' },
    { id: 'gt-060', nombre: 'Día de las Naciones Unidas', fecha: '2026-10-24', email: '', tipo: 'Internacional', descripcion: 'Aniversario de la Carta de las Naciones Unidas firmada en 1945.' },

    // ── NOVIEMBRE ──
    { id: 'gt-061', nombre: 'Día de Todos los Santos / Festival de Barriletes Gigantes', fecha: '2026-11-01', email: '', tipo: 'Feriado Nacional', descripcion: 'Asueto nacional. En Sumpango y Santiago Sacatepéquez se celebra el famoso Festival de Barriletes Gigantes, donde se elevan cometas de hasta 20 metros.' },
    { id: 'gt-062', nombre: 'Día de los Difuntos / Fiambre', fecha: '2026-11-02', email: '', tipo: 'Cultural', descripcion: 'Se visitan los cementerios en memoria de los difuntos. Tradición gastronómica: el Fiambre guatemalteco, plato típico con más de 50 ingredientes.' },

    // ── DICIEMBRE ──
    { id: 'gt-063', nombre: 'Quema del Diablo', fecha: '2026-12-07', email: '', tipo: 'Cultural', descripcion: 'Tradición popular donde se queman muñecos del Diablo a las 6PM. Simboliza la purificación y el inicio de las fiestas navideñas.' },
    { id: 'gt-064', nombre: 'Día de la Inmaculada Concepción', fecha: '2026-12-08', email: '', tipo: 'Religioso', descripcion: 'Fiesta religiosa en honor a la Virgen María. Feria patronal en muchos municipios de Guatemala.' },
    { id: 'gt-065', nombre: 'Día de la Virgen de Guadalupe', fecha: '2026-12-12', email: '', tipo: 'Religioso', descripcion: 'Celebración de la Virgen de Guadalupe, con misas y actividades religiosas.' },
    { id: 'gt-066', nombre: 'Fiesta de Santo Tomás (Chichicastenango)', fecha: '2026-12-13', email: '', tipo: 'Cultural', descripcion: 'Una de las ferias más grandes e importantes de Guatemala, en Chichicastenango, Quiché. Del 13 al 21 de diciembre. Danza del Palo Volador e intercambio de culturas indígenas.' },
    { id: 'gt-067', nombre: 'Danza del Palo Volador (Chichicastenango)', fecha: '2026-12-21', email: '', tipo: 'Cultural', descripcion: 'Ritual del Palo Volador el 21 de diciembre en Chichicastenango. Participantes indígenas se lanzan desde lo alto de un poste sujetos con cuerdas.' },
    { id: 'gt-068', nombre: 'Día de los Santos Inocentes', fecha: '2026-12-28', email: '', tipo: 'Cultural', descripcion: 'Día de bromas y chistes en Guatemala. También se conmemora la masacre de los niños de Belén.' },
    { id: 'gt-069', nombre: 'Aniversario de los Acuerdos de Paz', fecha: '2026-12-29', email: '', tipo: 'Cívico', descripcion: 'Conmemoración de la firma de los Acuerdos de Paz Firme y Duradera de 1996, que puso fin al conflicto armado interno de 36 años.' },
    { id: 'gt-070', nombre: 'Nochebuena', fecha: '2026-12-24', email: '', tipo: 'Feriado Nacional', descripcion: 'Medio día de asueto a partir de las 12:00. Cenas familiares y fuegos artificiales a medianoche.' },
    { id: 'gt-071', nombre: 'Navidad', fecha: '2026-12-25', email: '', tipo: 'Feriado Nacional', descripcion: 'Asueto nacional. En 2026 cae viernes, creando un fin de semana largo.' },
    { id: 'gt-072', nombre: 'Fin de Año', fecha: '2026-12-31', email: '', tipo: 'Feriado Nacional', descripcion: 'Medio día de asueto a partir de las 12:00. Celebraciones con fuegos artificiales a medianoche.' },

    // ── FECHA VARIABLE ──
    { id: 'gt-073', nombre: 'Semana Santa (Domingo de Ramos)', fecha: '', email: '', tipo: 'Religioso', descripcion: 'Inicio de la Semana Santa. Procesiones de ramos en toda Guatemala. Fecha variable.' },
];

// ==========================================
// FUNCIONES DE LECTURA Y ESCRITURA
// ==========================================
function readData() {
    try {
        if (!fs.existsSync(DATA_FILE)) {
            const defaultData = { users: {}, settings: { notificationHour: 3, notificationMinute: 0, theme: 'light', runInBackground: true, startWithWindows: false } };
            fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2), 'utf-8');
            return defaultData;
        }
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        return JSON.parse(raw);
    } catch (err) {
        console.error('Error leyendo datos:', err);
        return { users: {}, settings: {} };
    }
}

function writeData(data) {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
        console.error('Error escribiendo datos:', err);
    }
}

// ==========================================
// NORMALIZACIÓN DE ESQUEMA LEGACY / NUEVO
// ==========================================
function normalizeTask(task = {}) {
    const normalized = { ...task };

    normalized.id = normalized.id || normalized._id || crypto.randomUUID();
    normalized.title = normalized.title || normalized.nombre || 'Sin título';
    normalized.date = normalized.date || normalized.fecha || '';
    normalized.time = normalized.time || normalized.hora || '';
    normalized.description = normalized.description ?? normalized.descripcion ?? '';
    normalized.duration = normalized.duration || normalized.duracion || 60;
    normalized.location = normalized.location || normalized.ubicacion || '';
    normalized.url = normalized.url || normalized.enlace || '';
    normalized.category = normalized.category || normalized.categoria || normalized.tipo || 'general';
    normalized.tags = Array.isArray(normalized.tags) ? normalized.tags : [];
    normalized.recurrence = normalized.recurrence || normalized.repeticion || 'none';
    normalized.recurrenceEnd = normalized.recurrenceEnd || normalized.finRepeticion || '';
    normalized.reminderMinutes = Number.isInteger(normalized.reminderMinutes) ? normalized.reminderMinutes : 0;
    normalized.emailEnabled = normalized.emailEnabled !== false;
    normalized.priority = normalized.priority || normalized.prioridad || 'medium';
    normalized.status = normalized.status || normalized.estado || 'todo';
    normalized.category = normalized.category || normalized.categoria || 'general';
    normalized.createdAt = normalized.createdAt || Date.now();
    normalized.updatedAt = normalized.updatedAt || normalized.createdAt;

    normalized.nombre = normalized.title;
    normalized.fecha = normalized.date;
    normalized.hora = normalized.time;
    normalized.duracion = normalized.duration;
    normalized.ubicacion = normalized.location;
    normalized.enlace = normalized.url;
    normalized.descripcion = normalized.description;
    normalized.prioridad = normalized.priority;
    normalized.estado = normalized.status;
    normalized.categoria = normalized.category;
    normalized.repeticion = normalized.recurrence;
    normalized.finRepeticion = normalized.recurrenceEnd;

    if (normalized.tipo && !normalized.category) normalized.category = normalized.tipo;
    if (normalized.tipo && !normalized.categoria) normalized.categoria = normalized.tipo;

    return normalized;
}

function taskArray(value) {
    if (Array.isArray(value)) return value;
    if (value && typeof value === 'object') return [value];
    return [];
}

function mergeTaskLists(...sources) {
    const merged = new Map();

    sources.flatMap(taskArray).forEach(task => {
        const normalized = normalizeTask(task);
        if (!merged.has(normalized.id)) merged.set(normalized.id, normalized);
    });

    return [...merged.values()];
}

function syncUserAliases(user) {
    if (!user) return user;

    const tasks = mergeTaskLists(user.tasks, user.tareas);
    const deletedTasks = mergeTaskLists(user.deletedTasks, user.papelera);
    const emails = Array.isArray(user.emails) ? user.emails : Array.isArray(user.destinatarios) ? user.destinatarios : [];

    user.tasks = tasks;
    user.tareas = tasks;
    user.deletedTasks = deletedTasks;
    user.papelera = deletedTasks;
    user.emails = emails;
    user.destinatarios = emails;

    return user;
}

function normalizeUser(user) {
    if (!user) return null;
    const safeUser = syncUserAliases({ ...user });
    const { password, ...userData } = safeUser;
    userData.tasks = (userData.tasks || []).map(normalizeTask);
    userData.deletedTasks = (userData.deletedTasks || []).map(normalizeTask);
    return userData;
}



// ==========================================
// API PÚBLICA
// ==========================================
function validateUser(username, password) {
    const data = readData();
    const user = data.users[username];
    return user && user.password === password;
}

function createUser(username, password) {
    const data = readData();
    if (data.users[username]) throw new Error('El usuario ya existe');
    const initialTasks = EVENTOS_GUATEMALA.map(e => normalizeTask({
        ...e,
        title: e.nombre,
        date: e.fecha,
        description: e.descripcion,
        priority: 'medium',
        status: 'todo',
        category: e.tipo || 'general'
    }));

    data.users[username] = {
        password,
        rol: 'usuario',
        tasks: initialTasks,
        tareas: initialTasks,
        deletedTasks: [],
        papelera: [],
        emails: [],
        destinatarios: [],
        profilePic: null,
        createdAt: Date.now()
    };
    writeData(data);
}

function getDataForUser(username) {
    const data = readData();

    const user = data.users[username];
    if (!user) return null;

    const normalizedUser = syncUserAliases(user);

    if (normalizedUser.tasks.length === 0) {
        const fallbackTasks = (EVENTOS_GUATEMALA.map(e => normalizeTask({
            ...e,
            title: e.nombre,
            date: e.fecha,
            description: e.descripcion,
            priority: 'medium',
            status: 'todo',
            category: e.tipo || 'general'
        }))); 
        normalizedUser.tasks = fallbackTasks;
        normalizedUser.tareas = fallbackTasks;
        console.log(`✅ Eventos migrados para: ${username}`);
    }

    data.users[username] = syncUserAliases(normalizedUser);
    writeData(data);
    return normalizeUser(data.users[username]);
}

function updateUserData(username, updates) {
    const data = readData();
    if (!data.users[username]) throw new Error('Usuario no encontrado');

    const currentUser = syncUserAliases({ ...data.users[username] });
    const mergedUser = { ...currentUser, ...updates };
    const normalized = syncUserAliases(mergedUser);
    data.users[username] = normalized;
    writeData(data);
}

function updateTask(username, taskId, updatedFields) {
    const data = readData();
    const user = syncUserAliases(data.users[username]);
    if (!user) throw new Error('Usuario no encontrado');

    const taskList = user.tasks || user.tareas || [];
    const idx = taskList.findIndex(t => t.id === taskId);
    if (idx === -1) throw new Error('Tarea no encontrada');

    taskList[idx] = normalizeTask({ ...taskList[idx], ...updatedFields, updatedAt: Date.now() });
    user.tasks = taskList;
    user.tareas = taskList;
    data.users[username] = user;
    writeData(data);
    return taskList[idx];
}

function setTaskStatus(username, taskId, status) {
    return updateTask(username, taskId, { status });
}

function exportUserData(username) {
    const data = readData();
    const user = data.users[username];
    if (!user) throw new Error('Usuario no encontrado');
    return JSON.stringify(normalizeUser(user), null, 2);
}

function importUserData(username, serializedData) {
    const imported = JSON.parse(serializedData);
    if (!imported || typeof imported !== 'object') throw new Error('Archivo de respaldo inválido');
    const data = readData();
    if (!data.users[username]) throw new Error('Usuario no encontrado');
    const importedTasks = mergeTaskLists(imported.tasks, imported.tareas);
    data.users[username] = syncUserAliases({
        ...data.users[username],
        tasks: importedTasks,
        tareas: importedTasks,
        emails: Array.isArray(imported.emails) ? imported.emails : data.users[username].emails
    });
    writeData(data);
}

function deleteTask(username, taskId) {
    const data = readData();
    const user = syncUserAliases(data.users[username]);
    if (!user) throw new Error('Usuario no encontrado');

    const taskList = user.tasks || user.tareas || [];
    const idx = taskList.findIndex(t => t.id === taskId);
    if (idx === -1) throw new Error('Tarea no encontrada');

    const [task] = taskList.splice(idx, 1);
    const deletedList = user.deletedTasks || user.papelera || [];
    deletedList.push({ ...task, deletedAt: Date.now() });

    user.tasks = taskList;
    user.tareas = taskList;
    user.deletedTasks = deletedList;
    user.papelera = deletedList;
    data.users[username] = user;
    writeData(data);
}

function restoreTask(username, taskId) {
    const data = readData();
    const user = syncUserAliases(data.users[username]);
    if (!user) throw new Error('Usuario no encontrado');

    const deletedList = user.deletedTasks || user.papelera || [];
    const idx = deletedList.findIndex(t => t.id === taskId);
    if (idx === -1) throw new Error('Tarea no encontrada en papelera');

    const [task] = deletedList.splice(idx, 1);
    delete task.deletedAt;
    const taskList = user.tasks || user.tareas || [];
    taskList.push(task);

    user.tasks = taskList;
    user.tareas = taskList;
    user.deletedTasks = deletedList;
    user.papelera = deletedList;
    data.users[username] = user;
    writeData(data);
}

function permanentDelete(username, taskId) {
    const data = readData();
    const user = syncUserAliases(data.users[username]);
    if (!user) throw new Error('Usuario no encontrado');

    const deletedList = user.deletedTasks || user.papelera || [];
    const nextDeleted = deletedList.filter(t => t.id !== taskId);

    user.deletedTasks = nextDeleted;
    user.papelera = nextDeleted;
    data.users[username] = user;
    writeData(data);
}

function getStats(username) {
    const data = readData();
    const user = syncUserAliases(data.users[username]);
    const tasks = user ? (user.tasks || user.tareas || []) : [];
    const deletedTasks = user ? (user.deletedTasks || user.papelera || []) : [];
    const emails = user ? (user.emails || user.destinatarios || []) : [];

    if (!user) return { total: 0, completed: 0, urgent: 0, conFecha: 0, sinFecha: 0, papelera: 0, destinatarios: 0 };

    return {
        total: tasks.length,
        completed: tasks.filter(t => t.status === 'completed').length,
        urgent: tasks.filter(t => (t.priority === 'urgent' || t.priority === 'high') && t.status !== 'completed').length,
        conFecha: tasks.filter(t => t.date || t.fecha).length,
        sinFecha: tasks.filter(t => !(t.date || t.fecha)).length,
        papelera: deletedTasks.length,
        destinatarios: emails.length
    };
}

function getSettings() {
    const data = readData();
    return {
        notificationHour: 3,
        notificationMinute: 0,
        theme: 'light',
        runInBackground: true,
        startWithWindows: false,
        ...(data.settings || {})
    };
}

function updateSettings(newSettings) {
    const data = readData();
    data.settings = { ...data.settings, ...newSettings };
    writeData(data);
}

function getAllUsersForEmail() {
    const data = readData();
    return Object.entries(data.users).map(([username, userData]) => {
        const normalized = syncUserAliases({ ...userData });
        return {
            username,
            tareas: normalized.tasks || normalized.tareas || [],
            destinatarios: normalized.emails || normalized.destinatarios || []
        };
    });
}

module.exports = {
    validateUser,
    createUser,
    getDataForUser,
    updateUserData,
    updateTask,
    setTaskStatus,
    exportUserData,
    importUserData,
    deleteTask,
    restoreTask,
    permanentDelete,
    getStats,
    getSettings,
    updateSettings,
    getAllUsersForEmail,
    DATA_DIR,
    UPLOADS_DIR
};