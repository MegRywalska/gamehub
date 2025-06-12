let currentPage = 1;
const pageSize = 21;
const gameList = document.getElementById('game-list');
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageIndicator = document.getElementById("pageIndicator");

async function loadGames(page = 1) {
    try {
        gameList.innerHTML = '';

        const response = await fetch(`http://localhost:3000/api/games?page=${page}&page_size=${pageSize}`);
        const data = await response.json();

        console.log("Received data from the backend", data);

        data.games.forEach(game => {
            const card = document.createElement('div');
            card.className = 'card bg-base-100 w-96 shadow-sm';

            card.innerHTML = `
                <div class="card-body">
                  <h2 class="card-title">${game.name}</h2>
                  <p>Ocena: ${game.rating}</p>
                  <p>Data premiery: ${game.released}</p>
                </div>
                <figure>
                  <img src="${game.background_image}" alt="${game.name}" />
                </figure>
            `;

            gameList.appendChild(card);
        });

        pageIndicator.textContent = `Strona ${page}`;
        prevBtn.disabled = !data.previous;
        nextBtn.disabled = !data.next;

    } catch (error) {
        console.error('Error loading game:', error);
    }
}

prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        loadGames(currentPage);
    }
});

nextBtn.addEventListener("click", () => {
    currentPage++;
    loadGames(currentPage);
})

document.addEventListener('DOMContentLoaded', () => {
    loadGames(currentPage);
});

document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById("logout_button");
    if (logoutButton) {
        logoutButton.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("token");
            window.location.href = "login.html";
        })
    }
})

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/gamehub/service-worker.js')
            .then(reg => console.log('✅ Service Worker zarejestrowany:', reg.scope))
            .catch(err => console.error('❌ Błąd rejestracji:', err));
    });
}