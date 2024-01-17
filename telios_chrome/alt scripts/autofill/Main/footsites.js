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
    if (data.isValidKey === true && data.enabledScripts.footsites && data.enabledScripts.all) {
      (async () => {
        const userInfo = data.shippingProfiles.find(profile => profile.shippingId === data.selectedShippingProfile);
        const userBilling = data.billingProfiles.find(profile => profile.billingId === data.selectedBillingProfile);
        const userSettings = data.userSettings;

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

        //shipping info

        let autofill = setInterval(() => {
          try {
            fill("firstName", userInfo.firstName);
            fill("lastName", userInfo.lastName);
            fill("line1", userInfo.address);
            fill("shippingAddress1", userInfo.address);
            fill("line2", userInfo.address2);

            fill("town", userInfo.city);
            fill("shippingZip", userInfo.zip);
            fill("postalCode", userInfo.zip);
            fill("region", userInfo.state);
            fill("phone", userInfo.telephone);
            fill("email", userInfo.email);

            fill("billingCardNumber", userBilling.cardNumber);
            fill("billingExpirationMonth", userBilling.cardMonth);
            fill("billingExpirationYear", userBilling.cardYear);
            fill("billingSecurityCode", userBilling.cvv);
            // clearInterval(autofill);
          } catch (error) {}
        }, 300);
      })();
    }
  }
);
