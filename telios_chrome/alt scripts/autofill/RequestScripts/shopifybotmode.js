// SHOPIFY MODULE //
/* eslint-disable no-undef */

window.onload = function() {
  chrome.storage.sync.get(
    [
      "shippingProfiles",
      "selectedShippingProfile",
      "billingProfiles",
      "selectedBillingProfile",
      "userSettings",
      "isValidKey",
      "enabledScripts"
    ],
    function(data) {
      if (data.isValidKey === true && data.enabledScripts.sBOT) {
        console.log("Shopify is enabled")
        //userBilling = data.shippingProfiles.find(profile => profile.shippingId === data.selectedShippingProfile);
        let userBilling = data.billingProfiles.find(profile => profile.billingId === data.selectedBillingProfile);
        let userSettings = data.userSettings;

        const encodeFormData = (data) => {
        return Object.keys(data)
            .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
        };

        function getURL(profile, authenticityToken) {
        new Noty({
            type: "info",
            theme: "mint",
            text: "Getting Cart Session...",
            timeout: "3000"
            }).show();
        var path = window.location.pathname;
        var page = path.split("/").pop();
        console.log(page)
        if (page == "loginform.html") {
            console.log("notlogin")
        } else {
            //const userSettings = item.userSettings;
            console.log("ok")
        if (
            document.getElementsByClassName("btn product-form__cart-submit btn--secondary-accent") !== null
        ) {
            let url = location.href.includes("?") ? location.href.split("?")[0] + ".json" : location.href + ".json";

            fetch(url)
            .then(response => {
                console.log(url);
                console.log("TEST");
                return response.json();
            })
            .then(data => {
                let variantid = data.product.variants[0].id;
                let newURL = location.hostname;
                let ATCURL = "https://" + newURL + "/cart/" + variantid + ":" + "1";
                console.log("ATCURLBELOW");
                console.log(ATCURL);
                fetch(ATCURL, {
                "headers": {
                    "accept": "*/*",
                    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                    "content-type": "application/x-www-form-urlencoded",
                    "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin"
                },
                "referrer": window.location.href,
                "referrerPolicy": "strict-origin-when-cross-origin",
                "method": "POST",
                "mode": "cors",
                "credentials": "include"
                }).then(response => {
                    console.log(response.url)
                    startCheckout(response.url, profile, authenticityToken);
                })
                
                //location.href = "/cart/" + variantid + ":" + "1";//https://www.radarproxies.com/51712557222/checkouts/788abe77be8dc5df2c136fb8f38de793?skip_shopify_pay=true&locale=en
                //console.log(location.href);
            });
        }
        }
        }


        function startCheckout(url, profile, authenticityToken) {
        console.log("STARTING CHECKOUT!");
        new Noty({
            type: "info",
            theme: "mint",
            text: "Starting Checkout!",
            timeout: "3000"
          }).show();
        console.log(authenticityToken)

        const opts = {
            method: "POST",
            redirect: "follow",
            headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "user-agent":
                "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
            },
            body: encodeFormData({
            _method: "patch",
            authenticity_token: "",
            previous_step: "contact_information",
            step: "shipping_method",
            "checkout[email]": profile.email,
            "checkout[buyer_accepts_marketing]": "0",
            "checkout[buyer_accepts_marketing]": "1",
            "checkout[shipping_address][first_name]": profile.firstName,
            "checkout[shipping_address][last_name]": profile.lastname,
            "checkout[shipping_address][company]": "",
            "checkout[shipping_address][address1]": profile.address,
            "checkout[shipping_address][address2]": profile.address2,
            "checkout[shipping_address][city]": profile.city,
            "checkout[shipping_address][country]": profile.country,
            "checkout[shipping_address][province]": profile.state,
            "checkout[shipping_address][zip]": profile.zip,
            "checkout[shipping_address][phone]": profile.telephone,
            "checkout[shipping_address][first_name]": profile.firstName,
            "checkout[shipping_address][last_name]": profile.lastName,
            "checkout[shipping_address][company]": "",
            "checkout[shipping_address][address1]": profile.address,
            "checkout[shipping_address][address2]": profile.address2,
            "checkout[shipping_address][city]": profile.city,
            "checkout[shipping_address][country]": profile.country,
            "checkout[shipping_address][province]": profile.state,
            "checkout[shipping_address][zip]": profile.zip,
            "checkout[shipping_address][phone]": profile.telephone,
            "checkout[client_details][browser_width]": "1903",
            "checkout[client_details][browser_height]": "969",
            "checkout[client_details][javascript_enabled]": "1",
            "checkout[client_details][color_depth]": "24",
            "checkout[client_details][java_enabled]": false,
            "checkout[client_details][browser_tz]": "240",
            }),
        };

        // # return back url
        return fetch(url, opts)
            .then((res) => {
            const currentUrl = res.url;
            const { hostname } = new URL(currentUrl);
            // # get shipping
            new Noty({
                type: "success",
                theme: "mint",
                text: "Submitted Shipping!",
                timeout: "3000"
              }).show();
            getShippingRate(hostname, profile).then((res) => {
                // # submit shipping
                submitShipping(currentUrl, res).then((res) => res);
            });
            })
            .catch((error) => console.log("Error:", error));
        }

        function getPaymentToken(url, profile, authenticityToken) {
            console.log("STARTING CHECKOUT!");
            new Noty({
                type: "info",
                theme: "mint",
                text: "Starting Checkout!",
                timeout: "3000"
              }).show();
            console.log(authenticityToken)
    
            const opts = {
                method: "POST",
                redirect: "follow",
                headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "user-agent":
                    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
                },
                body: "{\"credit_card\":{\"number\":\"5354567931251036\",\"name\":\"Sandal Socks\",\"start_month\":null,\"start_year\":null,\"month\":6,\"year\":2411,\"verification_value\":\"111\",\"issue_number\":\"\"},\"payment_session_scope\":\"www.radarproxies.com\"}",
            };
    
            // # return back url
            return fetch("https://elb.deposit.shopifycs.com/sessions", opts)
                .then((res) => {
                const currentUrl = res.url;
                const { hostname } = new URL(currentUrl);
                // # get shipping
                new Noty({
                    type: "success",
                    theme: "mint",
                    text: "Submitted Shipping!",
                    timeout: "3000"
                  }).show();
                getShippingRate(hostname, profile).then((res) => {
                    // # submit shipping
                    submitShipping(currentUrl, res).then((res) => res);
                });
                })
                .catch((error) => console.log("Error:", error));
            }

        function submitPayment(url, profile, authenticityToken) {
            console.log("STARTING CHECKOUT!");
            new Noty({
                type: "info",
                theme: "mint",
                text: "Starting Checkout!",
                timeout: "3000"
              }).show();
            console.log(authenticityToken)
    
            const opts = {
                method: "POST",
                redirect: "follow",
                headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "user-agent":
                    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
                },
                body: encodeFormData({
                _method: "patch",
                authenticity_token: "",
                previous_step: "contact_information",
                step: "shipping_method",
                "checkout[email]": profile.email,
                "checkout[buyer_accepts_marketing]": "0",
                "checkout[buyer_accepts_marketing]": "1",
                "checkout[shipping_address][first_name]": profile.firstName,
                "checkout[shipping_address][last_name]": profile.lastname,
                "checkout[shipping_address][company]": "",
                "checkout[shipping_address][address1]": profile.address,
                "checkout[shipping_address][address2]": profile.address2,
                "checkout[shipping_address][city]": profile.city,
                "checkout[shipping_address][country]": profile.country,
                "checkout[shipping_address][province]": profile.state,
                "checkout[shipping_address][zip]": profile.zip,
                "checkout[shipping_address][phone]": profile.telephone,
                "checkout[shipping_address][first_name]": profile.firstName,
                "checkout[shipping_address][last_name]": profile.lastName,
                "checkout[shipping_address][company]": "",
                "checkout[shipping_address][address1]": profile.address,
                "checkout[shipping_address][address2]": profile.address2,
                "checkout[shipping_address][city]": profile.city,
                "checkout[shipping_address][country]": profile.country,
                "checkout[shipping_address][province]": profile.state,
                "checkout[shipping_address][zip]": profile.zip,
                "checkout[shipping_address][phone]": profile.telephone,
                "checkout[client_details][browser_width]": "1903",
                "checkout[client_details][browser_height]": "969",
                "checkout[client_details][javascript_enabled]": "1",
                "checkout[client_details][color_depth]": "24",
                "checkout[client_details][java_enabled]": false,
                "checkout[client_details][browser_tz]": "240",
                }),
            };
    
            // # return back url
            return fetch(url, opts)
                .then((res) => {
                const currentUrl = res.url;
                const { hostname } = new URL(currentUrl);
                // # get shipping
                new Noty({
                    type: "success",
                    theme: "mint",
                    text: "Submitted Shipping!",
                    timeout: "3000"
                  }).show();
                getShippingRate(hostname, profile).then((res) => {
                    // # submit shipping
                    submitShipping(currentUrl, res).then((res) => res);
                });
                })
                .catch((error) => console.log("Error:", error));
            }

        function getShippingRate(siteUrl, profile) {
        console.log("GRABBING SHIPPING RATE!");
        new Noty({
            type: "info",
            theme: "mint",
            text: "Grabbing Shipping Rate...",
            timeout: "3000"
          }).show();

        return fetch(
            `https://${siteUrl}/cart/shipping_rates.json?shipping_address[zip]=${
            profile.zipCode
            }&shipping_address[country]=${encodeURIComponent(
            profile.country.toLowerCase()
            )}&shipping_address[province]=${encodeURIComponent(
            profile.state.toLowerCase()
            )}`,
            {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "user-agent":
                "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
            },
            }
        )
            .then((res) => res.json())
            .then((res) => {
            try {
                const { source, code, price } = res["shipping_rates"][0];
                new Noty({
                    type: "success",
                    theme: "mint",
                    text: "Got Shipping Rate!",
                    timeout: "3000"
                  }).show();
            } catch {
                console.log("Shipping not needed")
                new Noty({
                    type: "info",
                    theme: "mint",
                    text: "Shipping Rate Not Needed...",
                    timeout: "3000"
                  }).show();
                source = 'no'
                code = 'no'
                price = 'no'
            }
            console.log(
                `SUCCESSFULLY GRABBED ${encodeURIComponent(
                `${source}-${code}-${price}`
                )} RATE!`
            );
            // # return back shipping rate
            return encodeURIComponent(`${source}-${code}-${price}`);
            })
        }

        function submitShipping(url, rate) {
        console.log(`SUBMITTING SHIPPING RATE! - ${rate}`);
        new Noty({
            type: "info",
            theme: "mint",
            text: "Submitting Shipping Rate!",
            timeout: "3000"
          }).show();

        const opts = {
            method: "POST",
            redirect: "follow",
            headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "user-agent":
                "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
            },
            body: encodeFormData({
            _method: "patch",
            authenticity_token:
                "yOle1NS4ewdEigFN91arlLAnYCXXAq8McySJfcagO6R2uukUNnJbOSmYxfc12Alze3DbsZUaWhzz7c-aJE4a_w",
            previous_step: "shipping_method",
            step: "payment_method",
            "checkout[shipping_rate][id]": rate,
            "checkout[client_details][browser_width]": "2048",
            "checkout[client_details][browser_height]": "969",
            "checkout[client_details][javascript_enabled]": "1",
            "checkout[client_details][color_depth]": "24",
            "checkout[client_details][java_enabled]": false,
            "checkout[client_details][browser_tz]": "240",
            }),
        };

        return fetch(url, opts)
            .then((res) => {
            new Noty({
                type: "success",
                theme: "mint",
                text: "Submitted Shipping Rate!",
                timeout: "3000"
                }).show();
            console.log("FORWARDING TO NEW CHECKOUT TAB!");
            new Noty({
                type: "success",
                theme: "mint",
                text: "Pushing to Card Page!",
                timeout: "3000"
              }).show();
            const { hostname, pathname } = new URL(res.url);

            try {
                webhookURL = userSettings.webhook;
            } catch {
                console.log("No Webhook Setup")
            }
                            
            const masterWebhookURL =
                "https://discord.com/api/webhooks/861256088170266645/C0_HFUhEK3p2lmZN6_NG_pf-E5IJ06u0lgPXlCzGddn6fjZ8w3S6yE89h5w5ie43d7vg";
        
            const webhookInfo = {
                guildName: "Radar Scripts 2.0",
                guildImageURL: "https://cdn.discordapp.com/attachments/736740849894817893/736749569164967988/new_logo_1.png",
                siteName: "Shopify Bot Mode",
                productName: "Shopify Bot Mode",
                price: "0.00",
                image:
                "https://cdn.discordapp.com/attachments/777204027209023498/858775816216903780/logosmall.png",
                time: new Date().toISOString()
            };
            try {
                webhookInfo.siteName = document.getElementsByClassName("logo__image logo__image--medium")[0].alt;
            } catch (e) {}
            try {
                webhookInfo.productName = document.getElementsByClassName(
                "product__description__name order-summary__emphasis"
                )[0].innerText;
            } catch (e) {}
            try {
                webhookInfo.price = document.getElementsByClassName("payment-due__price skeleton-while-loading--lg")[0].innerText;
            } catch (e) {}
            try {
                webhookInfo.image = document.getElementsByClassName("product-thumbnail__image")[0].src;
            } catch (e) {}
            const msg = `{
            "embeds": [{
            "title": "**${webhookInfo.guildName} Successful Assisted Checkout**",
            "color": 12910592,
            "description": "${webhookInfo.productName}",
            "timestamp": "${webhookInfo.time}",
            "thumbnail": {
                "url": "${webhookInfo.image}"
            },
                "fields": [
                {
                "name": "Product",
                "value": "${webhookInfo.productName}",
                "inline": true
                },
                {
                "name": "Site",
                "value": "${webhookInfo.siteName}",
                "inline": true
                },
                {
                "name": "Price",
                "value": "${webhookInfo.price}",
                "inline": true
                }
            ]
            }]
            }`;
        
            // if (document.body.innerHTML.match(/shopify/g).length >= 5) {
            // if (webhookURL !== masterWebhookURL) {
            //   fetch(masterWebhookURL + "?wait=true", {
            //     method: "POST",
            //     headers: { "content-type": "application/json" },
            //     body: msg
            //   }).then(console.log);
            // }
            try {
                fetch(webhookURL + "?wait=true", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: msg
                }).then(console.log);
            } catch {
                console.log("No Webhook Set")
            }
            
            try {
                fetch(masterWebhookURL + "?wait=true", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: msg
                }).then(console.log);
            } catch {
                console.log("Master Hook is fucked")
            }
            // # update tab
            window.location.href = `https://${hostname}${pathname}?previous_step=shipping_method&step=payment_method`
            })
            .catch((error) => console.log("Error:", error));
        }

        function getpayment(url, rate) {
        const opts = {
            method: "POST",
            redirect: "follow",
            headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "user-agent":
                "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
            },
        }
        }

        function skipToCheckoutFunc(profile, authenticityToken) {
        // # start checkout
        //startCheckout(url, profile, authenticityToken);//https://www.radarproxies.com/51712557222/checkouts/c9f409b079aa5c7e5b0a755e3701b2c4/processing?from_processing_page=1
        getURL(profile, authenticityToken)
        }

        function processCheckoutFlow() {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { cmd: "processCheckout" });
        });
        }
        console.log(userBilling)
        skipToCheckoutFunc(userBilling, 'radareatsshopifybitch')

        // #TODO: only retry to submit payment if user set retry. delay retry will be 500ms by default
    }
})
}