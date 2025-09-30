
// Elementos de la UI que este módulo controla
const loginView = document.getElementById('login-view');
const dashboardView = document.getElementById('dashboard-view');

export function updateMainViews(isAuthenticated) {
    if (isAuthenticated) {
        loginView.style.display = 'none';
        dashboardView.style.display = 'block';
    } else {
        loginView.style.display = 'block';
        dashboardView.style.display = 'none';
    }
}