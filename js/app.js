// Create instance
const newsService = new NewsService(new CustomHttp());
const newsUI = new NewsUI();

// UI elements
const countrySelect = document.querySelector(".country");
const categorySelect = document.querySelector(".category");
const filterBySelect = document.querySelector('.filters');
const searchForm = document.forms["search"];
const searchBtn = searchForm.querySelector('i');
const searchInput = searchForm.querySelector('input#search');


const getCountryTechnolodyHandler = () => {
    const country = countrySelect.value;
    const category = categorySelect.value;

    newsService.fetchTopHeadlines((res) => {
        const { articles, totalResults } = res;
        newsUI.clearContainer();
        newsUI.addInfo(totalResults);
        articles.forEach(news => newsUI.addNews(news));
    }, country, category);
};

const getSearchResultsHandler = (e) => {
    e.preventDefault();
    const searchStr = encodeURI(searchInput.value);
    if (searchStr) {
        newsService.fetchSearchResults((res) => {
            const { articles, totalResults } = res;
            newsUI.clearContainer();
            newsUI.addInfo(totalResults);
            articles.forEach(news => newsUI.addNews(news));
        }, searchStr);
        if (!filterBySelect.classList.contains('not-active')) filterBySelect.classList.add('not-active');
    } else emptySearchHandler();

}

const resetSearchForm = () => {
    if (filterBySelect.classList.contains('not-active')) {
        searchForm.reset();
        filterBySelect.classList.remove('not-active');
        getCountryTechnolodyHandler();
    }
}

const emptySearchHandler = () => {
    if (filterBySelect.classList.contains('not-active') && !searchInput.value) {
        filterBySelect.classList.remove('not-active');
        getCountryTechnolodyHandler();
    }
}




countrySelect.addEventListener("change", getCountryTechnolodyHandler);
categorySelect.addEventListener("change", getCountryTechnolodyHandler);
filterBySelect.addEventListener("click", resetSearchForm);
window.addEventListener("load", getCountryTechnolodyHandler);
searchForm.addEventListener("submit", getSearchResultsHandler);
searchInput.addEventListener("blur", emptySearchHandler);
searchBtn.addEventListener("click", getSearchResultsHandler);

