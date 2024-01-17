var isShopify = (shopURL) => {
    fetch(shopURL, {
    "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        "cache-control": "max-age=0",
        "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "cross-site",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1"
    },
    "referrer": "https://www.google.com/",
    "referrerPolicy": "origin",
    "body": null,
    "method": "GET",
    "mode": "cors",
    "credentials": "include"
    }).then(function (response) {
        // The API call was successful!
        return response.text();
    }).then(function (html) {
        var parser = new DOMParser();
	    var doc = parser.parseFromString(html, 'text/html');
        let script = doc.getElementsByTagName('script');
        let meta = doc.getElementsByTagName('meta');
        let link = doc.getElementsByTagName('link');

        for (let i = 0; i < script.length; i++) {
            try {
                if (script[i].href.includes('cdn.shopify')) {
                    return true;
                }
            } catch {
                continue;
            }
        }

        for (let i = 0; i < meta.length; i++) {
            try {
                if (meta[i].href.includes('cdn.shopify')) {
                    return true;
                }
            } catch {
                continue;
            }
        }

        for (let i = 0; i < link.length; i++) {
            try {
                if (link[i].href.includes('cdn.shopify')) {
                    return true;
                }
            } catch {
                continue;
            }
        }
    })
}

var monitorShopify = (keywords, size, color, page=1) => {
    color = color.toLowerCase();
    size = size.toLowerCase();
    if (page > 15) page = 1;
    fetch(`/products.json?limit=250&page=${page}`)
        .then(response => {
            return response.json();
        })
        .then(response => {
            var pKeywords = [];
            var nKeywords = [];
            keywords.split(',').forEach(keyword => {
                if (keyword.startsWith('+')) {
                    pKeywords.push(keyword.substr(1));
                } else if (keyword.startsWith('-')) {
                    nKeywords.push(keyword.substr(1));
                }
            });

            products = response.products;
            for (let i = 0; i < products.length; i++) {
                if (checkPositiveKeywordsShopify(products[i].title.toLowerCase(), pKeywords) && checkNegativeKeywordsShopify(products[i].title.toLowerCase(), nKeywords)) {
                    if (color == '' || color == undefined) {
                        var optionInt = 0;
                        for (let z = 0; z < products[i].options.length; z++) {
                            if (products[i].options[z].name.toLowerCase().includes('size') || products[i].options[z].name.toLowerCase().includes('tamanho')) {
                                optionInt = z+1;
                            }
                        }
                        for (let z = 0; z < products[i].variants.length; z++) {
                            if (products[i].variants[z].available) {
                                if (size == '') {
                                    window.location = "/cart/" + products[i].variants[z].id + ":1";
                                    return;
                                } else if (products[i].variants[z][`option${optionInt}`].toLowerCase() == size) {
                                    window.location = "/cart/" + products[i].variants[z].id + ":1";
                                    return;
                                }
                            }
                        }
                    } else if (products[i].title.toLowerCase().includes(color.toLowerCase())) {
                        var optionInt = 0;
                        for (let z = 0; z < products[i].options.length; z++) {
                            if (products[i].options[z].name.toLowerCase().includes('size') || products[i].options[z].name.toLowerCase().includes('tamanho')) {
                                optionInt = z+1;
                            }
                        }
                        for (let z = 0; z < products[i].variants.length; z++) {
                            if (products[i].variants[z].available) {
                                if (size == '' || size == undefined) {
                                    window.location = "/cart/" + products[i].variants[z].id + ":1";
                                    return;
                                } else if (products[i].variants[z][`option${optionInt}`].toLowerCase() == size) {
                                    window.location = "/cart/" + products[i].variants[z].id + ":1";
                                    return;
                                }
                            }
                        }
                    }
                }
            }

            setTimeout(monitor.bind(null, keywords, size, color, page+1), 20);
        });
}

var checkPositiveKeywordsShopify = (name, keywords) => {
    for (let i = 0; i < keywords.length; i++) {
        if (name.indexOf(keywords[i].toLowerCase()) === -1) {
            return false;
        }
    }
    return true;
}

var checkNegativeKeywordsShopify = (name, keywords) => {
    for (let i = 0; i < keywords.length; i++) {
        if (name.indexOf(keywords[i].toLowerCase()) !== -1) {
            return false;
        }
    }
    return true;
}

chrome.runtime.onMessage.addListener(request => {
    if (request.monitor == 'shopify') {
        chrome.storage.local.get(['shopKeywords', 'shopColor', 'shopSize', 'shopURL'], result => {
            isShopify(result.shopURL) && monitorShopify(result.shopKeywords, result.shopSize, result.shopColor);
        });
    }
});