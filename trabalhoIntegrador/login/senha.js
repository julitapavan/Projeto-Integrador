document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const emailInput = document.querySelector("#email");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Impede o envio padrão do formulário

        const email = emailInput.value.trim();

        // Validação básica de e-mail
        if (!validateEmail(email)) {
            showFeedback("Por favor, insira um e-mail válido.", "error");
            return;
        }

        // Simulação de envio de e-mail
        simulateEmailRecovery(email)
            .then((response) => {
                if (response.success) {
                    showFeedback("E-mail de recuperação enviado com sucesso!", "success");
                } else {
                    showFeedback("Erro ao enviar o e-mail. Tente novamente mais tarde.", "error");
                }
            })
            .catch(() => {
                showFeedback("Erro inesperado. Por favor, tente novamente.", "error");
            });
    });

    /**
     * Função para validar e-mail usando regex
     * @param {string} email
     * @returns {boolean}
     */
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Simula o envio de um e-mail de recuperação de senha.
     * @param {string} email
     * @returns {Promise<object>}
     */
    function simulateEmailRecovery(email) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(`E-mail de recuperação enviado para: ${email}`);
                resolve({ success: true });
            }, 2000); // Simula um tempo de resposta de 2 segundos
        });
    }

    /**
     * Exibe mensagens de feedback na tela
     * @param {string} message
     * @param {string} type - "success" ou "error"
     */
    function showFeedback(message, type) {
        const feedback = document.createElement("div");
        feedback.className = `feedback ${type}`;
        feedback.textContent = message;

        document.body.appendChild(feedback);

        // Remove a mensagem após 3 segundos
        setTimeout(() => {
            feedback.remove();
        }, 3000);
    }
});
