// js/ProductList.js

import { notificationService } from './../Observer/NotificationService.js'; 

const _products = [
    { id: 1, name: 'Café de Colombia', price: 12.50 },
    { id: 2, name: 'Libro de Realismo Mágico', price: 22.00 },
    { id: 3, name: 'Sombrero Vueltiao', price: 55.00 }
];

export const productList = {
    render: (containerId) => {
        const container = document.querySelector(containerId);
        if (!container) return;

         setTimeout(() => {
            const nuevoProducto = { id: 4, name: 'Café de Origen Único', price: 28.00 };
            // El módulo de productos NO actualiza la UI directamente.
            // Simplemente anuncia el evento al servicio de notificaciones.
            notificationService.notify('NUEVO_PRODUCTO', nuevoProducto);
        }, 5000);

        let productsHTML = _products.map(p => `
            <div class="product-item">
                <strong>${p.name}</strong> - $${p.price.toFixed(2)}
                <button data-product-id="${p.id}">Agregar</button>
            </div>
        `).join('');

        container.innerHTML = `<h3>Productos</h3>${productsHTML}`;

       
    },
    getProductById: (id) => {
        return _products.find(p => p.id === id);
    }
};

