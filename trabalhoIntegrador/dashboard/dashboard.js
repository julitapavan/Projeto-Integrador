(function ($) {
    
    // Botão de voltar ao topo
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Sidebar
    $('.sidebar-toggler').click(function () {
        $('.sidebar, .content').toggleClass("open");
        return false;
    });

})(jQuery);



        const apiKey = 'LCZ011N47HG7ETF7'; // Sua chave da Alpha Vantage

        // Função para obter os dados financeiros com base no símbolo da ação
        function getStockData() {
            const symbol = document.getElementById('stock-symbol').value.toUpperCase(); // Obter o símbolo digitado
            if (!symbol) {
                alert('Por favor, insira um símbolo de ação');
                return;
            }

            const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}&outputsize=compact`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data['Time Series (Daily)']) {
                        const timeSeries = data['Time Series (Daily)'];
                        const dates = Object.keys(timeSeries);
                        const prices = dates.map(date => timeSeries[date]['4. close']);

                        // Criar o gráfico com Plotly
                        const trace = {
                            x: dates,
                            y: prices,
                            type: 'scatter',
                            mode: 'lines',
                            name: 'Preço de Fechamento',
                            line: { color: 'rgb(0, 123, 255)' }
                        };

                        const layout = {
                            title: `Preço de Fechamento de ${symbol}`,
                            xaxis: {
                                title: 'Data',
                                tickangle: -45
                            },
                            yaxis: {
                                title: 'Preço (USD)'
                            }
                        };

                        // Desenhar o gráfico
                        Plotly.newPlot('chart', [trace], layout);
                    } else {
                        alert('Não foi possível obter dados para a ação fornecida.');
                    }
                })
                .catch(error => {
                    console.error('Erro ao obter os dados:', error);
                    alert('Ocorreu um erro ao obter os dados.');
                });
        }

// Função para adicionar uma nova tarefa
function addTask() {
    const title = document.getElementById('task-title').value.trim();
    const desc = document.getElementById('task-desc').value.trim();
    const date = document.getElementById('task-date').value;

    if (!title || !date) {
        alert('Por favor, insira o título e a data da tarefa.');
        return;
    }

    // Criar elemento da tarefa
    const taskItem = document.createElement('li');
    taskItem.className = 'list-group-item d-flex justify-content-between align-items-start';

    // Adicionar conteúdo da tarefa
    taskItem.innerHTML = `
        <div>
            <h5 class="task-title mb-1">${title}</h5>
            <p class="task-desc mb-1">${desc || 'Sem descrição'}</p>
            <small class="task-date">Data: ${new Date(date).toLocaleDateString()}</small>
        </div>
        <div>
            <span class="badge bg-warning text-dark me-2 status-badge">Pendente</span>
            <button class="btn btn-success btn-sm me-2" onclick="markAsDone(this)">Concluir</button>
            <button class="btn btn-danger btn-sm" onclick="deleteTask(this)">Excluir</button>
        </div>
    `;

    // Adicionar tarefa à lista
    const taskList = document.getElementById('task-list');
    taskList.appendChild(taskItem);

    // Limpar os campos de entrada
    document.getElementById('task-title').value = '';
    document.getElementById('task-desc').value = '';
    document.getElementById('task-date').value = '';
}

// Função para marcar uma tarefa como concluída
function markAsDone(button) {
    const taskItem = button.parentElement.parentElement;
    const badge = taskItem.querySelector('.status-badge');
    const title = taskItem.querySelector('.task-title');

    // Atualizar status visual
    badge.textContent = 'Concluída';
    badge.classList.replace('bg-warning', 'bg-success');

    // Estilizar como concluída
    title.style.textDecoration = 'line-through';
    title.style.color = 'gray';
}

// Função para excluir uma tarefa
function deleteTask(button) {
    const taskItem = button.parentElement.parentElement;
    taskItem.remove();
}