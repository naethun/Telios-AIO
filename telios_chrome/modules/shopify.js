chrome.storage.sync.get('profiles', function (items) {
    items.profiles = JSON.parse(items.profiles)

    chrome.storage.sync.get('webhook', function(car) {
        console.log('Webhook is set to ' + car.webhook);

    chrome.storage.sync.get('profileIndex', function (index) {
        index = (index.profileIndex);
        let chosenProfile = items.profiles[index];

        function cardFill() {
            const changeInput = (input, value) => {
                let lastInput = input.value;
                input.value = value;

                let event = new Event("input", { bubbles: true });
                input.simulated = true;

                let event2 = new Event("change", { bubbles: true });
                input.simulated = true;

                let tracker = input._valueTracker;
                if (tracker) {
                    tracker.setValue(lastValue);
                }
                input.dispatchEvent(event)
                input.dispatchEvent(event2)
            };

            const card_inputs = {
                number: chosenProfile.card.cardNumber,
                name: chosenProfile.card.name,
                expiry: chosenProfile.card.expiration,
                verification_value: chosenProfile.card.cvv,
                cardNumber: chosenProfile.card.cardNumber,
                cardExpiry: chosenProfile.card.expiration,
                cardCvc: chosenProfile.card.cvv,
                postalCode: chosenProfile.card.zip
            };

            Object.keys(card_inputs).forEach((id) => {
                let input = document.querySelector(`#${id}:not(.visually-hidden)`);
                let secondInput = document.querySelector(`[data-elements-stable-field-name=${id}]`)
                input ? changeInput(input, card_inputs[id]) : false;
                secondInput ? changeInput(secondInput, card_inputs[id]) : false;
            });

            setTimeout(() => {
                Object.keys(card_inputs).forEach((id) => {
                    let input = document.querySelector(`#${id}:not(.visually-hidden)`);
                    let secondInput = document.querySelector(`[data-elements-stable-field-name=${id}]`)
                    input ? changeInput(input, card_inputs[id]) : false;
                    secondInput ? changeInput(secondInput, card_inputs[id]) : false;
                });
            }, 0)
        }

        function ShopifyPaymentPage() {
            var cardNumber = chosenProfile.card.cardNumber; // Card Numbeer here
            var monthYear = chosenProfile.card.month + chosenProfile.card.year; // Expiry Month Year and Date
            var cvc = chosenProfile.card.cvv; // CVC here
            var cardName = chosenProfile.firstName + chosenProfile.lastName; // Name

            function changeInputs(element, value) {
                var element = document.querySelector(element);
                let lastValue = element.value;
                element.value = value;

                let event = new Event("input", { bubbles: true });
                event.simulated = true;

                let event2 = new Event("change", { bubbles: true });
                event2.simulated = true;

                let tracker = element._valueTracker;
                if (tracker) {
                    tracker.setValue(lastValue);
                }
                element.dispatchEvent(event);
                element.dispatchEvent(event2);
            }
            if(document.querySelector('#number')){
                changeInputs('#number', cardNumber)
            }
            document.querySelector('#number') ? changeInputs('#cardNumber', cardNumber) : false;
            document.querySelector('#expiry') ? changeInputs('#expiry', monthYear) : false;
            document.querySelector('#name') ? changeInputs('#name', cardName) : false;
            document.querySelector('#verification_value') ? changeInputs('#verification_value', moncvcthYear) : false;

            
            chrome.storage.sync.get("options", (data) => {
                let options = JSON.parse(data.options);
                console.log(options)
                options = options[4].features;
                console.log(options);
                if (!options) {
                    console.log("No options exist");
                    return;
                }
    
                if (options[0].value) {
                    ShopifyACO();
                }
            });
        };
        function paypalcheck(){
            ShopifyAutoFill();
            ShopifyACO();

            logo = document.querySelector('[class = "offsite-payment-gateway-logo"]').src

            if(logo.includes('paypal')){
            document.querySelector('[class = "offsite-payment-gateway-logo"]').click()
            }


            document.querySelector('#continue_button') ? document.querySelector('#continue_button').click() : false;
            if(location.href.includes('paypal.com')){
                console.log('yes')
                document.getElementById('payment-submit-btn').click()
            }

        }

        function ShopifyAutoFill() {
                console.log("Trying shopify")

                var email = chosenProfile.email;
                var cardNumber = chosenProfile.card.cardNumber;
                
                var cvc =chosenProfile.card.cvv;
                var firstName = chosenProfile.firstName
                var lastName = chosenProfile.lastName
                var countryCode = chosenProfile.country || 'GB';
                var ZIP = chosenProfile.zipcode;
                var addressLine1 = chosenProfile.address;
                var city = chosenProfile.city;
                var state = chosenProfile.state;
                var phone = chosenProfile.phone;

                if(countryCode == 'US' || countryCode =='USA' || countryCode == 'united states'){
                    countryCode = 'United States'
                }
                if(countryCode == 'CA' || countryCode == 'canada'){
                    countryCode = 'Canada'
                }
                if(countryCode == 'france' || countryCode == 'FR'){
                    countryCode = 'France'
                }
                if(countryCode == 'germany' || countryCode == 'DE'){
                    countryCode = 'Germany'
                }
                if(countryCode == 'mexico' || countryCode == 'MX'){
                    countryCode = 'Mexico'
                }
                if(countryCode == 'brazil' || countryCode == 'BR'){
                    countryCode = 'Brazil'
                }
                if(countryCode == 'united kingdom' || countryCode == 'UK'){
                    countryCode = 'United Kingdom'
                }
                if(countryCode == 'italy' || countryCode == 'IT'){
                    countryCode = 'Italy'
                }
                if(countryCode == 'spain' || countryCode == 'ES'){
                    countryCode = 'Spain'
                }
                if(countryCode == 'sweden' || countryCode == 'SE'){
                    countryCode = 'Sweden'
                }
                if(countryCode == 'austria' || countryCode == 'AU'){
                    countryCode = 'Austria'
                }
                if(countryCode == 'russia' || countryCode == 'RU'){
                    countryCode = 'Russia'
                }
                if(countryCode == 'china' || countryCode == 'CN'){
                    countryCode = 'China'
                }
                if(countryCode == 'japan' || countryCode == 'JPN'){
                    countryCode = 'Japan'
                }

                function changeInputs(element, value) {
                    var element = document.querySelector(element);
                    let lastValue = element.value;
                    element.value = value;

                    let event = new Event("input", { bubbles: true });
                    event.simulated = true;

                    let event2 = new Event("change", { bubbles: true });
                    event2.simulated = true;

                    let tracker = element._valueTracker;
                    if (tracker) {
                        tracker.setValue(lastValue);
                    }
                    element.dispatchEvent(event);
                    element.dispatchEvent(event2);
                }
                document.querySelector('#checkout_email') ? changeInputs('#checkout_email', email) : false;
                document.getElementById("checkout_shipping_address_first_name") ? changeInputs('#checkout_shipping_address_first_name', firstName) : false;
                document.getElementById("checkout_shipping_address_last_name") ? changeInputs('#checkout_shipping_address_last_name', lastName) : false;
                document.getElementById("checkout_shipping_address_address1") ? changeInputs ('#checkout_shipping_address_address1', addressLine1) : false;
                document.getElementById("checkout_shipping_address_city") ? changeInputs ('#checkout_shipping_address_city', city) : false;
                document.getElementById("checkout_shipping_address_country") ? changeInputs('#checkout_shipping_address_country', countryCode) : false;
                document.getElementById("checkout_shipping_address_province") ? changeInputs( '#checkout_shipping_address_province', state): false;
                document.getElementById("checkout_shipping_address_zip") ? changeInputs ('#checkout_shipping_address_zip', ZIP): false;
                document.getElementById("checkout_shipping_address_phone") ? changeInputs('#checkout_shipping_address_phone', phone): false;

                if(document.querySelector('#checkout_email_or_phone')){
                    document.querySelector('#checkout_email_or_phone') ? changeInputs ('#checkout_email_or_phone', email) : false;
                }

        }

        function ShopifyACO(){
            var CheckoutStep = document.querySelector('[data-step]')
            var classes = document.getElementsByClassName('input-checkbox');

            if (classes){
                console.log('clicking')
                var c = classes[0];
                c.click();  
            } 

            if (CheckoutStep = "contact_information") {
                console.log("BUTTON FOUND")
				setInterval(() => {
					document.querySelector('#continue_button') ? document.querySelector('#continue_button').click() : false;
				}, 700);
            }

            if (document.querySelector("[class='os-header__title']")) {
                setTimeout(() => {
                    ShopifyCheckoutLogs();
                    ShopifyCheckoutLog();
                }, 500)
            }
        }

        chrome.storage.sync.get("options", (data) => {
            let options = JSON.parse(data.options);
            options = options[3].features;
            console.log(options);
            if (!options) {
                console.log("No options exist");
                return;
            }

            if (options[0].value) {
                cardFill();
                ShopifyACO();
                ShopifyAutoFill();
                ShopifyPaymentPage();
                console.log("ACO activated");
            }
            if (options[1].value) {
                cardFill();
                ShopifyAutoFill();
                ShopifyPaymentPage();
                console.log("autofill activated");
            }
            if (options[2].value) {
                paypalcheck()
                console.log("paypal mode on");
            }
        });


//---------------------------------------------------------------------------------------------------------------------------------------


        //webhook

        function ShopifyCheckoutLogs() {
            let username = "username";
            chrome.storage.sync.get("username", (userData) => {
                username = userData["username"];
                if (!username) {
                    console.log("No username is set");
                }
                  const request = new XMLHttpRequest();
                  Size = document.getElementsByClassName("product__description__variant order-summary__small-text")[0].innerHTML;
                  Size = Size.split("<")[0];
                  Price = document.getElementsByClassName("payment-due__price skeleton-while-loading--lg")[0].innerHTML;
                  Image = document.getElementsByClassName("product-thumbnail__image")[0].src
                  request.open("POST", "https://discord.com/api/webhooks/941985971740745741/i20dnggeEkSmvwuLKYY511CZFSq1Hc8KrhkdQkhl71rIkbQzc1uF39AkyF1jadB-6IaV");
                  request.setRequestHeader('Content-type', 'application/json');
                  product = document.getElementsByClassName("product__description__name order-summary__emphasis")[0].innerHTML;

                  const params = {
                    "content": null,
                      "embeds": [
                          {
                            "title": "Shopify Checkout!",
                            "color": 4732533,
                            "fields": [
                              {
                                "name": "Product",
                                "value": product
                              },
                              {
                                "name": "Size",
                                "value": Size,
                                "inline": true
                              },
                              {
                                "name": "Price",
                                "value": Price,
                                "inline": true
                              }
                            ],
                            "footer": {
                              "text": "Telios  v1.2.2",
                              "icon_url": "https://media.discordapp.net/attachments/900467028559822889/934232769402388490/IMG_3460.png?width=666&height=677"
                            },
                            "thumbnail": {
                              "url": Image
                            }
                          }
                        ],
                        "username": "Telio Success",
                        "avatar_url": "https://media.discordapp.net/attachments/900467028559822889/934232769402388490/IMG_3460.png?width=666&height=677"
                  }
                request.send(JSON.stringify(params));
            });
          }
          function ShopifyCheckoutLog() {
            let username = "username";
            chrome.storage.sync.get("username", (userData) => {
                username = userData["username"];
                if (!username) {
                    console.log("No username is set");
                }
          Size = document.getElementsByClassName("product__description__variant order-summary__small-text")[0].innerHTML;
          Size = Size.split("<")[0];
          name = chosenProfile.name
          Price = document.getElementsByClassName("payment-due__price skeleton-while-loading--lg")[0].innerHTML;
          Image = document.getElementsByClassName("product-thumbnail__image")[0].src
          orderid = document.getElementsByClassName("os-order-number")[0].innerText
          orderid = orderid.split("#")
          orderid = "#"+orderid[1]
          const request = new XMLHttpRequest();
          request.open("POST", car.webhook);
          request.setRequestHeader('Content-type', 'application/json');

          let data = {
              "content": null,
              "embeds": [
                {
                  "title": "Shopify Checkout!",
                  "color": 4732533,
                  "fields": [
                    {
                      "name": "Product",
                      "value": product
                    },
                    {
                      "name": "Size",
                      "value": Size,
                      "inline": true
                    },
                    {
                      "name": "price",
                      "value": Price,
                      "inline": true
                    },
                    {
                      "name": "Profile",
                      "value": ` || ${name} ||`,
                      "inline": true
                    },
                    {
                      "name": "Order #",
                      "value": ` || ${orderid} ||`,
                      "inline": true
                    }
                  ],
                  "footer": {
                    "text": "Telios AIO v1.2.2",
                    "icon_url": "https://images-ext-1.discordapp.net/external/cy0voXUi49kVgrLZPaDK05fBT9qew1TVHGSuHEpSjx4/%3Fwidth%3D666%26height%3D677/https/media.discordapp.net/attachments/900467028559822889/934232769402388490/IMG_3460.png?width=665&height=676"
                  },
                  "thumbnail": {
                    "url": Image
                  },
                }
              ],
              "username": "Telio Success",
              "avatar_url": "https://media.discordapp.net/attachments/900467028559822889/934232769402388490/IMG_3460.png?width=666&height=677"
        }
        
          request.send(JSON.stringify(data));
    });
    }
    });
    
});
});