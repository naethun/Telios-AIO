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

        function bestbuy(){

            var bestbuyUSEmail = chosenProfile.email;
            var bestbuyUSFirstName = chosenProfile.firstName
            var bestbuyUSLastName = chosenProfile.lastName
            var bestbuyUSAddress = chosenProfile.address;
            var bestbuyUSCity = chosenProfile.city;
            var bestbuyUSPostalCode = chosenProfile.zipcode;
            var bestbuyUSPhone =chosenProfile.phone;
            var bestbuyUSState = chosenProfile.state;
            var bestbuyUSCardNumber = chosenProfile.card.cardNumber
            var bestBuyExpiryMonth = items.profiles[index].card.month;
            var bestBuyExpiryYear = "20" + items.profiles[index].card.year;
            var bestbuyUSCvc = chosenProfile.card.cvv;

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
            if (document.querySelector("[id='user.emailAddress']")) {
                changeInputs("[id='user.emailAddress']", bestbuyUSEmail);
            }
            if (document.querySelector("[id='user.phone']")) {
                changeInputs("[id='user.phone']", bestbuyUSPhone);
            }

        
            if (document.querySelector('#optimized-cc-card-number')) {
                changeInputs('#optimized-cc-card-number', bestbuyUSCardNumber);
            }
            if(document.querySelector("[name='expiration-month']")){
                var bestBuyMonthSelect = document.querySelector("[name='expiration-month']");
                for(i=0;i<bestBuyMonthSelect.length;i++){
                    bestBuyMonthSelect[i].value == bestBuyExpiryMonth ? changeInputs("[name='expiration-month']",bestBuyExpiryMonth) : false;
                    }
            }
            if(document.querySelector("[name = 'expiration-year']")){
                var bestBuyYearSelect = document.querySelector("[name = 'expiration-year']");
                for(i=0;i<bestBuyYearSelect.length;i++){
                    bestBuyYearSelect[i].value == bestBuyExpiryYear ? changeInputs("[name = 'expiration-year']",bestBuyExpiryYear) : false;
                    }
            }
            if (document.querySelector('#credit-card-cvv')) {
                changeInputs('#credit-card-cvv', bestbuyUSCvc);
            }
            if (document.querySelector("[name='firstName']")) {
                changeInputs("[name='firstName']", bestbuyUSFirstName);
            }
            if (document.querySelector('#lastName')) {
                changeInputs('#lastName', bestbuyUSLastName);
            }
            if (document.querySelector('#street')) {
                changeInputs('#street', bestbuyUSAddress);
            }
            if (document.querySelector('#zipcode')) {
                changeInputs('#zipcode', bestbuyUSPostalCode);
            }
            if (document.querySelector("[name='state']")) {
                changeInputs("[name='state']", bestbuyUSState);
            }
            if (document.querySelector("[name='city']")) {
                changeInputs("[name='city']", bestbuyUSCity);
            }
            }, 300);

        }

        function bestbuyACO(){
            setTimeout(() => {
                if(document.querySelector("[class='btn btn-lg btn-block btn-primary']")){
                    setTimeout(() =>{
                        document.querySelector("[class='btn btn-lg btn-block btn-primary']").click();
                    }, 1500); 
                }    
            }, 1000);

            if(document.querySelector("[class='btn btn-lg btn-block btn-secondary']")){
                setTimeout(() =>{
                document.querySelector("[class='btn btn-lg btn-block btn-secondary']").click();
            }, 550); 
            }
            if(document.querySelector('#optimized-cc-card-number')){
                document.querySelector("[class='btn btn-lg btn-block btn-primary']").click() ? document.querySelector("[class='btn btn-lg btn-block btn-primary']").click() : false;
            } 
            
        }



//---------------------------------------------------------------------------------------------------------------------------------------


        function bestbuyUSCheckoutLog(){
            let username = "username";
            chrome.storage.sync.get("username", (userData) => {
                username = userData["username"];
                if (!username) {
                    console.log("No username is set");
                }
                  const request = new XMLHttpRequest();
                  Price = document.getElementsByClassName("cash-money")[0].innerHTML;
                  Image = document.getElementsByClassName("item-list__image-content")[0].src
                  request.open("POST", "https://discord.com/api/webhooks/942620888476553216/YgqjHEnIxEKjFnK_ZJp-6ADlEqykZij0_8Kc_8IU7M2DwILKPlXrTaU7vHEsyBAKUuTV");
                  request.setRequestHeader('Content-type', 'application/json');
                  product = document.getElementsByClassName("item-list__spacer text-left item-list__title")[0].innerHTML;

                  const params = {
                    "content": null,
                      "embeds": [
                          {
                            "title": "BestBuy US Checkout!",
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
            options = options[0].features;
            console.log(options);

            if (options[0].value) {
                cardFill();
                bestbuy();
                if (document.querySelector("[class='item-list__image-content']")) {
                    setTimeout(() => {bestbuyUSCheckoutLog();}, 500)
                }
                bestbuyACO();
                console.log("ACO activated");
            }
            
            if (!options) {
                console.log("No options exist");
                return;
            } 
            if (options[1].value) {
                cardFill();
                bestbuy();
                console.log("autofill activated");
            }
        });
    });
});