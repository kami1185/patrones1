// js/ShoppingCart.js

export const shoppingCart = (() => {
    // --- PARTE PRIVADA ---
    let _items = []; // Estado privado
    let _cartContainer = null; // Referencia al elemento del DOM

    // Método privado para renderizar el carrito en el HTML
    function _render() {
        if (!_cartContainer) return;
        
        let total = 0;
        let itemsHTML = _items.map(item => {
            total += item.price * item.quantity;
            return `<li>${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</li>`;
        }).join('');

        _cartContainer.innerHTML = `
            <h3>🛒 Carrito</h3>
            <ul>${itemsHTML}</ul>
            <hr>
            <strong>Total: $${total.toFixed(2)}</strong>
        `;
    }

    // --- API PÚBLICA (lo que retornamos) ---
    return {
        // Método público para inicializar el módulo y decirle dónde renderizar
        init: (containerId) => {
            _cartContainer = document.querySelector(containerId);
            _render();
        },
        addItem: (product) => {
            const existingItem = _items.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                _items.push({ ...product, quantity: 1 });
            }
            _render();
        },
        clear: () => {
            _items = [];
            _render();
        }
    };
})();