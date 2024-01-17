function total (){
    chrome.storage.sync.get('autocartAmt' , function(data){
        var quantity = data.autocartAmt
        chrome.storage.sync.get('autocartSize' , function(data){
            var shopSize = data.autocartSize 
            console.log(shopSize);
    
            var randomsize = ['5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13']
            var random = Math.floor(Math.random() * randomsize.length);
    
    const options = {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }
    // calls ATC function
    atc().then(data => {})
    
    async function atc() {
        // gets product variants json
        const res = await fetch(`${window.location.href}.js`, options);
        console.log(res)
        const json = await res.json();
        const {
            variants
        } = json;
    
        let foundVariantId, foundVariant;
    
        foundVariant = getProduct(variants, shopSize);    
        console.log(foundVariant)        
        foundVariantId = foundVariant.id;
        console.log(foundVariantId)
    
        await addToCart(foundVariantId);
        return (window.location.href = "/checkout");
    }
    if (shopSize == "RA" || shopSize == "ra" ) {
        shopSize = (randomsize[random])
    }
    // add to cart function
    async function addToCart(product) {
        const method_req = await fetch("/cart/add.js", {
            method: "POST",
            body: "quantity=" + quantity + "&id=" + product,
            headers: {
                "content-type": "multipart/form-data",
                accept: "application/json, text/javascript, */*; q=0.01",
            },
        });
    
        const method_json = await method_req.json();
        return method_json;
    }
    function getProduct(variants, size) {
        // starts off as random
        while (true) {
            foundVariant = variants[Math.floor(Math.random() * variants.length)];
            if (foundVariant && foundVariant.available) {
                break;
            }
        }
    
        for (const variant of variants) {
            if (variant.title) {
                if (variant.title == size && variant.available) {
                    foundVariant = variant
                    return foundVariant;
                }
            }
            if (variant.option1) {
                if (variant.option1 == size && variant.available) {
                    foundVariant = variant
                    return foundVariant;
                }
            }
            if (variant.option2) {
                if (variant.option2 == size && variant.available) {
                    foundVariant = variant
                    return foundVariant;
                }
            }
            if (variant.option3) {
                if (variant.option3 == size && variant.available) {
                    foundVariant = variant
                    return foundVariant;
                }
            }
        }
    
        return foundVariant;
    };
        });
    });    
}

chrome.storage.sync.get('ShopifyAutocartButton', function(data) {
    ShopifyAutocartButton = data.ShopifyAutocartButton;
    if (ShopifyAutocartButton === "on"){
        total();
        iziToast.show({
            title: "Telios AIO",
            message: 'Shopify Autocart Started',theme: 'dark', position: 'topRight',
            color: 'purple',image: 'https://cdn.discordapp.com/attachments/941851097809702983/951661608894103572/Png_1.png',
        });
        console.log("AO ON");
    } else { 
        console.log("AO OFF")
    }
});