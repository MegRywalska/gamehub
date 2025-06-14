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

    form.addEventListener("submit", async function (e) {
        e.preventDefault();
        clearErrors();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email || !password) {
            if (!email) showError("email", "Email jest wymagany.");
            if (!password) showError("password", "Hasło jest wymagane.");
            return;
        }

        try {
            const response = await fetch("https://gamehub-ygi9.onrender.com/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password})
            });

            const data = await response.json();

            if (!response.ok) {
                showError("email", "Podano zły email lub hasło.");
                showError("password", "Podano zły email lub hasło.");
                return;
            }
            localStorage.setItem("token", data.token);
            alert("Login successfull");
            window.location.href="dashboard.html";
        }catch (e) {
            alert("Login failed");
        }


    //     let hasError = false;
    //
    //     if (email !== mockUser.email || password !== mockUser.password) {
    //         showError("email", "Podano zły email lub hasło.");
    //         showError("password", "Podano zły email lub hasło.");
    //         hasError = true;
    //     }
    //
    //     if (!hasError) {
    //         form.submit();
    //     }
    });

    form.addEventListener("reset", () => {
        clearErrors();
    });
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/gamehub/service-worker.js')
            .then(reg => console.log('✅ Service Worker zarejestrowany:', reg.scope))
            .catch(err => console.error('❌ Błąd rejestracji:', err));
    });
}