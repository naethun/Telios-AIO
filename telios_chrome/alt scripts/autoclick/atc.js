chrome.storage.sync.get(["userSettings", "enabledScripts"], function(item) {
  var path = window.location.pathname;
  var page = path.split("/").pop();
  //console.log(page)
  if (page == "loginform.html") {
    console.log("notlogin")
  } else {
    const userSettings = item.userSettings;
  if (
    document.getElementsByClassName("btn product-form__cart-submit btn--secondary-accent") !== null && item.enabledScripts.sATC
  ) {
    let url = location.href.includes("?") ? location.href.split("?")[0] + ".json" : location.href + ".json";

    fetch(url)
      .then(response => {
        console.log(url);
        console.log("TEST");
        return response.json();
      })
      .then(data => {
        let variantid = data.product.variants[0].id;
        let newURL = location.hostname;
        let ATCURL = newURL + "/cart/" + variantid + ":" + "1";
        console.log("ATCURLBELOW");
        console.log(ATCURL);
        location.href = "/cart/" + variantid + ":" + "1";//https://www.radarproxies.com/51712557222/checkouts/788abe77be8dc5df2c136fb8f38de793?skip_shopify_pay=true&locale=en
        console.log(location.href);
      });
  }
  }
  
});
