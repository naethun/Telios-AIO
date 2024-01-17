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
      if (data.isValidKey === true && data.enabledScripts.supreme && data.enabledScripts.all) {
        (async () => {
          const userInfo = data.shippingProfiles.find(profile => profile.shippingId === data.selectedShippingProfile);
          const userBilling = data.billingProfiles.find(profile => profile.billingId === data.selectedBillingProfile);
          const userSettings = data.userSettings;
  
          //Checkout time
          let startTime = new Date().getTime();
          let endTime = 0;
  
          let delay = 2000;
  
          function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms || delay));
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
  
          //Autofill
          console.log("AUTOFILL STARTED");
          fill("email", userInfo.email);
          await sleep(500);
          fill("name", userInfo.firstName + " " + userInfo.lastName);
          await sleep(50);
          //document.querySelector("#__next > div.min-h-screen.flex.flex-col.justify-center.sm\:px-6 > div > div > div > div:nth-child(2) > form > button").click();
          //await sleep(0);
          console.log(document.getElementsByTagName("button"))
          document.getElementsByTagName("button")[0].click()
  
          /*document.getElementsByClassName("icheckbox_minimal")[1].focus();
          document.getElementsByClassName("icheckbox_minimal")[1].click();
          await sleep();
  
          //Checks out the product if the autoCheckout == true
          if (userSettings.autoCheckout) {
            document.querySelector("#__next > div.min-h-screen.flex.flex-col.justify-center.sm\:px-6 > div > div > div > div:nth-child(2) > form > button").click();
          }*/
  
          endTime = new Date().getTime();
          console.log(`checkout complete. checkout time: ${endTime - startTime}ms`);
        })();
      }
    }
  );