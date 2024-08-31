async function loadPage(pageName) {
    if (pageName === '/') {
        pageName = 'home';
    }

    const response = await fetch(`/static/${pageName}.html`);
    const content = await response.text();
    document.getElementById('content').innerHTML = content;
}

const navigate = (e) => {
    e.preventDefault();
    const href = e.target.getAttribute('href');
    console.log(href);
    history.pushState({}, '', href);
    loadPage(href);
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
(function bootup(){
    registerBrowserBackAndForth();
})();