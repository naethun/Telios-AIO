
chrome.storage.sync.get('profiles', function (items) {


    items.profiles = JSON.parse(items.profiles)

    chrome.storage.sync.get('profileIndex', function (index) {
        index = (index.profileIndex);


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
                number: items.profiles[index].card.cardNumber,
                name: items.profiles[index].card.name,
                expiry: items.profiles[index].card.expiration,
                verification_value: items.profiles[index].card.cvv,
                cardNumber: items.profiles[index].card.cardNumber,
                cardExpiry: items.profiles[index].card.expiration,
                cardCvc: items.profiles[index].card.cvv,
                postalCode: items.profiles[index].card.zip
            };

            console.log("Card Inputs: ");
            console.log(card_inputs.number);

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

            setTimeout(() => {
                //document.querySelectorAll('button')[2].innerText == "Purchase $10/m" ? document.querySelectorAll('button')[2].click() : false;
            }, 0)
        }

        function gamestopAutofill() {
            var gamestopEmail = items.profiles[index].email;
            var gamestopFirstName = items.profiles[index].firstName
            var gamestopLastName = items.profiles[index].lastName
            var gamestopNumber = items.profiles[index].phone;
            var gamestopAddress = items.profiles[index].address;
            var gamestopCity = items.profiles[index].city;
            var gamestopPostalCode = items.profiles[index].zipcode;
            var gamestopState = items.profiles[index].state;
            var gamestopCardNumber = items.profiles[index].card.cardNumber;
            var gamestopExpiryMonth = items.profiles[index].card.month;
            var gamestopExpiryYear = items.profiles[index].card.year;
            var gamestopCvc = items.profiles[index].card.cvv;
            console.log("GAMESTOP EMAIL BELOW:")
            console.log(gamestopEmail)
            try {
                document.getElementById("shippingFirstName").value = gamestopFirstName
                document.getElementById("shippingLastName").value = gamestopLastName
                document.getElementById("shippingAddressOne").value = gamestopAddress
                document.getElementById("shippingAddressCity").value = gamestopCity
                document.getElementById("shippingState").value = gamestopState
                document.getElementById("shippingPhoneNumber").value = gamestopNumber
                document.getElementById("shipping-email").value = gamestopEmail
                document.getElementById("shippingZipCode").value = gamestopPostalCode
                document.getElementById("cardNumber").value = gamestopCardNumber
                document.getElementById("expirationMonthYear").value = gamestopExpiryMonth + "/" + gamestopExpiryYear
                document.getElementById("securityCode").value = gamestopCvc
            } catch {
                console.log("not a gamestop page")
            }
            chrome.storage.sync.get("options", (data) => {
                let options = data.options;
                if (!options) {
                    console.log("No options exist");
                    return;
                }
                if (options.finishPayment) {
                    gamestopACO();
                }
            });
        }


        function gamestopACO() {
            if (document.querySelector('.checkout-btn')) {
                setTimeout(() => {
                    document.querySelector('.checkout-btn').click();
                }, 250);
            }
            if (document.querySelector('.checkout-as-guest')) {
                setTimeout(() => {
                    document.querySelector('.checkout-as-guest').click();
                }, 250);
            }
            if (document.querySelector('.submit-shipping-address')) {
                setTimeout(() => {
                    document.querySelector('.submit-shipping-address').click();
                }, 250);
            }
            if (document.querySelector("[name='submit-payment']")) {
                setTimeout(() => {
                    document.querySelector("[name='submit-payment']").click();
                }, 250);
            }
            if (document.querySelector("[name='submit']")) {
                setTimeout(() => {
                    document.querySelector("[name='submit']").click();
                }, 250);
            }
            if(document.querySelector("[value='place-order']")){
                setTimeout(() => {
                    document.querySelector("[value='place-order']").click();
                }, 1200);
            }
        }
//----------------------------------------------------------------------------------------------------------------------------------------

function gamestopCheckoutLog(){
    let username = "username";
    chrome.storage.sync.get("username", (userData) => {
        username = userData["username"];
        if (!username) {
            console.log("No username is set");
        }
          const request = new XMLHttpRequest();
          Price = document.getElementsByClassName("text-right grand-total")[0].innerHTML;
          Image = document.getElementsByClassName("product-image")[0].src
          request.open("POST", "https://discord.com/api/webhooks/941985971740745741/i20dnggeEkSmvwuLKYY511CZFSq1Hc8KrhkdQkhl71rIkbQzc1uF39AkyF1jadB-6IaV");
          request.setRequestHeader('Content-type', 'application/json');
          product = document.getElementsByClassName("line-item-name col-9 p-0")[0].innerHTML;

          product = product.replace("</span>", " ");
          product = product.replace("<span>", " ");


          const params = {
            "content": null,
              "embeds": [
                  {
                    "title": "Gamestop Checkout!",
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

        chrome.storage.sync.get("options", (data) => {
            let options = JSON.parse(data.options);
            console.log(options)
            options = options[2].features;
            console.log(options);
            if (!options) {
                console.log("No options exist");
                return;
            }

            if (options[0].value) {
                cardFill();
                gamestopAutofill();
                gamestopACO();
                if (document.querySelector("[class='checkout-place-order-label']")) {
                    setTimeout(() => {gamestopCheckoutLog();}, 1000)
                }
                console.log("ACO activated");
            }
            if (options[1].value) {
                cardFill();
                gamestopAutofill();
                console.log("autofill activated");
            }
        });
    });
});