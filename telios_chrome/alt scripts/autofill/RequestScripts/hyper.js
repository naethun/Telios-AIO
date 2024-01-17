var userID;
console.log("AB")
console.log("ANYONE")
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
  async function(data) {
    console.log(data.isValidKey)
    if (data.isValidKey === true && data.enabledScripts.hyper) {
      console.log("Hyper is enabled")
      //userBilling = data.shippingProfiles.find(profile => profile.shippingId === data.selectedShippingProfile);
      let userBilling = data.billingProfiles.find(profile => profile.billingId === data.selectedBillingProfile);
      let userSettings = data.userSettings;
      function sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
      }
      console.log("ITS COMING HOME")
      await sleep(1000)
      console.log("YESSSS")
      console.log("HYPER")
      let isHyper = false
      var script;
      try {
        script = document.getElementById("__NEXT_DATA__").textContent;
        isHyper = true
      } catch {
        return
      }
      if (isHyper == true) {
        console.log(script)
        data = JSON.parse(script)
        releaseID = data["query"]["release"]
        accountID = data["props"]["pageProps"]["account"]["id"]
        console.log(data)
        console.log(releaseID)
        // GETTING USER
        fetch(`https://${window.location.href.split("/")[2]}/ajax/user`, {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
            "hyper-account": `${accountID}`,
            "Authorization": "Bearer pk_BsWCpXiHprJEMvcf5FmxG5Q0G2HknXns",
            "if-none-match": "W/\"253-4KW3wzmdnfPNFAdHY/Rs0xOWgEk\"",
            "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin"
        },
        "referrer": `${window.location.href}`,
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
        }).then(response => {
            return response.json();
        })
        .then(response => {
            console.log(response)
            return response["id"]
        }).then(user => {
          new Noty({
            type: "info",
            theme: "mint",
            text: "Starting Hyper Request!",
            timeout: "3000"
          }).show();
          console.log(user)
          userID = user
          fetch("https://api.stripe.com/v1/payment_methods", {
          "headers": {
            "accept": "application/json",
            "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
            "content-type": "application/x-www-form-urlencoded",
            "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site"
          },
          "referrer": "https://js.stripe.com/",
          "referrerPolicy": "strict-origin-when-cross-origin",
          "body": `type=card&billing_details[name]=${userBilling.firstName}+${userBilling.lastName}&billing_details[email]=${userBilling.email}&card[number]=${userBilling.cardNumber}&card[cvc]=${userBilling.cvv}&card[exp_month]=${userBilling.cardMonth}&card[exp_year]=${userBilling.cardYear.slice(-2)}&guid=f5817cea-09cf-4951-bb70-87956467116a2b66b9&muid=337a089b-a25e-488e-b3f6-87e60026f539458642&sid=fe815c61-d064-4769-b0af-488dd00a0cd3d86006&payment_user_agent=stripe.js%2F5f093a60f%3B+stripe-js-v3%2F5f093a60f&time_on_page=130065&referrer=https%3A%2F%2F${window.location.href.split("/")[2]}%2F&key=pk_live_51GXa1YLZrAkO7Fk2tcUO7vabkO7sgDamOww2OPYQVFhPZOllT75f7owzIOlP75MMdDXHKoy6wPt40HsuQDObpkHv004T74fAzs`,
          "method": "POST",
          "mode": "cors",
          "credentials": "omit"
        }).then(response => {
          return response.json();
        })
        .then(response => {
            return response["id"]
        }).then(response => {
          new Noty({
            type: "info",
            theme: "mint",
            text: "Got Payment Token!",
            timeout: "3000"
          }).show();
          let script = document.getElementById("__NEXT_DATA__").textContent;
          console.log(script)
          data = JSON.parse(script)
          accountID = data["props"]["pageProps"]["account"]["id"]
            fetch(`https://${window.location.href.split("/")[2]}/ajax/checkouts`, {
            "headers": {
                "accept": "application/json, text/plain, *//*",
                "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                "content-type": "application/json;charset=UTF-8",
                "hyper-account": `${accountID}`,
                "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
                "sec-ch-ua-mobile": "?0",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-amz-cf-id": "null",
                "x-amz-req-id": "null"
            },
            "referrer": `${window.location.href}`,
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": `{\"release\":\"${releaseID}\",\"billing_details\":{\"name\":\"${userBilling.firstName} ${userBilling.lastName}\",\"email\":\"${userBilling.email}\",\"address\":null}, \"user\":\"${userID}\", \"payment_method\":\"${response}\"}`,
            "method": "POST",
            "mode": "cors",
            "credentials": "include"
            }).then(response => {//, "user":"${userID}"
                return response.json();
            })
            .then(response => {
              new Noty({
                type: "info",
                theme: "mint",
                text: "Submitted Checkout!",
                timeout: "3000"
              }).show();
                console.log("CHECKOUT RESPONSE")
                console.log(response)
                console.log("SUBMITTED ORDER")
                console.log("CHECKING ORDER")
                new Noty({
                  type: "info",
                  theme: "mint",
                  text: "Checking Order!",
                  timeout: "3000"
                }).show();
                let script = document.getElementById("__NEXT_DATA__").textContent;
                console.log(script)
                data = JSON.parse(script)
                accountID = data["props"]["pageProps"]["account"]["id"]
                fetch(`https://${window.location.href.split("/")[2]}/ajax/user`, {
                "headers": {
                    "accept": "application/json, text/plain, */*",
                    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                    "hyper-account": `${accountID}`,
                    "if-none-match": "W/\"253-4KW3wzmdnfPNFAdHY/Rs0xOWgEk\"",
                    "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin"
                },
                "referrer": `${window.location.href}`,
                "referrerPolicy": "strict-origin-when-cross-origin",
                "body": null,
                "method": "GET",
                "mode": "cors",
                "credentials": "include"
                }).then(response => {
                    return response.json();
                })
                .then(response => {
                    console.log("YEE HAW")
                    return response["license"]
                })
                .then(async function (response) {
                  console.log("ASYNC>")
                    await sleep(1000)
                    if (response == null) {
                        await sleep(5000)
                        let script = document.getElementById("__NEXT_DATA__").textContent;
                        console.log(script)
                        data = JSON.parse(script)
                        accountID = data["props"]["pageProps"]["account"]["id"]
                        fetch(`https://${window.location.href.split("/")[2]}/ajax/user`, {
                        "headers": {
                            "accept": "application/json, text/plain, */*",
                            "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                            "hyper-account": `${accountID}`,
                            "if-none-match": "W/\"253-4KW3wzmdnfPNFAdHY/Rs0xOWgEk\"",
                            "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
                            "sec-ch-ua-mobile": "?0",
                            "sec-fetch-dest": "empty",
                            "sec-fetch-mode": "cors",
                            "sec-fetch-site": "same-origin"
                        },
                        "referrer": `${window.location.href}`,
                        "referrerPolicy": "strict-origin-when-cross-origin",
                        "body": null,
                        "method": "GET",
                        "mode": "cors",
                        "credentials": "include"
                        }).then(response => {
                            return response.json();
                        })
                        .then(response => {
                            return response["license"]
                        })
                        .then(response => {
                            if (response == null) {
                              new Noty({
                                type: "error",
                                theme: "mint",
                                text: "OOS. Checkout Failed!",
                                timeout: "3000"
                              }).show();
                                console.log("Out Of Stock")
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
                                  siteName: "Hyper Labs",
                                  productName: "Bot / Group License",
                                  price: "Failed",
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
                                "title": "**${webhookInfo.guildName} Failed Checkout**",
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
                            } else {
                              new Noty({
                                type: "success",
                                theme: "mint",
                                text: "Successfully Checked Out!",
                                timeout: "3000"
                              }).show();
                                console.log("Succesfully Checked Out!")
                                const webhookURL = userSettings.webhook;
                            
                                const masterWebhookURL =
                                  "https://discord.com/api/webhooks/861256088170266645/C0_HFUhEK3p2lmZN6_NG_pf-E5IJ06u0lgPXlCzGddn6fjZ8w3S6yE89h5w5ie43d7vg";
                            
                                const webhookInfo = {
                                  guildName: "Radar Scripts 2.0",
                                  guildImageURL: "https://cdn.discordapp.com/attachments/736740849894817893/736749569164967988/new_logo_1.png",
                                  siteName: "Hyper Labs",
                                  productName: "Bot / Group License",
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
                                "title": "**${webhookInfo.guildName} Successful Checkout**",
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
                            }
                        })
                    } else {
                      new Noty({
                        type: "success",
                        theme: "sunset",
                        text: "Successfully Checked Out!",
                        timeout: "3000"
                      }).show();
                        console.log("Succesfully Checked Out!")
                        const webhookURL = userSettings.webhook;
                            
                                const masterWebhookURL =
                                  "https://discord.com/api/webhooks/861256088170266645/C0_HFUhEK3p2lmZN6_NG_pf-E5IJ06u0lgPXlCzGddn6fjZ8w3S6yE89h5w5ie43d7vg";
                            
                                const webhookInfo = {
                                  guildName: "Radar Scripts 2.0",
                                  guildImageURL: "https://cdn.discordapp.com/attachments/736740849894817893/736749569164967988/new_logo_1.png",
                                  siteName: "Hyper Labs",
                                  productName: "Bot / Group License",
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
                                "title": "**${webhookInfo.guildName} Successful Checkout**",
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
                    }
                })
            })
        })
        })
      }
      
      /*fetch("https://dashboard.radaraio.com/ajax/checkouts", {
          "headers": {
              "accept": "application/json, text/plain, *//*",
              "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
              "content-type": "application/json;charset=UTF-8",
              "hyper-account": "01ZjRoMcwX5iCXmcTtRXg",
              "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
              "sec-ch-ua-mobile": "?0",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin",
              "x-amz-cf-id": "null",
              "x-amz-req-id": "null"
          },
          "referrer": "https://dashboard.radaraio.com/purchase/ohAflRPIjbR1KtcqCbKRk?password=RadarAIOFreeBeta",
          "referrerPolicy": "strict-origin-when-cross-origin",
          "body": `{\"release\":\"${releaseID}\",\"billing_details\":{\"name\":\"Sandal Socks\",\"email\":\"sandal@gmail.com\",\"address\":null},\"user\":\"fsYWQgkjL0Tmxa3FPtng_\",\"payment_method\":null}`,
          "method": "POST",
          "mode": "cors",
          "credentials": "include"
      });*/


      }
  })

const currentStep = () => {
  let element = document.querySelector("[data-step]");
  return element.dataset.step;
};

function fillField(id, value, select = false) {
  let element = document.querySelector(id);
  if (element) {
    element.focus();
    element.value = value;
    element.dispatchEvent(new Event("change"));
    element.blur();
  }
}

function fill(name, value) {
  let ele = document.getElementsByName(name)[0];
  if (ele) {
    ele.dispatchEvent(new FocusEvent("focus", { bubbles: true }));
    ele.value = value;
    ele.dispatchEvent(new Event("input", { target: ele, bubbles: true }));
    ele.dispatchEvent(new Event("change", { target: ele, bubbles: true }));
    ele.dispatchEvent(new FocusEvent("blur", { bubbles: true }));
  }

  ele = document.getElementById(name);
  if (ele) {
    ele.dispatchEvent(new FocusEvent("focus", { bubbles: true }));
    ele.value = value;
    ele.dispatchEvent(new Event("input", { target: ele, bubbles: true }));
    ele.dispatchEvent(new Event("change", { target: ele, bubbles: true }));
    ele.dispatchEvent(new FocusEvent("blur", { bubbles: true }));
  }

  ele = document.getElementsByClassName(name)[0];
  if (ele) {
    ele.dispatchEvent(new FocusEvent("focus", { bubbles: true }));
    ele.value = value;
    ele.dispatchEvent(new Event("input", { target: ele, bubbles: true }));
    ele.dispatchEvent(new Event("change", { target: ele, bubbles: true }));
    ele.dispatchEvent(new FocusEvent("blur", { bubbles: true }));
  }

  elems = document.querySelectorAll(`[placeholder=${name}]`);
  elems.forEach(function(ele) {
    if (ele) {
      ele.dispatchEvent(new FocusEvent("focus", { bubbles: true }));
      ele.value = value;
      ele.dispatchEvent(new Event("input", { target: ele, bubbles: true }));
      ele.dispatchEvent(new Event("change", { target: ele, bubbles: true }));
      ele.dispatchEvent(new FocusEvent("blur", { bubbles: true }));
    }
  });

  elems = document.querySelectorAll(`[autocomplete=${name}]`);
  elems.forEach(function(ele) {
    if (ele) {
      ele.dispatchEvent(new FocusEvent("focus", { bubbles: true }));
      ele.value = value;
      ele.dispatchEvent(new Event("input", { target: ele, bubbles: true }));
      ele.dispatchEvent(new Event("change", { target: ele, bubbles: true }));
      ele.dispatchEvent(new FocusEvent("blur", { bubbles: true }));
    }
  });
}

function hasCaptcha() {
  return document.getElementById("g-recaptcha");
}

function continueToNextStep() {
  let continueButton = document.querySelector(".step__footer__continue-btn");
  continueButton.click();
}
