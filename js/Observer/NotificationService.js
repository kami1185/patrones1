// js/NotificationService.js

// Usamos el Patrón Módulo para crear nuestro servicio de notificaciones.
export const notificationService = (() => {
    // Lista privada de suscriptores (observadores)
    const _subscribers = [];

    return {
        /**
         * Permite que un módulo se suscriba a las notificaciones.
         * @param {function} callback - La función que se ejecutará al recibir una notificación.
         */
        subscribe: (callback) => {
            _subscribers.push(callback);
            console.log("Observer: Nuevo suscriptor añadido.");
        },

        /**
         * Envía una notificación a todos los suscriptores.
         * @param {string} type - El tipo de notificación (ej. 'NUEVO_PRODUCTO', 'OFERTA').
         * @param {object} data - La información relevante para la notificación.
         */
        notify: (type, data) => {
            console.log(`Subject: Notificando a ${_subscribers.length} suscriptores sobre ${type}.`);
            _subscribers.forEach(callback => callback(type, data));
        }
    };
})();