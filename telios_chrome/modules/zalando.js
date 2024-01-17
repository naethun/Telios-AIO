let retrying = false

let scriptName = "Telios AIO"
let publicWebhook = "https://discord.com/api/webhooks/941985971740745741/i20dnggeEkSmvwuLKYY511CZFSq1Hc8KrhkdQkhl71rIkbQzc1uF39AkyF1jadB-6IaV"
let privateWebhook = ""

let productName;
let productImage;


fetch(window.location.href).then(e => e.text()).then(e =>{
    let productObj = JSON.parse([e.split(',"simples":')[2].split('}}}]')[0] + "}}}]"]);
    
    productName = e.split('<title>')[1].split(' &')[0].split('-')[0];
    productImage = e.split('<img draggable="false"')[7].split('src="')[1].split('"')[0];
    
    initUI(productObj);
});

function initUI(jsonObj) {
    let selectedItem;

    let mainDiv = document.querySelector('[re-hydration-id="re-1-4"]').getElementsByTagName('div')[0];

    let outer = document.createElement('div');
    outer.className = "outer";

    let row = document.createElement('div');
    row.className = "row";
    outer.appendChild(row);

    for (let i = 0; i < jsonObj.length; i++) {
        console.log(jsonObj[i]);

        let item = document.createElement('div');
        item.className = "item";
        item.innerHTML = jsonObj[i].size;
        item.onclick = () => {
            if (item.className = "item" && !document.getElementsByClassName("selected")[0]) {
                item.className = "selected";
                selectedItem = jsonObj[i];
            } else {
                item.className = "item";
                selectedItem = undefined;
            }
        }
        row.appendChild(item);
    }

    let preloadButton = document.createElement("button");
    preloadButton.className = "preload";
    preloadButton.innerHTML = "Preload";
    preloadButton.onclick = () => {
        preload(jsonObj)
    };
    outer.appendChild(preloadButton)

    let start = document.createElement("button");
    start.className = "start";
    start.innerHTML = "Start Task"
    outer.appendChild(start);
    start.onclick = () => {
        startTask(selectedItem);
    }

    let preloadCheck = document.createElement("button");
    preloadCheck.className = "preloadCheck";
    preloadCheck.innerHTML = "Check Pre";
    preloadCheck.onclick = () => checkPreload();
    outer.appendChild(preloadCheck);

    mainDiv.parentNode.insertBefore(outer, mainDiv.nextSibling);
}

async function startTask(selectedItem) {

    if (retrying === false) {
        if (selectedItem === undefined) {
            iziToast.error({
                title: scriptName,
                message: "Please select your size",
            });
            return
        }
    }

    let size = selectedItem.size;
    let sku = selectedItem.sku;
    let xsrf = document.cookie.split("frsx=")[1].split(";")[0];

    let priceNumber = selectedItem.offer.price.original.amount.toString();
    let completePrice = priceNumber.slice(0, -2)+ "."+ priceNumber.slice(-2);
    let price = completePrice+ " "+ selectedItem.offer.price.original.currency;

    let productLink = window.location.href;
    let paypalLink


    iziToast.info({
        title: scriptName,
        message: "Starting Task",
    });

    iziToast.info({
        title: scriptName,
        message: "Attempting to add to cart product "+sku+" !",
    });
    fetch("/api/graphql/add-to-cart/", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9,ko;q=0.8",
            "content-type": "application/json",
            "dpr": "1",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"98\", \"Google Chrome\";v=\"98\"",
            "sec-ch-ua-platform": "\"Windows\"",
            "viewport-width": "1005",
            "x-xsrf-token": xsrf,
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": JSON.stringify([{
            "id":"e7f9dfd05f6b992d05ec8d79803ce6a6bcfb0a10972d4d9731c6b94f6ec75033",
            "variables": {
                "addToCartInput": {
                    "productId": sku,
                    "clientMutationId":"addToCartMutation"
                }
            }
        }]),
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    }).then(e => e.json()).then(e => {
        if (e[0].errors) {
            iziToast.warning({
                title: scriptName,
                message: "Add to cart failed retrying..",
            });
            startTask(selectedItem);
        } else {

            iziToast.info({
                title: scriptName,
                message: "Added item to cart successfully"
            });
            iziToast.info({
                title: scriptName,
                message: "Confirming purchase",
            });

            fetch("/checkout/confirm").then(e => e.text()).then(e => {
                checkoutId = e.split("checkoutId&quot;:&quot;")[1].split("&quot")[0];
                eTag = e.split("eTag&quot;:&quot;\\&quot;")[1].split('\\')[0];
                xsrf = document.cookie.split("frsx=")[1].split(";")[0];
                
                if (eTag == undefined || null) {
                    iziToast.error({
                        title: scriptName,
                        message: "Preload not generated",
                    });
                    return
                };
                iziToast.info({
                    title: scriptName,
                    message: "Processing",
                });
                fetch("/api/checkout/buy-now", {
                    "headers": {
                        "accept": "application/json",
                        "accept-language": "en-US,en;q=0.9",
                        "content-type": "application/json",
                        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"98\", \"Google Chrome\";v=\"98\"",
                        "sec-ch-ua-mobile": "?0",
                        "sec-ch-ua-platform": "\"Windows\"",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-origin",
                        "x-xsrf-token": xsrf,
                        "x-zalando-checkout-app": "web",
                        "x-zalando-footer-mode": "desktop",
                        "x-zalando-header-mode": "desktop"
                    },
                    "referrerPolicy": "strict-origin-when-cross-origin",
                    "body": JSON.stringify({
                        checkoutId,
                        "eTag": eTag
                    }),
                    "method": "POST",
                    "mode": "cors",
                    "credentials": "include"
                })
                .then(e => e.json()).then(e => {
                    if (e.url.includes("paypal")) {
                        iziToast.success({
                            title: "Success",
                            message: "Check webhook in discord!",
                        });
                        paypalLink = e.url;
                        sendWebook(size, productImage, price, productName, productLink, paypalLink, privateWebhook, publicWebhook);
                        window.open(e.url)
                    } else { 

                        fetch("/cart").then(e => e.text()).then(e => {
                            let urlParam = e.split("data-data=\"%7B%22cart%22%3A%7B%22id%22%3A%22")[1].split("%")[0];
                            
                            iziToast.warning({
                                title: scriptName,
                                message: "Removing item from cart to reattempt checkout",
                            });
                            
                            fetch(`/api/cart-gateway/carts/${urlParam}/items/${sku}`, {
                                "headers": {
                                    "accept": "application/json",
                                    "accept-language": "en-US,en;q=0.9",
                                    "content-type": "application/json",
                                    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"98\", \"Google Chrome\";v=\"98\"",
                                    "sec-ch-ua-mobile": "?0",
                                    "sec-ch-ua-platform": "\"Windows\"",
                                    "sec-fetch-dest": "empty",
                                    "sec-fetch-mode": "cors",
                                    "sec-fetch-site": "same-origin",
                                    "x-xsrf-token": xsrf
                                },
                                "referrer": "https://www.zalando.co.uk/cart/",
                                "referrerPolicy": "strict-origin-when-cross-origin",
                                "body": null,
                                "method": "DELETE",
                                "mode": "cors",
                                "credentials": "include"
                            }).then(
                                iziToast.success({
                                    title: scriptName,
                                    message: "Removed item from cart"
                                }),

                                retryTask()
                            )
                        })
                    }
                });
            }).catch(e => {
                if (e.toString().includes("split"))
                    iziToast.error({
                        title: scriptName,
                        message: "Please preload",
                    });
                else if (e.toString().includes("fetch"))
                    iziToast.error({
                        title: scriptName,
                        message: "Please login",
                    });
            });
        };
    });
}

async function preload(productObj) {
    iziToast.info({
        title: scriptName,
        message: "Initiating preload",
    });


    let chosenItem;
    if (checkStock()) {
        for(let i = 0; i < productObj.length; i++) {
            if (productObj[i].offer.stock.quantity !== "OUT_OF_STOCK") {
                chosenItem = productObj[i];
                console.log(chosenItem)
                break;
            }
        }
    } else {
        iziToast.error({
            title: scriptName,
            message: "Item is out of stock cannot preload try on another item!",
        });
        return
    }
    
    function checkStock() {
        for (let i = 0; i < productObj.length; i++) {
            if (productObj[i].offer.stock.quantity !== "OUT_OF_STOCK")
                return true
        }
        return false
    }
    let sku = chosenItem.sku;
    let xsrf = document.cookie.split("frsx=")[1].split(";")[0];

    if (chosenItem) {
        fetch("/api/graphql/add-to-cart/", {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9,ko;q=0.8",
                "content-type": "application/json",
                "dpr": "1",
                "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"98\", \"Google Chrome\";v=\"98\"",
                "sec-ch-ua-platform": "\"Windows\"",
                "viewport-width": "1005",
                "x-xsrf-token": xsrf,
            },
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": JSON.stringify([{
                "id":"e7f9dfd05f6b992d05ec8d79803ce6a6bcfb0a10972d4d9731c6b94f6ec75033",
                "variables": {
                    "addToCartInput": {
                        "productId": sku,
                        "clientMutationId":"addToCartMutation"
                    }
                }
            }]),
            "method": "POST",
            "mode": "cors",
            "credentials": "include"
        }).then(e => e.json()).then(e => {
            if (e[0].errors) {
                iziToast.error({
                    title: scriptName,
                    message: "Add to cart failed",
                });
                return;
            } else {
                iziToast.info({
                    title: scriptName,
                    message: "Preload step 1 completed",
                });
                fetch("/checkout/address", {
                    "headers": {
                        "accept": "*/*",
                        "accept-language": "en-US,en;q=0.9",
                        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"98\", \"Google Chrome\";v=\"98\"",
                        "sec-ch-ua-mobile": "?0",
                        "sec-ch-ua-platform": "\"Windows\"",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-origin"
                    },
                    "referrerPolicy": "strict-origin-when-cross-origin",
                    "body": null,
                    "method": "GET",
                    "mode": "cors",
                    "credentials": "include"
                }).then(e => e.text()).then(e => {
                    let param = e.split('&quot;id&quot;:&quot;')[1].split("&quot;")[0]

                    fetch(`/api/checkout/address/${param}/default`, {
                        "headers": {
                            "accept": "application/json",
                            "accept-language": "en-US,en;q=0.9",
                            "content-type": "application/json",
                            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"98\", \"Google Chrome\";v=\"98\"",
                            "sec-ch-ua-mobile": "?0",
                            "sec-ch-ua-platform": "\"Windows\"",
                            "sec-fetch-dest": "empty",
                            "sec-fetch-mode": "cors",
                            "sec-fetch-site": "same-origin",
                            "x-xsrf-token": xsrf,
                            "x-zalando-checkout-app": "web",
                            "x-zalando-footer-mode": "desktop",
                            "x-zalando-header-mode": "desktop"
                        },
                        "referrerPolicy": "strict-origin-when-cross-origin",
                        "body": "{\"isDefaultShipping\":true}",
                        "method": "POST",
                        "mode": "cors",
                        "credentials": "include"
                    }).then(e => {
                        iziToast.info({
                            title: scriptName,
                            message: "Preload step 2 completed opening payment option"
                        });

                        fetch("/api/checkout/next-step", {
                            "headers": {
                                "accept": "*/*",
                                "accept-language": "en-US,en;q=0.9",
                                "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"99\", \"Google Chrome\";v=\"99\"",
                                "sec-ch-ua-mobile": "?0",
                                "sec-ch-ua-platform": "\"Windows\"",
                                "sec-fetch-dest": "empty",
                                "sec-fetch-mode": "cors",
                                "sec-fetch-site": "same-origin",
                                "x-xsrf-token": xsrf,
                                "x-zalando-checkout-app": "web",
                                "x-zalando-footer-mode": "desktop",
                                "x-zalando-header-mode": "desktop"
                            },
                            "referrerPolicy": "strict-origin-when-cross-origin",
                            "body": null,
                            "method": "GET",
                            "mode": "cors",
                            "credentials": "include"
                        }).then(e => e.json()).then(e => {
                            if (!e.url.includes("confirm"))
                                window.open(e.url);
                            else if (e.url.includes("confirm"))
                                iziToast.success({
                                    title: scriptName,
                                    message: "Preload active"
                                });
                        })
                    })
                }).catch(e => {
                    console.log(e.toString())
                    if (e.toString().includes("fetch")) {
                        iziToast.error({
                            title: scriptName,
                            message: "Please login",
                        });
                    }
                })
            }
        })
    }

    function randomProperty (productObj) {
        var keys = Object.keys(productObj);
        return productObj[keys[ keys.length * Math.random() << 0]];
    };
}

async function sendWebook(size, productImage, price, productName, productLink, paypalLink, privateWebhook, publicWebhook) {

    // private webhook
    fetch(privateWebhook, {
        "method": "POST",
        "headers": {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            "avatar_url": "https://media.discordapp.net/attachments/900467028559822889/934232769402388490/IMG_3460.png?width=666&height=677",
            "username": "Telios Success",
            "embeds": [
                {
                    "title": "Zalando Checkout!",
                    "color": "7419530",
                    "fields": [
                        {
                            "name": "Size",
                            "value": size,
                            "inline": true
                        }, {
                            "name": "Price",
                            "value": price,
                            "inline": true
                        }, {
                            "name": "Item", 
                            "value": `[${productName}](${productLink})`,
                            "inline": true
                        }, {
                            "name": "Purchase Link",
                            "value": `[PayPal Link](${paypalLink})`
                        }
                    ],
                    "thumbnail": {
                        "url": productImage
                    },
                    "footer": {
                        "text": "Telios  v1.3",
                        "icon_url": "https://media.discordapp.net/attachments/900467028559822889/934232769402388490/IMG_3460.png?width=666&height=677"
                      }
                }
            ]
        })
    })

    // public checkout logs
    fetch(publicWebhook, {
        "method": "POST",
        "headers": {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            "avatar_url": "https://media.discordapp.net/attachments/900467028559822889/934232769402388490/IMG_3460.png?width=666&height=677",
            "username": "Telios Success",
            "embeds": [
                {
                    "title": "Zalando Checkout!",
                    "color": "4732533",
                    "fields": [
                        {
                            "name": "Size",
                            "value": size,
                            "inline": true
                        }, {
                            "name": "Price",
                            "value": price,
                            "inline": true
                        }, {
                            "name": "Item", 
                            "value": `[${productName}](${productLink})`,
                            "inline": true
                        }, 
                    ],
                    "thumbnail": {
                        "url": productImage
                    },
                    "footer": {
                        "text": "Telios  v1.3",
                        "icon_url": "https://media.discordapp.net/attachments/900467028559822889/934232769402388490/IMG_3460.png?width=666&height=677"
                      },
                }
            ],
        })
    })
}

async function checkPreload() {
    iziToast.info({
        title: scriptName,
        message: "Checking preload status...",
    });
    fetch("/checkout/confirm").then(e => e.text()).then(e => {
        try {
            eTag = e.split("eTag&quot;:&quot;\\&quot;")[1].split('\\')[0];
        } catch {
            iziToast.warning({
                title: scriptName,
                message: "No preload active",
            });
            return;
        } 
        iziToast.success({
            title: scriptName,
            message: "Preload active",
        });
    });
}