

// ==========================================
// DICCIONARIO Y LÓGICA DE TRADUCCIÓN EN LOGIN
// ==========================================
const LoginTranslations = {
    en: {
        loginTitle: 'Welcome back',
        loginSubtitle: 'Enter your details to access your account',
        registerTitle: 'Create account',
        registerSubtitle: 'Join TaskMail to manage your events',
        usernameLabel: 'Username',
        usernamePlaceholderLogin: 'Enter your username',
        usernamePlaceholderRegister: 'Choose a username',
        passwordLabel: 'Password',
        rememberMe: 'Remember me',
        signInBtn: 'Sign In',
        createAccountBtn: 'Create Account',
        noAccount: "Don't have an account?",
        createOne: 'Create one',
        alreadyHaveAccount: 'Already have an account?',
        signInLink: 'Sign in',
        passRequirementsTitle: 'Password Requirements',
        reqLength: '8-20 characters',
        reqUpper: 'One uppercase letter',
        reqLower: 'One lowercase letter',
        reqNumber: 'One number',
        strengthVeryWeak: 'Very weak',
        strengthWeak: 'Weak',
        strengthMedium: 'Medium',
        strengthStrong: 'Strong'
    },
    es: {
        loginTitle: 'Bienvenido de nuevo',
        loginSubtitle: 'Ingresa tus datos para acceder a tu cuenta',
        registerTitle: 'Crear cuenta',
        registerSubtitle: 'Únete a TaskMail para gestionar tus eventos',
        usernameLabel: 'Nombre de usuario',
        usernamePlaceholderLogin: 'Ingresa tu nombre de usuario',
        usernamePlaceholderRegister: 'Elige un nombre de usuario',
        passwordLabel: 'Contraseña',
        rememberMe: 'Recordarme',
        signInBtn: 'Iniciar Sesión',
        createAccountBtn: 'Crear Cuenta',
        noAccount: '¿No tienes una cuenta?',
        createOne: 'Crea una',
        alreadyHaveAccount: '¿Ya tienes una cuenta?',
        signInLink: 'Iniciar sesión',
        passRequirementsTitle: 'Requisitos de la contraseña',
        reqLength: '8-20 caracteres',
        reqUpper: 'Una letra mayúscula',
        reqLower: 'Una letra minúscula',
        reqNumber: 'Un número',
        strengthVeryWeak: 'Muy débil',
        strengthWeak: 'Débil',
        strengthMedium: 'Media',
        strengthStrong: 'Fuerte'
    }
};

let currentLang = localStorage.getItem('appLanguage') || 'es';

function getTranslation(key) {
    return (LoginTranslations[currentLang] && LoginTranslations[currentLang][key]) || key;
}

function applyLoginTranslations() {
    // Actualiza textos por atributo data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        el.textContent = getTranslation(key);
    });

    // Actualiza placeholders
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
        const key = el.dataset.i18nPh;
        el.placeholder = getTranslation(key);
    });

    // Sincroniza el selector de idioma
    const langSelector = document.getElementById('login-lang-selector');
    if (langSelector) {
        langSelector.value = currentLang;
    }
}

// Inicialización de idioma al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    applyLoginTranslations();

    const langSelector = document.getElementById('login-lang-selector');
    if (langSelector) {
        langSelector.addEventListener('change', (e) => {
            currentLang = e.target.value;
            localStorage.setItem('appLanguage', currentLang);
            applyLoginTranslations();
        });
    }
});

// ==========================================
// UTILIDADES DE INTERFAZ EXISTENTES
// ==========================================
function togglePassword(id) {
    const input = document.getElementById(id);
    const toggle = input.parentNode.querySelector('.toggle-password');

    if (input.type === 'password') {
        input.type = 'text';
        toggle.dataset.visible = 'true';
        toggle.setAttribute('aria-label', currentLang === 'es' ? 'Ocultar contraseña' : 'Hide password');
    } else {
        input.type = 'password';
        toggle.dataset.visible = 'false';
        toggle.setAttribute('aria-label', currentLang === 'es' ? 'Mostrar contraseña' : 'Show password');
    }
}

// ==========================================
// UTILIDADES DE INTERFAZ
// ==========================================
function togglePassword(id) {
    const input = document.getElementById(id);
    const toggle = input.parentNode.querySelector('.toggle-password');

    if (input.type === 'password') {
        input.type = 'text';
        toggle.dataset.visible = 'true';
        toggle.setAttribute('aria-label', 'Ocultar contraseña');
    } else {
        input.type = 'password';
        toggle.dataset.visible = 'false';
        toggle.setAttribute('aria-label', 'Mostrar contraseña');
    }
}

function switchAuthMode(mode) {
    const viewLogin = document.getElementById('view-login');
    const viewRegister = document.getElementById('view-register');

    if (mode === 'register') {
        viewLogin.style.display = 'none';
        viewRegister.style.display = 'block';
    } else {
        viewLogin.style.display = 'block';
        viewRegister.style.display = 'none';
    }
}

// ==========================================
// VALIDACIONES
// ==========================================
function validarUsuario(valor) {
    if (!valor) return "El usuario es obligatorio.";
    if (valor.length < 4) return "Mínimo 4 caracteres.";
    if (valor.length > 20) return "Máximo 20 caracteres.";
    if (!/^[a-zA-Z0-9_]+$/.test(valor)) return "Solo letras, números y guion bajo (_).";
    return null;
}

function validarPassword(valor) {
    if (!valor) return "La contraseña es obligatoria.";
    if (valor.length < 8) return "Mínimo 8 caracteres.";
    if (valor.length > 20) return "Máximo 20 caracteres.";
    if (!/[A-Z]/.test(valor)) return "Debe contener al menos una mayúscula.";
    if (!/[a-z]/.test(valor)) return "Debe contener al menos una minúscula.";
    if (!/[0-9]/.test(valor)) return "Debe contener al menos un número.";
    return null;
}

function mostrarError(id, mensaje) {
    const el = document.getElementById(id);
    if (el) el.textContent = mensaje || '';
}

function limpiarErrores(...ids) {
    ids.forEach(id => mostrarError(id, ''));
}

// ==========================================
// VALIDADOR EN TIEMPO REAL DE CONTRASEÑA
// ==========================================
const registroPasswordInput = document.getElementById('registroPassword');
if (registroPasswordInput) {
    registroPasswordInput.addEventListener('input', function(e) {
        actualizarValidadorVisual(e.target.value);
    });
}

function actualizarValidadorVisual(password) {
    const tieneLength = password.length >= 8 && password.length <= 20;
    const tieneUpper = /[A-Z]/.test(password);
    const tieneLower = /[a-z]/.test(password);
    const tieneNumber = /[0-9]/.test(password);

    actualizarRequirement('req-length', tieneLength);
    actualizarRequirement('req-upper', tieneUpper);
    actualizarRequirement('req-lower', tieneLower);
    actualizarRequirement('req-number', tieneNumber);

    const requisitosCompletados = [tieneLength, tieneUpper, tieneLower, tieneNumber].filter(Boolean).length;
    actualizarBarraFuerza(requisitosCompletados);
}

function actualizarRequirement(id, cumplido) {
    const elem = document.getElementById(id);
    if (elem) {
        cumplido ? elem.classList.add('met') : elem.classList.remove('met');
    }
}

function actualizarBarraFuerza(requisitosCompletados) {
    const barFill = document.getElementById('strengthBar');
    const barLabel = document.getElementById('strengthLabel');
    if (!barFill || !barLabel) return;

    const porcentaje = (requisitosCompletados / 4) * 100;
    barFill.style.width = porcentaje + '%';
    barFill.classList.remove('medium', 'strong');

    if (requisitosCompletados === 0) barLabel.textContent = 'Muy débil';
    else if (requisitosCompletados === 1) barLabel.textContent = 'Débil';
    else if (requisitosCompletados === 2) { barLabel.textContent = 'Media'; barFill.classList.add('medium'); }
    else if (requisitosCompletados === 3) { barLabel.textContent = 'Fuerte'; barFill.classList.add('strong'); }
    else if (requisitosCompletados === 4) { barLabel.textContent = 'Muy fuerte'; barFill.classList.add('strong'); }
}

// ==========================================
// LOGIN
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('login-entering');
    window.requestAnimationFrame(() => document.body.classList.add('login-ready'));
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
        document.getElementById('loginUsuario').value = rememberedUser;
        document.getElementById('remember-me').checked = true;
    }
});

document.getElementById('formularioLogin').addEventListener('submit', async function(e) {
    e.preventDefault();

    const usuario = document.getElementById('loginUsuario').value.trim();
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('remember-me').checked;

    limpiarErrores('errorLoginUsuario', 'errorLoginPassword', 'errorLoginGeneral');

    const errorU = validarUsuario(usuario);
    const errorP = validarPassword(password);

    if (errorU) { mostrarError('errorLoginUsuario', errorU); return; }
    if (errorP) { mostrarError('errorLoginPassword', errorP); return; }

    try {
        const result = await window.api.auth.login(usuario, password);
        if (result.success) {
            if (rememberMe) {
                localStorage.setItem('rememberedUser', usuario);
            } else {
                localStorage.removeItem('rememberedUser');
            }
            localStorage.setItem('sesionActual', JSON.stringify(result.session));
            document.body.classList.add('login-exiting');
            window.setTimeout(() => { window.location.href = 'index.html'; }, 260);
        } else {
            mostrarError('errorLoginGeneral', '❌ ' + result.error);
        }
    } catch (error) {
        mostrarError('errorLoginGeneral', '❌ Error de conexión con el sistema.');
    }
});

// ==========================================
// REGISTRO
// ==========================================
document.getElementById('formularioRegistro').addEventListener('submit', async function(e) {
    e.preventDefault();

    const usuario = document.getElementById('registroUsuario').value.trim();
    const password = document.getElementById('registroPassword').value;

    limpiarErrores('errorRegistroUsuario', 'errorRegistroPassword');

    const errorU = validarUsuario(usuario);
    const errorP = validarPassword(password);

    if (errorU) { mostrarError('errorRegistroUsuario', errorU); return; }
    if (errorP) { mostrarError('errorRegistroPassword', errorP); return; }

    try {
        const result = await window.api.auth.register(usuario, password);
        if (result.success) {
            document.getElementById('formularioRegistro').reset();
            actualizarValidadorVisual('');

            const btn = document.querySelector('#formularioRegistro button');
            const textOriginal = btn.textContent;
            btn.textContent = '✅ Cuenta creada';
            btn.style.background = 'rgba(46, 204, 113, 0.3)';
            btn.style.borderColor = 'rgba(46, 204, 113, 0.6)';

            setTimeout(() => {
                btn.textContent = textOriginal;
                btn.style.background = '';
                btn.style.borderColor = '';
            }, 3000);
        } else {
            mostrarError('errorRegistroUsuario', '❌ ' + result.error);
        }
    } catch (error) {
        mostrarError('errorRegistroUsuario', '❌ Error al crear la cuenta.');
    }
});
