
class AuthService {
    static #instance;

    #currentUser = null;
    #isAuthenticated = false;

    constructor() {
        if (AuthService.#instance) {
            return AuthService.#instance;
        }
        AuthService.#instance = this;
    }

    // --- MÉTODO FALTANTE AÑADIDO AQUÍ ---
    // Este es el método público y estático para obtener la instancia.
    static getInstance() {
        if (!this.#instance) {
            // Si no existe, la crea llamando al constructor.
            this.#instance = new AuthService();
        }
        return this.#instance;
    }
    // --- FIN DE LA CORRECCIÓN ---

    login(username, password) {
        alert(username,password)
        let user = null;
        if (username === 'admin' && password === '1234') {
            user = { name: 'Super Admin', role: 'admin' };
        } else if (username === 'user' && password === '1234') {
            user = { name: 'Juan Pérez', role: 'user' };
        }

        if (user) {
            this.#currentUser = user;
            this.#isAuthenticated = true;
            return true;
        }
        return false;
    }

    logout() {
        this.#currentUser = null;
        this.#isAuthenticated = false;
    }

    isAuthenticated() {
        return this.#isAuthenticated;
    }

    getUser() {
        return this.#currentUser;
    }
}

// Ahora esta línea funcionará correctamente porque el método ya existe.
export const authService = AuthService.getInstance();