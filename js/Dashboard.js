// js/Dashboard.js
import { authService } from './AuthService.js';
import { shoppingCart } from './Modulo/ShoppingCart.js';
import { productList } from './Modulo/ProductList.js';


const dashboardView = document.getElementById('dashboard-view');
const dashboardContentEl = document.getElementById('dashboard-view');

export function renderDashboard() {
    if (authService.isAuthenticated()) {
        const user = authService.getUser();
        
        // Ahora renderizamos dentro del div principal del dashboard
        dashboardContentEl.innerHTML = `
            <div id="dashboard-content">
                 <h2>Bienvenido a la tienda, ${user.name}</h2>
                <div id="store-layout">
                    <div id="product-list"></div>
                    <div id="cart"></div>
                </div>
            </div>
        ` + dashboardContentEl.innerHTML; // Mantenemos el HTML de la demo de la fachada

        productList.render('#product-list');
        shoppingCart.init('#cart');
    }
}