chrome.storage.sync.get('profiles', function (items) {
    items.profiles = JSON.parse(items.profiles)

    chrome.storage.sync.get('profileIndex', function (index) {
        index = (index.profileIndex);
        console.log(items.profiles[index])
        let chosenProfile = items.profiles[index];


        function shippingFill(){
            setTimeout(() => {
            if (location.href.includes('/store/checkout/shipping')) {

                console.log("Trying finishline")

                var email = chosenProfile.email;
                var firstName = chosenProfile.firstName;
                var lastName = chosenProfile.lastName;
                var addressLine1 = chosenProfile.address;
                var city = chosenProfile.city;
                var state = chosenProfile.state;
                var ZIP = chosenProfile.zipcode;
                var phone = chosenProfile.phone;
            

                document.getElementById("email").value = email
                document.getElementById("firstName").value = firstName
                document.getElementById("shippingLastName").value = lastName
                document.getElementById("shippingAddress1").value = addressLine1;
                document.getElementById("shippingCity").value = city
                document.getElementById("shippingState").value = state
                document.getElementById("shippingZip").value = ZIP
                document.getElementById("shippingPhone").value = phone
                document.getElementById("shippingContinueButton").click();
            }
            }, 1000);
            
    }

    function paymentFill(){
            setTimeout(() => {
                
                var cardNumber = chosenProfile.card.cardNumber; // Card Numbeer here
                var Year = chosenProfile.card.year; // Expiry Year 
                var month = chosenProfile.card.month; // Expiry Month
                var cvc = chosenProfile.card.cvv; // CVC here
                var cardName = chosenProfile.firstName + " " + chosenProfile.lastName; // Name


                document.getElementById("billingCardNumber").value = cardNumber
                document.getElementById("billingSecurityCode").value = cvc
                document.getElementById("billingExpirationMonth").value = month
                document.getElementById("billingExpirationYear").value = '20' + Year  
                document.getElementById("billingContinueButton").click();
            }, 2000);
        
    }

        function submitorder(){
            setTimeout(() => {
            document.getElementById("submitOrder").click();
        }, 1000);
        }

         chrome.storage.sync.get("options", (data) => {
             let options = JSON.parse(data.options);
             options = options[8].features;
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