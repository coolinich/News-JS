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

/**
 * getCountryTechnolodyHandler - function which makes request for TopHeadlines, gets all news according to selected filters and calls function for displaying them
*/
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

/**
 * getSearchResultsHandler - function which makes request for search results, gets all news according to search keyword and calls function for displaying them.
*/
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
        // toogle can't be used here as it doesn't work properly when search is executed with different keywords
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

/**
 * emptySearchHandler - function  which handle the case of empty search keyword after successful searching
*/
const emptySearchHandler = () => {
    if (filterBySelect.classList.contains('not-active') && !searchInput.value) {
        filterBySelect.classList.remove('not-active');
        getCountryTechnolodyHandler();
    }
}



// Calls for Event Handlers
countrySelect.addEventListener("change", getCountryTechnolodyHandler);
categorySelect.addEventListener("change", getCountryTechnolodyHandler);
filterBySelect.addEventListener("click", resetSearchForm);
window.addEventListener("load", getCountryTechnolodyHandler);
searchForm.addEventListener("submit", getSearchResultsHandler);
searchInput.addEventListener("blur", emptySearchHandler);
searchBtn.addEventListener("click", getSearchResultsHandler);

