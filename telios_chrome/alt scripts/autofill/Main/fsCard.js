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

        var fillById = (name, info) => {
          let element = document.getElementById(name);
          element.focus();
          var isFocused = document.activeElement === element;
          if (!isFocused) setTimeout(fillById.bind(null, name, info), 200);
          element.value = info;
          let event = new Event("input", { bubbles: true });
          let tracker = element._valueTracker;
          if (tracker) {
            tracker.setValue(info);
          }
          element.blur();
          element.dispatchEvent(event);
        };

        var checkIdsLoaded = ids => {
          for (let i = 0; i < ids.length; i++) {
            if (document.getElementById(ids[i]) == null) {
              return false;
            } else {
              try {
                let element = document.getElementById(ids[i]);
                var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")
                  .set;
                nativeInputValueSetter.call(element, "test");
              } catch {
                return false;
              }
            }
          }
          return true;
        };

        var fillCard = () => {
          try {
            fillById("encryptedCardNumber", userBilling.cardNumber);
            // fillById("encryptedExpiryDate", "03/23");
            fillById("encryptedExpiryMonth", userBilling.cardMonth);
            fillById("encryptedExpiryYear", `${userBilling.cardYear.toString().substr(2, 2)}`);
            fillById("encryptedSecurityCode", userBilling.cvv);
          } catch {
            setTimeout(fillCard, 200);
          }
        };

        fillCard();
      })();
    }
  }
);
