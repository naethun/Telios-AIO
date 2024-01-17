chrome.storage.sync.get('profiles', function (items) {
    items.profiles = JSON.parse(items.profiles)

    chrome.storage.sync.get('profileIndex', function (index) {
        index = (index.profileIndex);
        console.log(items.profiles[index])
        let chosenProfile = items.profiles[index];

        function shippingFill(){
            if (location.href.includes('/checkout-begin/?stage=shipping#shipping')) {

                console.log("Trying snipes")

                var email = chosenProfile.email;
                var firstName = chosenProfile.firstName;
                var lastName = chosenProfile.lastName;
                var addressLine1 = chosenProfile.address;
                var city = chosenProfile.city;
                var state = chosenProfile.state;
                var ZIP = chosenProfile.zipcode;
                var phone = chosenProfile.phone;

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
                
                if(document.getElementById("shippingEmail")){
                    document.getElementById("shippingEmail").value = email
                }
                if(document.querySelector('[name="dwfrm_shipping_shippingAddress_addressFields_firstName"]')){
                    document.querySelector('[name="dwfrm_shipping_shippingAddress_addressFields_firstName"]').value = firstName
                }
                if(document.querySelector('#shippingLastNamefbd32cb78d2edc00bc8aaa5e56')){
                    document.querySelector('#shippingLastNamefbd32cb78d2edc00bc8aaa5e56').value = lastName 
                }
                if(document.getElementById("shippingAddressOne")){
                  document.getElementById("shippingAddressOne").value = addressLine1  
                }
                if(document.getElementById("shippingAddressCity")){
                    document.getElementById("shippingAddressCity").value = city
                }
                if(document.getElementById("shippingState")){
                   document.getElementById("shippingState").value = state 
                }
                if(document.getElementById("shippingZipCode")){
                   document.getElementById("shippingZipCode").value = ZIP 
                }
                if(document.querySelector('[name="dwfrm_shipping_shippingAddress_addressFields_phone"]')){
                  changeInputs('[name="dwfrm_shipping_shippingAddress_addressFields_phone"]' , phone); 
                }
                if(document.getElementById("shippingEmail")){
                    document.getElementById("shippingEmail").value = email
                }
        }
    }

    function paymentFill(){
        var hug = 'true'
        
            setTimeout(() => {
                var cardNumber = chosenProfile.card.cardNumber; // Card Numbeer here
                var Year = chosenProfile.card.year; // Expiry Year 
                var month = chosenProfile.card.month; // Expiry Month
                var cvc = chosenProfile.card.cvv; // CVC here
                var cardName = chosenProfile.firstName + " " + chosenProfile.lastName; // Name

                var unwantedZero = "0"
                if( month.charAt(0) === '0'){
                    month = month.slice(1);
                }


                if(document.getElementById("cardNumber")){
                  document.getElementById("cardNumber").value = cardNumber  
                }
                if(document.getElementById("securityCode")){
                   document.getElementById("securityCode").value = cvc 
                }
                if(document.getElementById("expirationMonth")){
                   document.getElementById("expirationMonth").value = month 
                }
                if(document.getElementById("expirationYear")){
                  document.getElementById("expirationYear").value = '20' + Year    
                }
            }, 1000);

        
    }

        function submitorder(){
            if (location.href.includes('/checkout-begin/?stage=placeOrder#placeOrder')) {
                var classes = document.getElementsByClassName('nb-button button-primary place-order mt-0 w-100');
                var c = classes[0];
                c.click();  
            }
        }

         chrome.storage.sync.get("options", (data) => {
             let options = JSON.parse(data.options);
             options = options[9].features;
             console.log(options)
             if (!options) {
                 console.log("No options exist");
                 return;
             }

             if (options[0].value) {
                shippingFill();
                paymentFill();
                submitorder();
                 console.log("ACO activated");
             }
             if (options[1].value) {
                 shippingFill();
                 paymentFill();
                 console.log("autofill activated");
             }
        
         });
    });
});