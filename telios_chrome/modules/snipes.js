chrome.storage.sync.get('profiles', function (items) {
    items.profiles = JSON.parse(items.profiles)

    chrome.storage.sync.get('profileIndex', function (index) {
        index = (index.profileIndex);
        console.log(items.profiles[index])
        let chosenProfile = items.profiles[index];

        function shippingFill(){
            if (location.href.includes('/checkout?stage=shipping#shipping')) {

                console.log("Trying snipes")

                var email = chosenProfile.email;
                var firstName = chosenProfile.firstName;
                var lastName = chosenProfile.lastName;
                var addressLine1 = chosenProfile.address;
                var city = chosenProfile.city;
                var state = chosenProfile.state;
                var ZIP = chosenProfile.zipcode;
                var phone = chosenProfile.phone;
            

                document.getElementById("email-default").value = email
                document.getElementById("shippingFirstNamedefault").value = firstName
                document.getElementById("shippingLastNamedefault").value = lastName
                document.getElementById("shippingAddressOnedefault").value = addressLine1
                document.getElementById("shippingAddressCitydefault").value = city
                document.getElementById("shippingStatedefault").value = state
                document.getElementById("shippingZipCodedefault").value = ZIP
                document.getElementById("shippingPhoneNumberdefault").value = phone
                var classes = document.getElementsByClassName('btn btn-primary btn-block submit-shipping');
                var c = classes[0];
                c.click();   
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


                document.getElementById("cardOwner").value = cardName
                document.getElementById("cardNumber").value = cardNumber
                document.getElementById("securityCode").value = cvc
                document.getElementById("expirationMonth").value = month
                document.getElementById("expirationYear").value = '20' + Year  
                document.getElementById("cardOwner").click()
                var classes = document.getElementsByClassName('btn btn-primary btn-block submit-payment');
                var c = classes[0];
                c.click();  
            }, 1000);

        
    }

        function submitorder(){
            if (location.href.includes('/checkout?stage=placeOrder#placeOrder')) {
                var classes = document.getElementsByClassName('btn btn-primary btn-block place-order');
                var c = classes[0];
                c.click();  
            }
        }

        chrome.storage.sync.get("options", (data) => {
            let options = JSON.parse(data.options);
            options = options[7].features;
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