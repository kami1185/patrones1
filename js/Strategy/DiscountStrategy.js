// js/strategies/DiscountStrategy.js

/**
 * Estrategia para aplicar un descuento porcentual.
 */
export class PercentageDiscount {
    constructor(percentage) {
        this.percentage = percentage;
    }

    apply(total) {
        return total - (total * (this.percentage / 100));
    }
}

/**
 * Estrategia para aplicar un descuento de monto fijo.
 */
export class FixedAmountDiscount {
    constructor(amount) {
        this.amount = amount;
    }

    apply(total) {
        return Math.max(0, total - this.amount); // Evita un total negativo
    }
}

/**
 * Estrategia por defecto: no aplicar ningún descuento.
 */
export class NoDiscount {
    apply(total) {
        return total; // Simplemente devuelve el total sin cambios
    }
}