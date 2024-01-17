//let userBilling;
//let userSettings;

window.onload = function() {
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
      if (data.isValidKey === true && data.enabledScripts.shopify) {
        console.log("Shopify is enabled")
        //userBilling = data.shippingProfiles.find(profile => profile.shippingId === data.selectedShippingProfile);
        userBilling = data.billingProfiles.find(profile => profile.billingId === data.selectedBillingProfile);
        userSettings = data.userSettings;

        if (currentStepp() == "contact_information") {
          console.log("DETAILS PAGE")
          let fields = {
            '[name="checkout[email_or_phone]"]': userBilling.email,
            '[name="checkout[email]"]': userBilling.email,
            "#checkout_email": userBilling.email,
            "#checkout_email_or_phone": userBilling.email,
            "#checkout_shipping_address_first_name": userBilling.firstName,
            "#checkout_shipping_address_last_name": userBilling.lastName,
            "#checkout_shipping_address_address1": userBilling.address,
            "#checkout_shipping_address_address2": userBilling.address2,
            "#checkout_shipping_address_city": userBilling.city,
            "#checkout_shipping_address_zip": userBilling.zip,
            "#checkout_shipping_address_phone": userBilling.telephone,
            "#checkout_billing_address_first_name": userBilling.firstName,
            "#checkout_billing_address_last_name": userBilling.lastName,
            "#checkout_billing_address_address1": userBilling.address,
            "#checkout_billing_address_address2": userBilling.address2,
            "#checkout_billing_address_city": userBilling.city,
            "#checkout_billing_address_zip": userBilling.zip,
            "#checkout_billing_address_phone": userBilling.telephone
          };

          Object.keys(fields).forEach(id => {
            fillField(id, fields[id]);
          });

          fillField("#checkout_shipping_address_country", userBilling.country, true);
          fillField("#checkout_shipping_address_province", userBilling.state, true);

          fillField("#checkout_billing_address_country", userBilling.country, true);
          fillField("#checkout_billing_address_province", userBilling.state, true);

          if (data.enabledScripts.sACO) {
            if (!hasCaptcha()) {
              continueToNextStep();
            }
          }
        } else if (currentStepp() == "shipping_method") {
          console.log("ok")
          if (data.enabledScripts.sACO) {
            continueToNextStep();
          }
        } else {
          console.log("CARD PAGE")
          fill("cc-number", userBilling.cardNumber);
          fill("cardnumber", userBilling.cardNumber);
          fill("number", userBilling.cardNumber);

          fill("cc-name", userBilling.cardName);
          fill("name", userBilling.cardName);
          fill("'Name on card'", userBilling.cardName);

          fill("exp-date", `${userBilling.cardMonth} / ${userBilling.cardYear.slice(-2)}`);
          fill("expiry", `${userBilling.cardMonth} / ${userBilling.cardYear.slice(-2)}`);
          fill("cardExpiry", `${userBilling.cardMonth} / ${userBilling.cardYear.slice(-2)}`);

          fill("cardCvc", userBilling.cvv);
          fill("cvc", userBilling.cvv);
          fill("verification_value", userBilling.cvv);
          fill("cardnumber", userBilling.cardNumber);
          fill("number", userBilling.cardNumber);

          fill("exp-date", `${userBilling.cardMonth} / ${userBilling.cardYear.slice(-2)}`);
          fill("expiry", `${userBilling.cardMonth} / ${userBilling.cardYear.slice(-2)}`);
          fill("cardExpiry", `${userBilling.cardMonth} / ${userBilling.cardYear.slice(-2)}`);

          fill("cardCvc", userBilling.cvv);
          fill("cvc", userBilling.cvv);
          fill("verification_value", userBilling.cvv);

          function finishcheckout() {
            let completeCheckout = setInterval(() => {
              if (document.querySelector(".step__footer__continue-btn") != null) {
                document.querySelector(".step__footer__continue-btn").click();
                clearInterval(completeCheckout);
              }
            }, 1000);
          }
          console.log(userSettings)
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
    }
  );
};

const currentStepp = () => {
  let element = document.querySelector("[data-step]");
  return element.dataset.step;
};

function fillField(id, value, select = false) {
  let element = document.querySelector(id);
  if (element) {
    element.focus();
    element.value = value;
    element.dispatchEvent(new Event("change"));
    element.blur();
  }
}

function fill(name, value) {
  let ele = document.getElementsByName(name)[0];
  if (ele) {
    ele.dispatchEvent(new FocusEvent("focus", { bubbles: true }));
    ele.value = value;
    ele.dispatchEvent(new Event("input", { target: ele, bubbles: true }));
    ele.dispatchEvent(new Event("change", { target: ele, bubbles: true }));
    ele.dispatchEvent(new FocusEvent("blur", { bubbles: true }));
  }

  ele = document.getElementById(name);
  if (ele) {
    ele.dispatchEvent(new FocusEvent("focus", { bubbles: true }));
    ele.value = value;
    ele.dispatchEvent(new Event("input", { target: ele, bubbles: true }));
    ele.dispatchEvent(new Event("change", { target: ele, bubbles: true }));
    ele.dispatchEvent(new FocusEvent("blur", { bubbles: true }));
  }

  ele = document.getElementsByClassName(name)[0];
  if (ele) {
    ele.dispatchEvent(new FocusEvent("focus", { bubbles: true }));
    ele.value = value;
    ele.dispatchEvent(new Event("input", { target: ele, bubbles: true }));
    ele.dispatchEvent(new Event("change", { target: ele, bubbles: true }));
    ele.dispatchEvent(new FocusEvent("blur", { bubbles: true }));
  }

  elems = document.querySelectorAll(`[placeholder=${name}]`);
  elems.forEach(function(ele) {
    if (ele) {
      ele.dispatchEvent(new FocusEvent("focus", { bubbles: true }));
      ele.value = value;
      ele.dispatchEvent(new Event("input", { target: ele, bubbles: true }));
      ele.dispatchEvent(new Event("change", { target: ele, bubbles: true }));
      ele.dispatchEvent(new FocusEvent("blur", { bubbles: true }));
    }
  });

  elems = document.querySelectorAll(`[autocomplete=${name}]`);
  elems.forEach(function(ele) {
    if (ele) {
      ele.dispatchEvent(new FocusEvent("focus", { bubbles: true }));
      ele.value = value;
      ele.dispatchEvent(new Event("input", { target: ele, bubbles: true }));
      ele.dispatchEvent(new Event("change", { target: ele, bubbles: true }));
      ele.dispatchEvent(new FocusEvent("blur", { bubbles: true }));
    }
  });
}

function hasCaptcha() {
  return document.getElementById("g-recaptcha");
}

function continueToNextStep() {
  let continueButton = document.querySelector(".step__footer__continue-btn");
  continueButton.click();
}
