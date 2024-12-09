document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#loginForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Impede o comportamento padrão do formulário
        window.location.href = "/dashboard/dashboard.html"; // Redireciona para o dashboard
    });
});
