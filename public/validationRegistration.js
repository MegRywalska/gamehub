document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmInput = document.getElementById("password_confirmation");
    const statuteCheckbox = document.getElementById("statute");

    const showError = (id, message) => {
        const errorP = document.getElementById(`error_${id}`);
        if (errorP) errorP.textContent = message;
    };

    const clearErrors = () => {
        const errorMessages = document.querySelectorAll("p[id^='error_']");
        errorMessages.forEach(el => el.textContent = "");
    };

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        clearErrors();

        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const confirm = confirmInput.value.trim();

        let hasError = false;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&]).{6,}$/;

        if (username.length < 3) {
            showError("username", "Nazwa użytkownika musi mieć co najmniej 3 znaki.");
            hasError = true;
        }

        if (!emailRegex.test(email)) {
            showError("email", "Wprowadź poprawny adres email.");
            hasError = true;
        }

        if (!passwordRegex.test(password)) {
            showError("password", "Hasło musi zawierać małą i wielką literę, cyfrę oraz znak specjalny (min. 6 znaków).");
            hasError = true;
        }

        if (password !== confirm) {
            showError("password_confirmation", "Hasła nie są takie same.");
            hasError = true;
        }

        if (!statuteCheckbox.checked) {
            showError("statute", "Musisz zaakceprować regulamin.")
            hasError = true;
        }

        if (!hasError) {
            form.submit();
        }
    });

    form.addEventListener("reset", () => {
        clearErrors();
    });
});