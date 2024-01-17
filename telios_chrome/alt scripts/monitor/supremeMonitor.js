var checkPositiveKeywords = (name, keywords) => {
    console.log(keywords, name);
    for (let i = 0; i < keywords.length; i++) {
        if (name.indexOf(keywords[i].toLowerCase()) === -1) {
            return false;
        }
    }
    return true;
}

var checkNegativeKeywords = (name, keywords) => {
    for (let i = 0; i < keywords.length; i++) {
        if (name.indexOf(keywords[i].toLowerCase()) !== -1) {
            return false;
        }
    }
    return true;
}

var monitorProduct = async keywords => {
    console.log("Monitoring...")
    var pKeywords = [];
    var nKeywords = [];
    keywords.split(',').forEach(keyword => {
        if (keyword.startsWith('+')) {
            pKeywords.push(keyword.substr(1));
        } else if (keyword.startsWith('-')) {
            nKeywords.push(keyword.substr(1));
        }
    });

    let response = await fetch('https://www.supremenewyork.com/mobile_stock.json');
    if (response.status !== 200) return;
    let jsonResponse = await response.json();

    let products = jsonResponse.products_and_categories;
    for (const category in products) {
        for (let i = 0; i < products[category].length; i++) {
            console.log(checkPositiveKeywords(products[category][i].name.toLowerCase(), pKeywords));
            if (checkPositiveKeywords(products[category][i].name.toLowerCase(), pKeywords) && checkNegativeKeywords(products[category][i].name.toLowerCase(), nKeywords)) {
                var catName = products[category][i].category_name;
                if (catName == 'Tops/Sweaters') catName = 'sweaters';
                chrome.storage.local.get(['supColor', 'supSize'], result => {
                    getInfo(products[category][i].id, catName.toLowerCase(), result.supSize, result.supColor);
                });
            }
        }
    }
    setTimeout(monitorProduct.bind(null, keywords), 500);
}

var getInfo = async (id, category, size, color) => {
    console.log(size, color);
    let response = await fetch(`https://www.supremenewyork.com/shop/${id}.json`);
    if (response.status !== 200) return;
    let jsonResponse = await response.json();
    let responseStyles = jsonResponse.styles;
    if (color == '') {
        var colorId = responseStyles[0].id;
        var wantedSizes = responseStyles[0].sizes;
        if ((wantedSizes.length == 1 && wantedSizes[0].name == 'N/A') || (size == '' || size == undefined)) {
            chrome.storage.local.set({supremeSizeId: wantedSizes[0].id}, () => {
                location.href = `https://www.supremenewyork.com/shop/${category}/${id}/${colorId}`;
            });
        }    
        for (let i = 0; i < wantedSizes.length; i++) {
            if (wantedSizes[i].name === size) {
                chrome.storage.local.set({supremeSizeId: wantedSizes[i].id}, () => {
                    location.href = `https://www.supremenewyork.com/shop/${category}/${id}/${colorId}`;
                });
            }
        }
    } else {
        for (let z = 0; z < responseStyles.length; z++) {
            if (responseStyles[z].name.includes(color)) {
                var colorId = responseStyles[z].id;
                var wantedSizes = responseStyles[z].sizes;
                if ((wantedSizes.length == 1 && wantedSizes[0].name == 'N/A') || (size == '' || size == undefined) ) {
                    for (let y = 0; y < wantedSizes.length; y++) {
                        if (wantedSizes[y].stock_level > 0) {
                            chrome.storage.local.set({supremeSizeId: wantedSizes[0].id}, () => {
                                location.href = `https://www.supremenewyork.com/shop/${category}/${id}/${colorId}`;
                            });
                        }
                    }
                }    
                for (let i = 0; i < wantedSizes.length; i++) {
                    if (wantedSizes[i].name == size) {
                        chrome.storage.local.set({supremeSizeId: wantedSizes[i].id}, () => {
                            location.href = `https://www.supremenewyork.com/shop/${category}/${id}/${colorId}`;
                        });
                    }
                }
            }
        }
    }
}

chrome.runtime.onMessage.addListener(request => {
    console.log("Supreme Monitor Loaded...")
    console.log(request)
    if (request.monitor == 'supreme') {
        chrome.storage.local.get(['supKeywords'], result => {
            monitorProduct(result.supKeywords);
        });
    }
});