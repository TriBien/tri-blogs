document.addEventListener('DOMContentLoaded', () => {
    fetchArticles();
});

async function fetchArticles() {
    try {
        const response = await fetch('static/articles.json');
        const articles = await response.json();
        displayArticles(articles);
    } catch (error) {
        console.error('Error fetching articles:', error);
    }
}

function displayArticles(articles) {
    const container = document.getElementById('articles-container');
    articles.forEach(article => {
        const articleElement = createArticleElement(article);
        container.appendChild(articleElement);
    });
}

function createArticleElement(article) {
    const articleDiv = document.createElement('div');
    articleDiv.classList.add('article');

    const title = document.createElement('h2');
    title.textContent = article.title;

    const content = document.createElement('p');
    content.textContent = article.content;

    articleDiv.appendChild(title);
    articleDiv.appendChild(content);

    return articleDiv;
}
