// js/ShoppingCart.js
import { PercentageDiscount, FixedAmountDiscount, NoDiscount } from './../Strategy/DiscountStrategy.js';


export const shoppingCart = (() => {
    // --- PARTE PRIVADA ---
    let _items = []; // Estado privado
    let _cartContainer = null; // Referencia al elemento del DOM

    let _discountStrategy = new NoDiscount(); // Inicia con la estrategia por defecto


    // Método privado para renderizar el carrito en el HTML
    function _render() {
        if (!_cartContainer) return;

        let total = 0;

        const subtotal = _items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const finalTotal = _discountStrategy.apply(subtotal); // ¡Aquí se usa la estrategia!


        let itemsHTML = _items.map(item => {
            total += item.price * item.quantity;
            return `<li>${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</li>`;
        }).join('');

        _cartContainer.innerHTML = `
            <h3>🛒 Carrito</h3>
            <ul>${itemsHTML}</ul>
            <hr>
            <p>Subtotal: <strong>$${subtotal.toFixed(2)}</strong></p>
            <p>Total Final: <strong style="color: green;">$${finalTotal.toFixed(2)}</strong></p>
            <div id="discount-form">
                <input type="text" id="discount-code-input" placeholder="Código de descuento">
                <button id="apply-discount-btn">Aplicar</button>
            </div>
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
        applyDiscountCode: (code) => {
            switch (code.toUpperCase()) {
                case '10OFF':
                    _discountStrategy = new PercentageDiscount(10);
                    console.log("Strategy: Aplicando 10% de descuento.");
                    break;
                case '5DOLLARS':
                    _discountStrategy = new FixedAmountDiscount(5);
                    console.log("Strategy: Aplicando $5 de descuento.");
                    break;
                default:
                    _discountStrategy = new NoDiscount();
                    alert('Código de descuento no válido.');
            }
            _render(); // Vuelve a renderizar el carrito para mostrar el nuevo total
        },
        clear: () => {
            _items = [];
            _render();
        }
    };
})();