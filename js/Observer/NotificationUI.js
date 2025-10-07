// js/NotificationUI.js
import { notificationService } from './NotificationService.js';

const notificationContainer = document.getElementById('notification-bar');

// Función que se ejecutará cuando llegue una notificación
function showNotification(type, data) {
    let message = '';
    if (type === 'NUEVO_PRODUCTO') {
        message = `¡Nuevo producto disponible!: <strong>${data.name}</strong> a solo $${data.price.toFixed(2)}`;
    } else if (type === 'OFERTA_ESPECIAL') {
        message = `¡Oferta especial!: <strong>${data.name}</strong> con ${data.discount}% de descuento.`;
    }

    if (message) {
        notificationContainer.innerHTML = message;
        notificationContainer.style.display = 'block';
        // Ocultar la notificación después de 5 segundos
        setTimeout(() => {
            notificationContainer.style.display = 'none';
        }, 5000);
    }
}

// Módulo que se suscribe al servicio de notificaciones
export const notificationUI = {
    init: () => {
        // Le decimos al servicio: "Cuando haya una notificación, ejecuta mi función showNotification"
        notificationService.subscribe(showNotification);
    }
};