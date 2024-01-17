chrome.storage.sync.get('profiles', function (items) {
    items.profiles = JSON.parse(items.profiles)

    chrome.storage.sync.get('profileIndex', function (index) {
        index = (index.profileIndex);
        console.log(items.profiles[index])

        let chosenProfile = items.profiles[index];

function supremeAutofill(){
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

    var supremeName = chosenProfile.firstName + " " + chosenProfile.lastName;
    var supremeMail = chosenProfile.email;
    var supremePhone = chosenProfile.phone;
    var supremeAddress = chosenProfile.address;
    var supremeCity = chosenProfile.city;
    var supremePostal = chosenProfile.zipcode;
    var supremeCountryCode = chosenProfile.country;
    var supremeCardNumber = chosenProfile.card.cardNumber;
    var supremeState = chosenProfile.state;
    var supremeMonthExpiry = chosenProfile.card.month;
    var supremeYearExpiry =  '20' + chosenProfile.card.year;
    var supremeCVV =  chosenProfile.card.cvv;

    if( supremeCountryCode == "US" || supremeCountryCode == "us" || supremeCountryCode == "Us"){
        supremeCountryCode = "USA"
    }
    if( supremeCountryCode == "CA" || supremeCountryCode == "ca" || supremeCountryCode == "Ca"){
        supremeCountryCode = "CANADA"
    }

    document.querySelector('#order_billing_name') ? changeInputs('#order_billing_name', supremeName) : false;
    document.querySelector('#order_email') ? changeInputs('#order_email', supremeMail) : false;
    document.querySelector('#order_billing_state') ? changeInputs('#order_tel', supremePhone) : false;
    document.querySelector('#order_billing_address') ? changeInputs('#order_billing_address', supremeAddress) : false;
    document.querySelector('#order_billing_city') ? changeInputs('#order_billing_city', supremeCity) : false;
    document.querySelector('#order_billing_city') ? changeInputs('#order_billing_zip', supremePostal) : false;
    document.querySelector('#order_billing_country') ? changeInputs('#order_billing_country', supremeCountryCode) : false;
    document.querySelector('#credit_card_number') ? changeInputs('#credit_card_number', supremeCardNumber) : false;

  setTimeout(() => {
    if(document.querySelector('#order_billing_state')){
      var supremeStateSelect = document.querySelector('#order_billing_state');
      for(i=0;i<supremeStateSelect.length;i++){
        supremeStateSelect[i].value == supremeState ? changeInputs('#order_billing_state',supremeState) : false;
      }
  }
  }, 755);

    if(document.querySelector('#order_billing_country')){
        var supremeCountrySelect = document.querySelector('#order_billing_country');
        for(i=0;i<supremeCountrySelect.length;i++){
            supremeCountrySelect[i].value == supremeCountryCode ? changeInputs('#order_billing_country',supremeCountryCode) : false;
        }
    }

    if(document.querySelector('#credit_card_month')){
        var supremeCardSelect = document.querySelector('#credit_card_month');
        for(i=0;i<supremeCardSelect.length;i++){
            supremeCardSelect[i].value == supremeMonthExpiry ? changeInputs('#credit_card_month',supremeMonthExpiry) : false;
            }
    }

    if(document.querySelector('#credit_card_year')){
        var supremeYearSelect = document.querySelector('#credit_card_year');
        for(i=0;i<supremeYearSelect.length;i++){
            supremeYearSelect[i].value == supremeYearExpiry ? changeInputs('#credit_card_year',supremeYearExpiry) : false;
            }
    }

    if (document.querySelector('#credit_card_verification_value')) {
        changeInputs('#credit_card_verification_value', supremeCVV);
        document.getElementsByClassName('iCheck-helper')[1].click();
    }
    if (document.querySelector('#order_terms')) {
      var checkbox = document.querySelector('#order_terms');
      checkbox.checked = true;
      checkbox.parentElement.classList.add('checked');
  }

}

function SupremeACO(){
    setTimeout(() => {
        document.querySelector('.checkout').click();
    }, 3100);
}
function supCheckoutLog() {
    let username = "username";
    chrome.storage.sync.get("username", (userData) => {
        username = userData["username"];
        if (!username) {
            console.log("No username is set");
        }
          const request = new XMLHttpRequest();
        Size = document.getElementsByClassName("cart-description")[0].innerHTML;
         const myArray = Size.split(':');
        Size = myArray[2]
          Price = document.getElementsByClassName("field")[0].innerHTML;
          Image = document.getElementsByClassName("cart-image")[0].src
          request.open("POST", "https://discord.com/api/webhooks/941985971740745741/i20dnggeEkSmvwuLKYY511CZFSq1Hc8KrhkdQkhl71rIkbQzc1uF39AkyF1jadB-6IaV");
          request.setRequestHeader('Content-type', 'application/json');
          product = document.getElementsByClassName("grid-description font-weight-bold details-text details-text--emphasized")[0].innerHTML;

          const params = {
            "content": null,
              "embeds": [
                  {
                    "title": "Supreme Checkout!",
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
    options = options[5].features;
    console.log(options);
    if (!options) {
        console.log("No options exist");
        return;
    }

    if (options[0].value) {
      if(location.href.includes('https://www.supremenewyork.com/checkout')){
        supremeAutofill();
        SupremeACO();
        supCheckoutLog();
        console.log("ACO activated");
    }
    }
    if (options[1].value) {
      if(location.href.includes('https://www.supremenewyork.com/checkout')){
        supremeAutofill();
        supCheckoutLog();
        console.log("autofill activated");
    }
    }
});
});
});
