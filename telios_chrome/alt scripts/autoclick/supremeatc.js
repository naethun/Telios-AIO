window.onload = () => {
  chrome.storage.local.get(['supSize', 'supremeSizeId'], result => {
    if ((result.supSize == '' || result.supSize == undefined)) {
      document.querySelector('input[name="commit"]').click();
      setTimeout(function() {
        window.location = "https://www.supremenewyork.com/checkout";
      }, 500);
    } else {
      var sizeSel = document.getElementById('size');
      if (sizeSel === null) sizeSel = document.getElementById('s');
      if (sizeSel !== null) {
          sizeSel.value = result.supremeSizeId;
          document.querySelector('input[name="commit"]').click();
          setTimeout(function() {
            window.location = "https://www.supremenewyork.com/checkout";
          }, 500);
      } else {
          setTimeout(atc.bind(null, result.supremeSizeId), 500);
      }
    }
  });
}