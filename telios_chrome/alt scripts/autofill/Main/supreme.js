window.onload = () => {
  chrome.storage.sync.set({ isValidKey: true }, function() {});
}


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
    console.log("HELLO SUPREME STARTED")
    console.log(data.enabledScripts.supreme)
    console.log(data.isValidKey)
    if (data.isValidKey === true && data.enabledScripts.supreme) {
      (async () => {
        console.log("VALID")
        //const userBilling = data.shippingProfiles.find(profile => profile.shippingId === data.selectedShippingProfile);
        const userBilling = data.billingProfiles.find(profile => profile.billingId === data.selectedBillingProfile);
        const userSettings = data.userSettings;
        const enabledScripts = data.enabledScripts;

        if (userBilling.country == "United Kingdom") {
          userBilling.country = "GB";
        } else if (userBilling.country == "United States") {
          userBilling.country = 'US'
        }

        //Checkout time
        let startTime = new Date().getTime();
        let endTime = 0;

        let delay = 2000;

        function sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms || delay));
        }

        function fill(name, value) {
          let ele = document.getElementById(name);
          if (ele) {
            ele.focus();
            ele.value = value;
            ele.blur();
          }
        }

        //Autofill
        console.log("AUTOFILL STARTED");
        fill("order_billing_name", userBilling.firstName + " " + userBilling.lastName);
        fill("order_email", userBilling.email);
        fill("order_tel", userBilling.telephone);
        await sleep(50);

        fill("bo", userBilling.address);
        fill("oba3", userBilling.address2);

        fill("order_billing_city", userBilling.city);
        fill("order_billing_zip", userBilling.zip);
        fill("order_billing_state", userBilling.state);
        fill("order_billing_country", userBilling.country);
        await sleep(50);

        fill("rnsnckrn", userBilling.cardNumber);
        fill("cnb", userBilling.cardNumber);
        fill("vval", userBilling.cvv);
        fill("orcer", userBilling.cvv);
        if (document.getElementById("order_billing_country")[0].value == "USA") {
          fill("credit_card_type", userBilling.cardType);
        }
        fill("credit_card_month", userBilling.cardMonth);
        fill("credit_card_year", userBilling.cardYear);
        await sleep(50);

        document.getElementsByClassName("icheckbox_minimal")[1].focus();
        document.getElementsByClassName("icheckbox_minimal")[1].click();
        await sleep();

        //Checks out the product if the autoCheckout == true
        if (enabledScripts.supremeACO) {
          document.querySelector(".button, .checkout").click();
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
              siteName: "Supreme",
              productName: "Supreme Autofill",
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

        endTime = new Date().getTime();
        console.log(`checkout complete. checkout time: ${endTime - startTime}ms`);

        
      })();
    }
  }
);
