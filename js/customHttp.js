class CustomHttp {
    get(url, callback) {
        const xhr = new XMLHttpRequest();

        xhr.addEventListener("load", (e) => {
            if (e.currentTarget.status < 400) {
                callback(JSON.parse(xhr.responseText));
            } else {
                console.error(`Data request failed. ${JSON.parse(xhr.responseText)?.message}`);
            }
        });

        xhr.addEventListener("error", (e) => {
            console.error("Network issue");
        });

        xhr.open("GET", url);
        xhr.send();  
        return xhr;
    }
}