window.onload = function () {
	chrome.storage.sync.set({ isValidKey: true }, function() {});
    chrome.storage.sync.get(
        [
        "shippingProfiles",
        "selectedShippingProfile",
        "billingProfiles",
        "selectedBillingProfile",
        "userSettings",
        "isValidKey",
        "enabledScripts"
        ],
        function(data) {
        console.log(data.isValidKey)
        console.log(data.enabledScripts.shopify)
        if (data.isValidKey === true && data.enabledScripts.shopify) {
            console.log("STARTING SHOPIFY AUTOFILL")
            userBilling = data.billingProfiles.find(profile => profile.billingId === data.selectedBillingProfile);
            userSettings = data.userSettings;
            enabledScripts = data.enabledScripts;

            if (userBilling) {
                let fields = {
                    'number': userBilling.cardNumber,
                    'name': userBilling.firstName + " " + userBilling.lastName,
                    'expiry': `${userBilling.cardMonth}/${userBilling.cardYear.slice(-2)}`,
                    'verification_value': userBilling.cvv,
                }

                Object.keys(fields).forEach(id => {
                    fillField(id, fields[id]);
                });

                function finishcheckout() {
                    let completeCheckout = setInterval(() => {
                      if (document.querySelector(".step__footer__continue-btn") != null) {
                        document.querySelector(".step__footer__continue-btn").click();
                        clearInterval(completeCheckout);
                      }
                    }, 1000);
                  }
                  if (data.enabledScripts.sSUBMIT) {
                    if (userSettings.delay == 0 || userSettings.delay == null) {
                      finishcheckout();
                    } else {
                      setTimeout(finish => {
                        finishcheckout();
                      }, userSettings.delay);
                    }
                  }
            }
    }
});
}

function fillField(id, value) {
let element = document.getElementById(id);
if (element) {
    element.dispatchEvent(new FocusEvent("focus", { bubbles: true }));
    element.value = value;
    element.dispatchEvent(new Event("input", { target: element, bubbles: true }));
    element.dispatchEvent(new Event("change", { target: element, bubbles: true }));
    element.dispatchEvent(new FocusEvent("blur", { bubbles: true }));
}
}