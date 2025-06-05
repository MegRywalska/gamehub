document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const mockUser = {
        email: "test@gmail.com",
        password: "Test123!"
    };

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


        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        let hasError = false;


        if (email !== mockUser.email || password !== mockUser.password) {
            showError("email", "Podano zły email lub hasło.");
            showError("password", "Podano zły email lub hasło.");
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