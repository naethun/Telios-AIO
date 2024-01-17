let userBilling;
let userSettings;

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
    async function(data) {
      if (data.isValidKey === true && data.enabledScripts.link) {
        console.log("Link Appender is enabled")
        //userBilling = data.shippingProfiles.find(profile => profile.shippingId === data.selectedShippingProfile);
        userBilling = data.billingProfiles.find(profile => profile.billingId === data.selectedBillingProfile);
        userSettings = data.userSettings;

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        var t = document.createElement("textarea");
        t.setAttribute("type", "hidden");
        document.body.appendChild(t);
        t.focus();
        document.execCommand("paste");
        var orginalClipboardText = t.value; //this is your clipboard data
        var clipboardText = t.value;
        console.log("Got OG ClipBoard")
        console.log(orginalClipboardText)

        while (clipboardText == orginalClipboardText) {
            await sleep(400);
            var t = document.createElement("textarea");
            t.setAttribute("type", "hidden");
            document.body.appendChild(t);
            t.focus();
            document.execCommand("paste");
            var clipboardText = t.value;
            console.log(clipboardText)
        }
        
        console.log("Redirecting")
        location.href = clipboardText


      }
    })
}