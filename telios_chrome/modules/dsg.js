chrome.storage.sync.get('profiles', function (items) {    

    items.profiles = JSON.parse(items.profiles)
    
    chrome.storage.sync.get('profileIndex', function (index) {
        index = (index.profileIndex);
    
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
            },0)
            
            setTimeout(() => {
                //document.querySelectorAll('button')[2].innerText == "Purchase $10/m" ? document.querySelectorAll('button')[2].click() : false;
            },0)
            }
    
            function DSGautofill(){
    
                var DSGUSEmail = chosenProfile.email;
                var DSGUSFirstName = chosenProfile.firstName
                var DSGUSLastName = chosenProfile.lastName
                var DSGUSAddress = chosenProfile.address;
                var DSGUSCity = chosenProfile.city;
                var DSGUSPostalCode = chosenProfile.zipcode;
                var DSGUSPhone =chosenProfile.phone;
                var DSGUSState = chosenProfile.state;
                var DSGUSCardNumber = chosenProfile.card.cardNumber
                var DSGExpiryMonth = items.profiles[index].card.month;
                var DSGExpiryYear = items.profiles[index].card.year;
                var DSGUSCvc = chosenProfile.card.cvv;
    
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
                setInterval(() => {
                if (document.querySelector("[id='firstName']")) {
                    changeInputs("[id='firstName']", DSGUSFirstName);
                }
                if (document.querySelector("[id='lastName']")) {
                    changeInputs("[id='lastName']", DSGUSLastName);
                }
                if (document.querySelector('#email')) {
                    changeInputs('#email', DSGUSEmail);
                }
                if (document.querySelector('#phone')) {
                    changeInputs('#phone', DSGUSPhone);
                }
                if (document.querySelector("[id='mat-input-5']")) {
                    changeInputs("[id='mat-input-5']", DSGUSAddress);
                }
                if (document.querySelector('#mat-input-7')) {
                    changeInputs('#mat-input-7', DSGUSPostalCode);
                }
                if (document.querySelector("#encryptedCardNumber")) {
                    setTimeout(() => {
                        changeInputs('#encryptedCardNumber', DSGUSCardNumber);
                    }, 1000)
                }
                if (document.querySelector('#encryptedExpiryDate')) {
                    setTimeout(() => {
                        changeInputs('#encryptedExpiryDate', DSGExpiryMonth + DSGExpiryYear);
                    }, 1000)
                }
                if (document.querySelector('#encryptedSecurityCode')) {
                    setTimeout(() => {
                       changeInputs('#encryptedSecurityCode', DSGUSCvc); 
                    }, 1000);
                }
                }, 300);
    
            }
    
            function dsgACO(){
                if(document.querySelector("[variant='primary']")){
                    setTimeout(() =>{
                    document.querySelector("[variant='primary']").click();
                }, 1500); 
                }
                if(document.querySelector("[class='mat-radio-label']")){
                    setTimeout(() =>{
                    document.querySelector("[type='submit']") ?  document.querySelector("[type='submit']") : false;
                }, 2000); 
                }
                if(document.querySelector("[class='col-9']")){
                    setTimeout(() => {
                        location.href = "https://www.dickssportinggoods.com/DSGPaymentViewCmd"    
                    }, 25000)
                }
                if(document.querySelector('#placeOrder')){
                    setTimeout(() => {
                        document.querySelector('#placeOrder').click();
                    }, 1500);
                }
                
            }

    
    
    
    //---------------------------------------------------------------------------------------------------------------------------------------

            function dsgCheckoutLog() {
                let username = "username";
                chrome.storage.sync.get("username", (userData) => {
                    username = userData["username"];
                    if (!username) {
                        console.log("No username is set");
                    }
                      const request = new XMLHttpRequest();
                      Size = document.getElementsByClassName("grid-details details-text")[0].innerHTML;
                      Price = document.getElementsByClassName("grid-price details-text details-text--emphasized text-right pr-2")[0].innerHTML;
                      Image = document.getElementsByClassName("img-fluid mx-auto")[0].src
                      request.open("POST", "https://discord.com/api/webhooks/941985971740745741/i20dnggeEkSmvwuLKYY511CZFSq1Hc8KrhkdQkhl71rIkbQzc1uF39AkyF1jadB-6IaV");
                      request.setRequestHeader('Content-type', 'application/json');
                      product = document.getElementsByClassName("grid-description font-weight-bold details-text details-text--emphasized")[0].innerHTML;
    
                      const params = {
                        "content": null,
                          "embeds": [
                              {
                                "title": "DSG Checkout!",
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
    
    
            chrome.storage.sync.get("options", (data) => {
                let options = JSON.parse(data.options);
                console.log(options)
                options = options[6].features;
                console.log(options);
    
                if (options[0].value) {
                    cardFill();
                    setTimeout(() => {
                        dsgCheckoutLog();
                    }, 1200);
                    DSGautofill();
                    dsgACO();
                    console.log("ACO activated");
                }
                
                if (!options) {
                    console.log("No options exist");
                    return;
                } 
                if (options[1].value) {
                    cardFill();
                    DSGautofill();
                    console.log("autofill activated");
                }
            });
        });
    });