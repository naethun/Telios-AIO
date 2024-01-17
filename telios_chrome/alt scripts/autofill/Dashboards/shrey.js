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
      if (data.isValidKey === true && data.enabledScripts.shrey) {
        const userBilling = data.billingProfiles.find(profile => profile.billingId === data.selectedBillingProfile);
        const userSettings = data.userSettings; 
        await sleep(350);
        console.log("Clicking shrey Purchase Button");
        click("btn btn-branded btn-sm pl-3 pr-3 pt-2 pb-2 text-center mt-2");
        click("btn")
        await sleep(500);
        click("Purchase");
        click("purchase");
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms || delay));
          }
  
        function click(name) {
            ele = document.getElementsByName(name)[0];
            if (ele) {
                ele.click()
              }
  
            ele = document.getElementById(name);
            if (ele) {
              ele.click()
            }
  
            ele = document.getElementsByClassName(name)[0];
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