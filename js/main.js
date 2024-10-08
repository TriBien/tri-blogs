// Declare the variables in the global scope
let articles, perPage, totalPages;


async function loadPage(pageName) {
    if (pageName === '/') {
        pageName = 'home';
    }

    console.log("Request loading page: " + pageName);
    pageName = pageName.replace('/', '');
    console.log("Loaded page: " + pageName);

    const response = await fetch(`/static/${pageName}.html`);
    const content = await response.text();
    document.getElementById('content').innerHTML = content;

    if (pageName === 'articles') {
        loadArticlesPage(1);
    }
};

const loadArticlesPage = async (currentPage) => {
    // Render articles list
    loadArticles(currentPage);

    // Update pagination links
    loadPagination(currentPage);
};

const loadPagination = async (currentPage) => {
    const paginationContainer = document.getElementById('articles-pagination');
    let paginationHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `<button ${currentPage === i ? 'disabled': ''} onclick="loadArticlesPage(${i})">${i}</button>`;
    }
    paginationContainer.innerHTML = paginationHTML;
}

const loadArticles = async (currentPage) => {
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    const displayedArticles = articles.slice(start, end);

    console.log("Displayed articles: " + displayedArticles.length);
    const articlesContainer = document.getElementById('articles-grid');
    let articlesHTML = '';
    displayedArticles.forEach(article => {
        articlesHTML += `
            <div class="article-card">
                <img src="${article.image}" alt="${article.title}" />
                <h2>${article.title}</h2>
                <p>${article.summary}</p>
                <a href="/articles/${article.id}">Read more</a>
            </div>
        `;
    });
    articlesContainer.innerHTML = articlesHTML;
}

const navigate = (e) => {
    e.preventDefault();
    const path = e.target.getAttribute('href');
    history.pushState({}, '', path);
    loadPage(path);
};

// Load home page by default
window.addEventListener('load', () => loadPage('home'));

// Add event listeners for navigation
for (let element of document.getElementsByClassName('home')) {
    element.addEventListener('click', (e) => navigate(e));
}

for (let element of document.getElementsByClassName('about')) {
    element.addEventListener('click', (e) => navigate(e));
}

for (let element of document.getElementsByClassName('contact')) {
    element.addEventListener('click', (e) => navigate(e));
}

for (let element of document.getElementsByClassName('articles')) {
    element.addEventListener('click', (e) => navigate(e));
}

const registerBrowserBackAndForth = () => {
    window.addEventListener('popstate', (e) => {
        loadPage(window.location.pathname);
    });
}

// start the app
(async function bootup(){
    registerBrowserBackAndForth();

    const articlesResponse = await fetch('/static/articles.json');
    articles = await articlesResponse.json();
    perPage = 6;
    totalPages = Math.ceil(articles.length / perPage);

    console.log("Total articles: " + articles.length);
    console.log("Total pages: " + totalPages);
})();