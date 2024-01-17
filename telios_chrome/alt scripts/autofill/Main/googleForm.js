let userInfo;
let userBilling;
let userSettings;

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
    if (data.isValidKey === true && data.enabledScripts.google && data.enabledScripts.all) {
      (async () => {
        userInfo = data.shippingProfiles.find(profile => profile.shippingId === data.selectedShippingProfile);
        userBilling = data.billingProfiles.find(profile => profile.billingId === data.selectedBillingProfile);
        userSettings = data.userSettings;
        autofill();
      })();
    }
  }
);

function autofill() {
  var elements = document.querySelectorAll("[aria-labelledby]");

  for (let i = 0; i < elements.length; i++) {
    if (elements[i].tagName === "INPUT") {
      fillInput(elements[i].getAttribute("aria-labelledby"));
    } else if (elements[i].tagName === "TEXTAREA") {
      fillTextArea(elements[i].getAttribute("aria-labelledby"));
    } else if (elements[i].tagName === "DIV") {
      document.getElementById(elements[i].getAttribute("aria-labelledby")).innerText;
      console.log(elements[i]);
      fillInsideDiv(document.getElementById(elements[i].getAttribute("aria-labelledby")).innerText, elements[i]);
    }
  }

  fillTypes();
}

function fillInput(labelId) {
  var label = document.getElementById(labelId).innerText.toLowerCase();
  var element = document.querySelector(`[aria-labelledby="${labelId}"]`);

  if (label.includes("name")) {
    element.value = userBilling.cardName;
  } else if (label.includes("email")) {
    element.value = userInfo.email;
  } else if (label.includes("address")) {
    element.value = `${userInfo.address}, ${userInfo.address2}`;
  } else if (label.includes("phone") || label.includes("tel")) {
    element.value = userInfo.telephone;
  } else if (label.includes("postcode") || label.includes("zip") || label.includes("post")) {
    element.value = userInfo.zip;
  } else if (label.includes("card") || (label.includes("cc") && label.includes("number"))) {
    element.value = userBilling.cardNumber;
  } else if (label.includes("cvv")) {
    element.value = userBilling.cvv;
  } else if (label.includes("expiry") || (label.includes("cc") && label.includes("exp"))) {
    element.value = `${userBilling.cardMonth} / ${userBilling.cardYear.slice(-2)}`;
  } else if (label.includes("state")) {
    element.value = userInfo.state;
  } else if (label.includes("city")) {
    element.value = userInfo.city;
  }
  let event = new Event("input", { target: element, bubbles: true });
  event.simulated = true;
  element.dispatchEvent(event);
}

function fillTextArea(labelId) {
  var label = document.getElementById(labelId).innerText.toLowerCase();
  var element = document.querySelector(`[aria-labelledby="${labelId}"]`);

  if (label.includes("name")) {
    element.innerText = userBilling.cardName;
  } else if (label.includes("email")) {
    element.innerText = userInfo.email;
  } else if (label.includes("address")) {
    element.innerText = `${userInfo.address}, ${userInfo.address2}`;
  } else if (label.includes("phone") || label.includes("tel")) {
    element.innerText = userInfo.telephone;
  } else if (label.includes("postcode") || label.includes("zip") || label.includes("post")) {
    element.innerText = userInfo.zip;
  } else if (label.includes("card") || (label.includes("cc") && label.includes("number"))) {
    element.innerText = userBilling.cardNumber;
  } else if (label.includes("cvv")) {
    element.innerText = userBilling.cvv;
  } else if (label.includes("expiry") || (label.includes("cc") && label.includes("exp"))) {
    element.innerText = `${userBilling.cardMonth} / ${userBilling.cardYear.slice(-2)}`;
  } else if (label.includes("state")) {
    element.value = userInfo.state;
  } else if (label.includes("city")) {
    element.value = userInfo.city;
  }
  let event = new Event("input", { target: element, bubbles: true });
  event.simulated = true;
  element.dispatchEvent(event);
}

function fillTypes() {
  var query = document.querySelectorAll('[type="email"]');
  for (let i = 0; i < query.length; i++) {
    query[i].value = "teste1234@gmail.com";
    let event = new Event("input", { target: query[i], bubbles: true });
    event.simulated = true;
    query[i].dispatchEvent(event);
  }
}

function fillInsideDiv(label, parent) {
  label = label.toLowerCase();
  console.log(label);
  if (label.includes("date")) {
    console.log("date");
    var elements = parent.getElementsByTagName("input");
    for (let i = 0; i < elements.length; i++) {
      elements[i].value = "2021-03-12"; //yyyy-MM-dd
      console.log(elements[i].value);
      let event = new Event("input", { target: elements[i], bubbles: true });
      event.simulated = true;
      elements[i].dispatchEvent(event);
    }
  }
}
