// js/main.js
import { authService } from './AuthService.js';
import { updateMainViews } from './UIUpdater.js';
import { renderNavbar } from './Navbar.js';
import { renderDashboard } from './Dashboard.js';
import { shoppingCart } from './Modulo/ShoppingCart.js';
import { productList } from './Modulo/ProductList.js';
import { apiService } from './Facade/ApiService.js';
import { notificationUI } from './Observer/NotificationUI.js';


function initializeApp() {
    notificationUI.init(); 
    updateUI();
}

function updateUI() {
    const isAuthenticated = authService.isAuthenticated();
    updateMainViews(isAuthenticated);
    renderNavbar();
    renderDashboard(); // Esto ahora renderiza toda la tienda
}

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const success = authService.login(
        document.getElementById('username').value,
        document.getElementById('password').value
    );
    if (success) {
        updateUI();
    } else {
        alert('Credenciales incorrectas');
    }
});

document.addEventListener('click', async (e) => {
    const target = e.target;
    if (!target) return;

    // Lógica de Logout (sin cambios)
    if (target.id === 'logout-button') {
        authService.logout();
        shoppingCart.clear();
        updateUI();
    }

    // Lógica de Agregar Producto (sin cambios)
    if (target.dataset.productId) {
        const product = productList.getProductById(parseInt(target.dataset.productId));
        if (product) shoppingCart.addItem(product);
    }

    // --- NUEVA LÓGICA PARA USAR LA FACHADA ---
    if (target.id === 'load-countries-btn') {
        const resultsDiv = document.getElementById('api-results');
        resultsDiv.innerHTML = 'Cargando...';

        // Usamos el método simple de la fachada, sin preocuparnos por fetch
        const countries = await apiService.getCountries();

        if (countries) {
            resultsDiv.innerHTML = `
                <h4>Países Cargados:</h4>
                <ul>
                    ${countries.slice(0, 5).map(c => `<li>${c.name} (ID: ${c.id})</li>`).join('')}
                </ul>
            `;
        } else {
            resultsDiv.innerHTML = 'Error al cargar los datos.';
        }
    }

    if (target.id === 'apply-discount-btn') {
        const codeInput = document.getElementById('discount-code-input');
        if (codeInput) {
            // El main.js no sabe NADA sobre descuentos.
            // Simplemente le pasa el código al carrito.
            shoppingCart.applyDiscountCode(codeInput.value);
        }
    }
});


initializeApp();