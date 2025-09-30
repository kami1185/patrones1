import { authService } from './AuthService.js';

const navContent = document.getElementById('nav-content');

export function renderNavbar() {
    // Limpiamos la barra de navegación antes de renderizar
    navContent.innerHTML = '';

    if (authService.isAuthenticated()) {
        const user = authService.getUser();
        navContent.innerHTML = `
            <span>Bienvenido, ${user.name}</span>
            <button id="logout-button">Logout</button>
        `;
    } else {
        navContent.innerHTML = `<span>Por favor, inicia sesión</span>`;
    }
}