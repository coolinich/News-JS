class NewsService {
    constructor(http) {
        this._key = "0a19f03af2f340f89becf9753d383301";
        this._url = "https://newsapi.org/v2";
        this._country = "ua";
        this._category = "technology";
        this._http = http;
    }
    /**
     * 
     * @param {*} callback 
     * @param {*} country 
     * @param {*} category 
     */
    fetchTopHeadlines(callback, country = this._country, category = this._category) {
        this._http.get(`${this._url}/top-headlines?country=${country}&category=${category}&apiKey=${this._key}`, callback);
    }

    /**
     * @param {*} callback
     * @param {string} keyword
     * */ 

    fetchSearchResults(callback, searchKeyword) {
        this._http.get(`${this._url}/everything?q=${searchKeyword}&apiKey=${this._key}`, callback);
    }
}

