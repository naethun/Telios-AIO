





  chrome.storage.sync.get('profiles', function (items) {
    items.profiles = JSON.parse(items.profiles)

    chrome.storage.sync.get('profileIndex', function (index) {
        index = (index.profileIndex);
        console.log(items.profiles[index])
        let chosenProfile = items.profiles[index];

    function cardFill(){
        const changeInput = (input, value) => {
            let lastInput = input.value;
            input.value = value;
        
            let event = new Event("input", { bubbles: true });
            input.simulated = true;
        
            let event2 = new Event("change", { bubbles: true });
            input.simulated = true;
        
            let tracker = input._valueTracker;
            if(tracker){
                tracker.setValue(lastValue);
            }
            input.dispatchEvent(event)
            input.dispatchEvent(event2)
        };
        
        const card_inputs = {
            number: chosenProfile.card.cardNumber,
            name: chosenProfile.card.fullName,
            expiry: chosenProfile.card.expiry,
            verification_value: chosenProfile.card.cvv,
            cardNumber: chosenProfile.card.cardNumber,
            cardExpiry: chosenProfile.card.expiry,
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
        },250)
        
        setTimeout(() => {
            //document.querySelectorAll('button')[2].innerText == "Purchase $10/m" ? document.querySelectorAll('button')[2].click() : false;
        },270)
        }

        

        function shopifyAutoFill(){			
            var email = chosenProfile.email;
            var cardNumber = chosenProfile.card.cardNumber;
            
            var cvc =chosenProfile.card.cvv;
            var firstName = chosenProfile.firstName
            var lastName = chosenProfile.lastName
            var countryCode = chosenProfile.country;
            var ZIP = chosenProfile.zipcode;
            var addressLine1 = chosenProfile.address;
            var city = chosenProfile.city;
            var state = chosenProfile.state;
            var phone = chosenProfile.phone;
            var monthYear = items.profiles[index].card.month + "/" + items.profiles[index].card.year;

            function changeInputs(element, value) {
				try {
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
				} catch { }
            }
            
            
            setTimeout(() => {
				document.querySelector('#email') ? changeInputs('#email', email) : false;
				document.querySelector('#checkout_email_or_phone') ? changeInputs('#checkout_email_or_phone', email) : false;
				document.querySelector('#number') ? changeInputs('#number', cardNumber) : false;
				document.querySelector('#number') ? changeInputs('#cardNumber', cardNumber) : false;
				document.querySelector('#expiry') ? changeInputs('#expiry', monthYear) : false;
				document.querySelector('#expiry') ? changeInputs('#cardExpiry', monthYear) : false;
				document.querySelector('#verification_value') ? changeInputs('#verification_value', cvc) : false;
				document.querySelector('#cardCvc') ? changeInputs('#cardCvc', cvc) : false;
				document.querySelector('#billingAddressLine1') ? changeInputs('#billingAddressLine1', addressLine1) : false;
				document.querySelector('#TextField2') ? changeInputs('#TextField2', addressLine1) : false;
				document.querySelector('#checkout_billing_address_address1') ? changeInputs('#checkout_billing_address_address1', addressLine1) : false;
				document.querySelector('#billingLocality') ? changeInputs('#billingLocality', city) : false;
				document.querySelector('#TextField4') ? changeInputs('#TextField4', city) : false;
				document.querySelector('#checkout_billing_address_city') ? changeInputs('#checkout_billing_address_city', city) : false;
				document.querySelector('#billingName') ? changeInputs('#billingName', firstName +" "+ lastName) : false;
				document.querySelector('#TextField0') ? changeInputs('#TextField0', firstName +" "+ lastName) : false;
        document.querySelector('#shippingName') ? changeInputs('#shippingName', firstName +" "+ lastName) : false;
        document.querySelector('#shippingAddressLine1') ? changeInputs('#shippingAddressLine1', addressLine1) : false;
        document.querySelector('#shippingLocality') ? changeInputs('#shippingLocality', city) : false;
        document.querySelector('#shippingPostalCode') ? changeInputs('#shippingPostalCode', ZIP) : false;
        document.querySelector('#shippingAdministrativeArea') ? changeInputs('#shippingAdministrativeArea', state) : false;

				document.querySelector('#checkout_billing_address_first_name') ? changeInputs('#checkout_billing_address_first_name', cardName.split(' ')[0]) : false;
                try { document.querySelector('#checkout_billing_address_province') ? changeInputs('#checkout_billing_address_province', state) : false; } catch { }
                document.querySelector('#billingCountry') ? changeInputs('#billingCountry', countryCode) : false;
                document.querySelector('#checkout_billing_address_country') ? changeInputs('#checkout_billing_address_country', countryCode) : false;
                document.querySelector('#billingPostalCode') ? changeInputs('#billingPostalCode' , ZIP) : false;

                if(document.getElementById("name")){
                    changeInputs('#name', firstName + " " + lastName);
                }
                
                if(document.querySelector("[name='exp-date']")){
                    changeInputs("[name='exp-date']", monthYear);
                }

                if (document.querySelector("[id='cardExpiry']")) {
                    console.log("Found expiry!", document.querySelector("[id='cardExpirye']"));
                    changeInputs("[id='cardExpiry']", monthYear);
                }

                if(document.querySelector('cardExpiry')){
                    document.querySelector('cardExpiry'). value = chosenProfile.card.month + "/" + chosenProfile.card.year;
                }

                if (document.querySelector("[name='postal']")) {
                    console.log("Found zip!", document.querySelector("[name='postal']"));
                    changeInputs("[name='postal']", ZIP);
                }


            }, 250);
        }
        
        function stripeAutofill(){
            var email = chosenProfile.emailAddress; // Put your email here
            var firstName = chosenProfile.firstName; // Name
            var lastName = chosenProfile.lastName;
            var country = chosenProfile.country; // Put the full name of the country here, make sure each word is in capital letters like so: United States
            var ZIP = chosenProfile.zip; // Post or Zip code here
            var address = chosenProfile.address; // address here
            var city = chosenProfile.city; // City
            var state = chosenProfile.state; // If the country is united states it will ask for the state, you can get the ISO code from here(make sure to exclude US-): https://en.wikipedia.org/wiki/ISO_3166-2:US
            var Phone = chosenProfile.phoneNumber; // Phone number here
            
            
            
            
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

            setTimeout(() => {
                document.querySelector('#checkout_email') ? changeInputs('#checkout_email', email) : false;
                /*document.querySelector('#cardNumber') ? changeInputs('#cardNumber', cardNumber) : false('no card input detected');
                document.querySelector('#cardExpiry') ? changeInputs('#cardExpiry', monthYear) : false('no cardExpiry input detected');
                document.querySelector('#cardCvc') ? changeInputs('#cardCvc', cvc) : false('no cvc input detected');*/
                document.querySelector('#checkout_shipping_address_first_name') ? changeInputs('#checkout_shipping_address_first_name', firstName) : false;
                document.querySelector('#checkout_shipping_address_last_name') ? changeInputs('#checkout_shipping_address_last_name', lastName) : false;
                document.querySelector('#checkout_shipping_address_address1') ? changeInputs('#checkout_shipping_address_address1', address) : false;
                if (document.querySelector('#checkout_shipping_address_city')) {
                    changeInputs('#checkout_shipping_address_city', city);

                }
                
                if(document.querySelector('#checkout_shipping_address_country')){
                    var countrySelect = document.querySelector('#checkout_shipping_address_country');
                    for(i=0;i<countrySelect.length;i++){
                        countrySelect[i].value == country ? changeInputs('#checkout_shipping_address_country',country) : false;
                        }
                }
                if(document.querySelector('#checkout_shipping_address_province')){
                    var stateSelect = document.querySelector('#checkout_shipping_address_province');
                    for(i=0;i<stateSelect.length;i++){
                        stateSelect[i].value == state ? changeInputs('#checkout_shipping_address_province',state) : false;
                    }
                }
                document.querySelector('#checkout_shipping_address_zip') ? changeInputs('#checkout_shipping_address_zip', ZIP) : false;
                document.querySelector('#checkout_shipping_address_phone') ? changeInputs('#checkout_shipping_address_phone', Phone) : false;
            }, 250);
        }

        
        function stripeCheckout(){
            setTimeout(() => {
                document.querySelector('.SubmitButton') ? document.querySelector('.SubmitButton').click() : false;
            }, 500);


            if (document.getElementById("purchase")){
                setTimeout(() => {
                    document.getElementById("purchase").click();   
                }, 500)
            }

            //tl
            setTimeout(() => {
                if(document.querySelector('.sumr__restock-button')){
                    document.querySelector('.sumr__restock-button') ? document.querySelector('.sumr__restock-button').click() : false;
                    let d = document.getElementsByClassName("sumr__restock-dialog-submit-button")[0];
                    if (d) {
                        d.click();
                    }                 
                }
            }, 1000)

    }


    


    //------------------------------------------------------------------------------------------------------------------------------

    function hyperCheckoutLog(){
        let username = "username";
        chrome.storage.sync.get("username", (userData) => {
            username = userData["username"];
            if (!username) {
                console.log("No username is set");
            }
              const request = new XMLHttpRequest();
              Price = document.getElementsByClassName("text-black dark:text-white text-3xl font-bold !text-opacity-100")[0].innerHTML;
              request.open("POST", "https://discord.com/api/webhooks/941985971740745741/i20dnggeEkSmvwuLKYY511CZFSq1Hc8KrhkdQkhl71rIkbQzc1uF39AkyF1jadB-6IaV");
              request.setRequestHeader('Content-type', 'application/json');
              product = document.getElementsByClassName("text-black dark:text-white text-lg !text-opacity-100")[0].innerHTML;
    
    
              const params = {
                "content": null,
                  "embeds": [
                      {
                        "title": "Hyper (Stripe) Checkout!",
                        "color": 4732533,
                        "fields": [
                          {
                            "name": "Product",
                            "value": product
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
                        "thumbnail":{
                            "url": "https://cdn.discordapp.com/attachments/941851097809702983/942606351685787678/7dyt81wW_400x400.png"
                        }
                      }
                    ],
                    "username": "Telio Success",
                    "avatar_url": "https://media.discordapp.net/attachments/900467028559822889/934232769402388490/IMG_3460.png?width=666&height=677"
              }
            request.send(JSON.stringify(params));
        });
        
    }
    function TLCheckoutLog(){
        let username = "username";
        chrome.storage.sync.get("username", (userData) => {
            username = userData["username"];
            if (!username) {
                console.log("No username is set");
            }
              const request = new XMLHttpRequest();
              Image = document.getElementsByClassName("rounded-circle")[0].src
              request.open("POST", "https://discord.com/api/webhooks/941985971740745741/i20dnggeEkSmvwuLKYY511CZFSq1Hc8KrhkdQkhl71rIkbQzc1uF39AkyF1jadB-6IaV");
              request.setRequestHeader('Content-type', 'application/json');
              product = document.getElementsByClassName("clientname text-white")[0].innerHTML;
              product = product.replace("&nbsp;&nbsp;", " ");

              const params = {
                "content": null,
                  "embeds": [
                      {
                        "title": "TL Dash (Stripe) Checkout!",
                        "color": 4732533,
                        "fields": [
                          {
                            "name": "Product",
                            "value": product
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
    function WhopCheckoutLog(){
        let username = "username";
        chrome.storage.sync.get("username", (userData) => {
            username = userData["username"];
            if (!username) {
                console.log("No username is set");
            }
              const request = new XMLHttpRequest();
              Image = document.getElementsByClassName("ProductSelectionCompanyInfo_avatar__qATbG")[0].src
              request.open("POST", "https://discord.com/api/webhooks/941985971740745741/i20dnggeEkSmvwuLKYY511CZFSq1Hc8KrhkdQkhl71rIkbQzc1uF39AkyF1jadB-6IaV");
              request.setRequestHeader('Content-type', 'application/json');
              product = document.getElementsByClassName("ProductSelection_title__QWE5q")[0].innerHTML;

              const params = {
                "content": null,
                  "embeds": [
                      {
                        "title": "Whop (Stripe) Checkout!",
                        "color": 4732533,
                        "fields": [
                          {
                            "name": "Product",
                            "value": product
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
    function StripeCheckoutLog(){
        let username = "username";
        chrome.storage.sync.get("username", (userData) => {
            username = userData["username"];
            if (!username) {
                console.log("No username is set");
            }
              const request = new XMLHttpRequest();
              request.open("POST", "https://discord.com/api/webhooks/941985971740745741/i20dnggeEkSmvwuLKYY511CZFSq1Hc8KrhkdQkhl71rIkbQzc1uF39AkyF1jadB-6IaV");
              request.setRequestHeader('Content-type', 'application/json');
              product = document.getElementsByClassName("ProductSummary-name Text Text-color--gray500 Text-fontSize--16 Text-fontWeight--500")[0].innerHTML;
              price = document.getElementsByClassName("ProductSummary-totalAmount Text Text-color--default Text-fontWeight--600 Text--tabularNumbers")[0].innerHTML;

              const params = {
                "content": null,
                  "embeds": [
                      {
                        "title": "Stripe Checkout!",
                        "color": 4732533,
                        "fields": [
                          {
                            "name": "Product",
                            "value": product
                          },
                          {
                            "name": "Price",
                            "value": price,
                            "inline": true
                          }
                        ],
                        "footer": {
                          "text": "Telios  v1.2.2",
                          "icon_url": "https://media.discordapp.net/attachments/900467028559822889/934232769402388490/IMG_3460.png?width=666&height=677"
                        },
                        "thumbnail": {
                          "url": "https://jotformapps.s3.amazonaws.com/156362680544445564115_Stripe.png"
                        }
                      }
                    ],
                    "username": "Telio Success",
                    "avatar_url": "https://media.discordapp.net/attachments/900467028559822889/934232769402388490/IMG_3460.png?width=666&height=677"
              }
            request.send(JSON.stringify(params));
        });
        
    }

        chrome.storage.sync.get("options", (data) => {
            let options = JSON.parse(data.options);
            options = options[4].features;
            if (!options) {
                console.log("No options exist");
                return;
            }
    
            if (options[0].value) {
                cardFill();
                shopifyAutoFill();
                if (document.querySelector("[class='text-black dark:text-white text-3xl font-bold !text-opacity-100']")) {
                    setTimeout(() => {hyperCheckoutLog();}, 500)
                }
                if (document.querySelector("[class='navbar-brand']")) {
                    setTimeout(() => {TLCheckoutLog();}, 2000)
                }
                if (document.querySelector("[class='ProductSelectionCompanyInfo_header__2pOE5']")) {
                    setTimeout(() => {WhopCheckoutLog();}, 500)
                }
                if (document.querySelector("[class='ProductSummary-name Text Text-color--gray500 Text-fontSize--16 Text-fontWeight--500']")) {
                    setTimeout(() => {StripeCheckoutLog();}, 100)
                }
                stripeCheckout(); 
                stripeAutofill();
                console.log("ACO activated");
            }
            if (options[1].value) {
                cardFill();
                shopifyAutoFill();
                stripeAutofill();
                console.log("autofill activated");
            }
        });
});
  });