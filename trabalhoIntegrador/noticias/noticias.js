const apiUrl = 'https://newsapi.org/v2/everything?q=finanças+OR+ações+OR+investimentos+OR+economia+OR+criptoativos&apiKey=0316d77287f84d189c7bcccbc8dbb403';

// Função para buscar notícias
async function fetchNews() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Verifica se a resposta contém artigos
    if (data.articles && data.articles.length > 0) {
      const newsList = document.getElementById('newsList');

      // Limpa a lista atual de notícias
      newsList.innerHTML = '';

      // Loop para exibir as notícias
      data.articles.forEach(article => {
        // Verifica se os campos principais da notícia estão presentes
        if (article.title && article.url && article.description && article.urlToImage) {
          const newsCard = document.createElement('div');
          newsCard.classList.add('col-md-4');

          newsCard.innerHTML = `
            <div class="news-card">
              <img src="${article.urlToImage}" alt="${article.title}">
              <div class="news-card-body">
                <h5>${article.title}</h5>
                <p>${article.description}</p>
                <a href="${article.url}" target="_blank">Leia mais</a>
              </div>
            </div>
          `;
          newsList.appendChild(newsCard);
        }
      });
    } else {
      alert('Nenhuma notícia encontrada.');
    }
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
  }
}

// Carregar as notícias quando a página for carregada
window.onload = fetchNews;
