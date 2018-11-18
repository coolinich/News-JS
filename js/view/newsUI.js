class NewsUI {
    constructor() {
        this._container = document.querySelector(".news-container .row.content");
        this._containerInfo = document.querySelector(".news-container .row.info");
        this._defaultImage = "img/default-image.png";
    }

    /**
     * addNews - function which adds one news to layout
     * @param {Object} news object from server response (element of articles array)
    */
    addNews(news) {
        const template = this._newsTemplate(news);
        this._container.insertAdjacentHTML("afterbegin", template);
    }

    /**
     * addInfo - function which adds text with number of news, or exlanation if there is nothing to show
     * @param {Number} number totalResults value from server array
    */
    addInfo(number) {
        const template = this._infoTemplate(number);
        this._containerInfo.insertAdjacentHTML("afterbegin", template);
    }

    clearContainer() {
        this._container.innerHTML = "";
        this._containerInfo.innerHTML = "";
    }

    /**
     * _newsTemplate - function which creates html template for one news for layout
     * @param {Object} news object from server response (element of articles array)
    */
    _newsTemplate({urlToImage, url, title, description}) {
        return `
        <div class="col s12 l6"> 
            <div class="card">
                <div class="card-image">
                    <img src="${urlToImage || this._defaultImage}">
                </div>
                <div class="card-content">
                    <span class="card-title">${title}</span>
                    <p>${description || ""}</p>
                </div>
                <div class="card-action">
                    <a href="${url}" target="_blank">Read more</a>
                </div>
            </div>
        </div>
        `;
    }

    /**
     * _infoTemplate - function which creates html template for text with number of news, or exlanation if there is nothing to show
     * @param {Number} number totalResults value from server array
    */
    _infoTemplate(number) {
        return number ?  `<h6>We have ${number} news for you:</h6>` : `<h6>Sorry, there are no results. Please, try to set another filter or use more general keyword.</h6>`;    
    }
}

