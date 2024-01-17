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
    async function(data) {
      if (data.isValidKey === true && data.enabledScripts.discord) {
        const userBilling = data.billingProfiles.find(profile => profile.billingId === data.selectedBillingProfile);
        const userSettings = data.userSettings; 
        await sleep(300);
        console.log("Clicking Discord Auth Button");
        click("button-38aScr")
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms || delay));
          }
  
        function click(name) {
            ele = document.getElementsByName(name)[1];
            if (ele) {
                ele.click()
              }
  
            ele = document.getElementById(name);
            if (ele) {
              ele.click()
            }
  
            ele = document.getElementsByClassName(name)[1];
            if (ele) {
              ele.click()
            }
  
            elems = document.querySelectorAll(`[placeholder=${name}]`);
            elems.forEach(function(ele) {
              if (ele) {
                ele.click()
              }
            });
  
            elems = document.querySelectorAll(`[autocomplete=${name}]`);
            elems.forEach(function(ele) {
              if (ele) {
                ele.click()
              }
            });
  
            elems = document.querySelectorAll(`[data-elements-stable-field-name=${name}]`);
            elems.forEach(function(ele) {
              if (ele) {
                ele.click()
              }
            });
        }
  
      }
    })