var Price = 0
var Image = 0
var product = 0
chrome.storage.sync.get('profiles', function (items) {
    console.log(JSON.parse(items.profiles));
    

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

        function bestbuyCA(){
            var bestbuyCAEmail = chosenProfile.email;
            var bestbuyCAFirstName = chosenProfile.firstName
            var bestbuyCALastName = chosenProfile.lastName
            var bestbuyCAAddress = chosenProfile.address;
            var bestbuyCACity = chosenProfile.city;
            var bestbuyCAPostalCode = chosenProfile.zipcode;
            var bestbuyCAPhone =chosenProfile.phone;
            var bestbuyCAState = chosenProfile.state;

            if(bestbuyCAState == 'Alberta' || bestbuyCAState =='ab' || bestbuyCAState == 'alberta'){
                bestbuyCAState = 'AB'
            }
            
            if(bestbuyCAState == 'british Columbia' || bestbuyCAState == 'British Columbia' || bestbuyCAState == 'bc'){
                bestbuyCAState = 'BC'
            }
            
            if(bestbuyCAState == 'Manitoba' || bestbuyCAState == 'manitoba' || bestbuyCAState == 'mb'){
                bestbuyCAState = 'MB'
            }
            
            if(bestbuyCAState == 'New Brunswick' || bestbuyCAState == 'new brunswick' || bestbuyCAState == 'nb' ){
                bestbuyCAState = 'NB'
            }
            
            if(bestbuyCAState == 'newfoundland' || bestbuyCAState == 'Newfoundland'|| bestbuyCAState == 'nl' || bestbuyCAState == 'Labrador' || bestbuyCAState == 'labrador'){
                bestbuyCAState = 'NL'
            }
            
            if(bestbuyCAState == 'Nova Scotia' || bestbuyCAState == 'nova scotia' || bestbuyCAState == 'ns'){
                bestbuyCAState = 'NS'
            }
            if(bestbuyCAState == 'Northwest Territories' || bestbuyCAState == 'northwest territories' || bestbuyCAState == 'nt'){
                bestbuyCAState = 'NT'
            }
            if(bestbuyCAState == 'Nunavut' || bestbuyCAState == 'nunavut' || bestbuyCAState == 'nu' ){
                bestbuyCAState = 'NU'
            }
            
            if(bestbuyCAState == 'Ontario' || bestbuyCAState == 'ontario'|| bestbuyCAState == 'on' ){
                bestbuyCAState = 'ON'
            }
            
            if(bestbuyCAState == 'Prince Edward Island' || bestbuyCAState == 'prince edward island' || bestbuyCAState == 'pe'){
                bestbuyCAState = 'NS'
            }
            if(bestbuyCAState == 'Northwest Territories' || bestbuyCAState == 'northwest territories' || bestbuyCAState == 'nt'){
                bestbuyCAState = 'PE'
            }
            if(bestbuyCAState == 'Nunavut' || bestbuyCAState == 'nunavut' || bestbuyCAState == 'nu' ){
               bestbuyCAState = 'NU'
            }
            
            if(bestbuyCAState == 'Quebec' || bestbuyCAState == 'quebec'|| bestbuyCAState == 'qc' ){
                bestbuyCAState = 'QC'
            }
            
            if(bestbuyCAState == 'Saskatchewan' || bestbuyCAState == 'saskatchewan' || bestbuyCAState == 'sk'){
                bestbuyCAState = 'Sk'
            }
            if(bestbuyCAState == 'Yukon' || bestbuyCAState == 'yukon' || bestbuyCAState == 'yt'){
                bestbuyCAState = 'YT'
            }
            var bestbuyCACardNumber = chosenProfile.card.cardNumber
            var bestBuyCAExpiryMonth = items.profiles[index].card.month;
            var bestBuyCAExpiryYear = "20" + items.profiles[index].card.year;
            var bestbuyCAUSCvc = chosenProfile.card.cvv;

            var unwantedZero = "0"
            if( bestBuyCAExpiryMonth.charAt(0) === '0'){
                bestBuyCAExpiryMonth = bestBuyCAExpiryMonth.slice(1);
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
            setInterval(() => {
            if (document.querySelector('#email')){

                changeInputs('#email', bestbuyCAEmail);
            }
            if (document.querySelector('#postalCode')){
                changeInputs('#postalCode', bestbuyCAPostalCode);
            }
            if (document.querySelector('#firstName')){
                changeInputs('#firstName', bestbuyCAFirstName);
            }
            if(document.querySelector('#lastName')){
                changeInputs('#lastName', bestbuyCALastName);  
            }
            if(document.querySelector('#phoneNumber')){
               changeInputs('#phoneNumber', bestbuyCAPhone) 
            }
            if(document.querySelector('#addressLine1')){
                changeInputs('#addressLine1', bestbuyCAAddress)
            }
            if(document.querySelector('#city')){
                changeInputs('#city', bestbuyCACity)
            }
            if(document.querySelector("[name='regionCode']")){
                var bestBuyStateSelect = document.querySelector("[name='regionCode']");
                for(i=0;i<bestBuyStateSelect.length;i++){
                    bestBuyStateSelect[i].value == bestbuyCAState ? changeInputs("[name='regionCode']",bestbuyCAState) : false;
                    }
            }
            if(document.querySelector('#shownCardNumber')){
                changeInputs('#shownCardNumber', bestbuyCACardNumber)
            }

            if(document.querySelector('#expirationMonth')){
                var bestBuyMonthSelect = document.querySelector('#expirationMonth');
                for(i=0;i<bestBuyMonthSelect.length;i++){
                    bestBuyMonthSelect[i].value == bestBuyCAExpiryMonth ? changeInputs('#expirationMonth',bestBuyCAExpiryMonth) : false;
                    }
            }
        
            if(document.querySelector('#expirationYear')){
                var bestBuyYearSelect = document.querySelector('#expirationYear');
                for(i=0;i<bestBuyYearSelect.length;i++){
                    bestBuyYearSelect[i].value == bestBuyCAExpiryYear ? changeInputs('#expirationYear',bestBuyCAExpiryYear) : false;
                    }
            }
            if(document.querySelector('#cvv')){
                changeInputs('#cvv', bestbuyCAUSCvc)
            }
        }, 350)
        }


        function bestbuyCAACO(){
            setInterval(() => {
                setTimeout(() => {
                            document.getElementsByClassName("continue-to-review")[0] ? document.getElementsByClassName("continue-to-review")[0].click() : false;
                            let interval = setInterval(() => {
                                if (document.getElementsByClassName("order-now")[0]) {
                                    document.getElementsByClassName("order-now")[0].click()
                                    clearInterval(interval);
                                }
                            }, 500)
                }, 500)
                document.getElementsByClassName("continue-to-payment")[0] ? document.getElementsByClassName("continue-to-payment")[0].click() : false;   
            }, 500);

            
        }
        function find(){
            if(location.href =='https://www.bestbuy.ca/checkout/?qit=1#/en-ca/review'){
            console.log('ye')
            Price = document.getElementsByClassName("price on-sale")[0].innerHTML;
                  Image = document.getElementsByClassName("thumbnail ")[0].src
                  product = document.getElementsByClassName("name")[0].innerHTML;
        }}

        function bestbuyCACheckoutLog(){
            let username = "username";
            chrome.storage.sync.get("username", (userData) => {
                username = userData["username"];
                if (!username) {
                    console.log("No username is set");
                }
                  const request = new XMLHttpRequest();
                  request.open("POST", "https://discord.com/api/webhooks/942620888476553216/YgqjHEnIxEKjFnK_ZJp-6ADlEqykZij0_8Kc_8IU7M2DwILKPlXrTaU7vHEsyBAKUuTV");
                  request.setRequestHeader('Content-type', 'application/json');

                  const params = {
                    "content": null,
                      "embeds": [
                          {
                            "title": "BestBuy CA Checkout!",
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
            options = options[1].features;
            console.log(options);
            if (!options) {
                console.log("No options exist");
                return;
            }
async function option0(){
    await cardFill();
    await bestbuyCA();
    await  find();
    await bestbuyCAACO();
    await setTimeout(() => {bestbuyCACheckoutLog();}, 500)
}
async function option1(){
                await cardFill();
                await  find();
                await bestbuyCA();
                await  find();
                await setTimeout(() => {bestbuyCACheckoutLog(Price,Image,product);}, 500)
}
            if (options[0].value) {
                option0()
                console.log("ACO activated");
            }
            if (options[1].value) {
                option1()
                console.log("autofill activated");
            }
        });
    });

});
