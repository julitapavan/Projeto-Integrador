document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#registerForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Impede o envio padrão do formulário

        const name = document.querySelector("#name").value.trim();
        const email = document.querySelector("#email").value.trim();
        const password = document.querySelector("#password").value.trim();
        const confirmPassword = document.querySelector("#confirmPassword").value.trim();

        if (password !== confirmPassword) {
            alert("As senhas não coincidem.");
            return;
        }

        // Recupera usuários existentes do localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Verifica se o e-mail já foi cadastrado
        const emailExists = users.some((user) => user.email === email);
        if (emailExists) {
            alert("Este e-mail já está cadastrado.");
            return;
        }

        // Adiciona o novo usuário
        users.push({ name, email, password });
        localStorage.setItem("users", JSON.stringify(users));

        alert("Cadastro realizado com sucesso!");
        form.reset(); // Limpa o formulário

        // Redireciona para o dashboard
        window.location.href = "/dashboard/dashboard.html";
    });
});
