let webhooks = true
let websites = 2
function shopifyMonitorOn(){
  chrome.storage.sync.get('shopifydelay', function(data) {
    let delay = data.shopifydelay;
    chrome.storage.sync.get('shopifyKeyword', function(data) {
      console.log(data.shopifyKeyword + " " + data.shopifydelay);

      let productData = null;
      let keywords = data.shopifyKeyword;
      let keylist = keywords.split(",");
      console.log(keylist.length[1])
      let soo = true;
      g2f = '1';
      let headersList = {
        'Accept': '*/*',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36',
      };
  
      function sleep(delay) {
        return new Promise(res => setTimeout(res, delay));
      }
      function webhook() {
        setTimeout(() =>{
        let websites = location.href
        chrome.storage.sync.get('shopifyKeyword', function(datas) {
        chrome.storage.sync.get("signinData", function(data) {
            username = data.signinData
            keywords = datas.shopifyKeyword
            const myArray = username.split("~");
              let word = myArray[2];
              const request = new XMLHttpRequest();
              request.open("POST", "https://discord.com/api/webhooks/948442834279735307/iDWC7rhmNioZDFiJ9KGNGpDcdIllVPS-uOxTWcjitvj4zOLKt3YF0wFwe1sC0JAkEEhu");
              request.setRequestHeader('Content-type', 'application/json');
      
              const params = {
                "content": null,
                  "embeds": [
                      {
                        "title": "Shopify Monitor Started",
                        "color": 4732533,
                        "fields": [
                          {
                            "name": "Username",
                            "value": word
                          },
                          {
                            "name": "Keywords",
                            "value": keywords
                          },
                          {
                            "name": "Delay",
                            "value": delay
                          },
                          {
                            "name": "Site",
                            "value": websites
                          },
                          
                        ],
                        "footer": {
                          "text": "Telios  v1.2.2",
                          "icon_url": "https://media.discordapp.net/attachments/900467028559822889/934232769402388490/IMG_3460.png?width=666&height=677"
                        },
                      }
                    ],
                    "username": "Telios Monitors",
                    "avatar_url": "https://media.discordapp.net/attachments/900467028559822889/934232769402388490/IMG_3460.png?width=666&height=677"
              }
            request.send(JSON.stringify(params));
        });
      });
    }, 8050);
    }
      async function scan() {
        console.log('scanning');
        const json = await (await fetch(`https://${window.location.host}/products.json?limit=`+(Math.floor(Math.random() * 9999999999) + 250), {
          method: 'GET',
          headers: headersList,
        })).json();
        productData = json;
      }
      let item;
      let i = -1
      cars = keylist.length
      async function keycheck() {
        while (soo) {
          if (productData) {
            while(i<cars - 1){
              i++
            productData.products.forEach((product) => {
              if (product.title.toLowerCase().includes(keylist[i].toLowerCase())) {
                soo = false;
                item = product;
              }
            });
          }
        }
          await scan();
          await sleep(delay);
        }
        return item;
      }
  
      async function run() {
        if(webhooks = true){
        await  webhook();
        webhooks = false 
        }
        await scan();
        item = await keycheck()
        let website =  window.location.href
        website = website.split('/')
        location.href = website[0] + '/products/' + item.handle
        car = 
        websites = car + '/products/' + item.handle
        console.log('got it');
      }
      if(location.href.includes('/checkouts') || location.href.includes('/products') || location.href.includes('/www.bestbuy.com/')|| location.href.includes('/checkpoint'))
      {console.log('checkout page')
      } else {
      run();
      }
    });
  });
}




chrome.storage.sync.get('shopifyMonitor', function(data) {
  shopifyMonitor = data.shopifyMonitor;
  if (shopifyMonitor === "on"){
    console.log("SHOPIFY MONITOR ON");
      shopifyMonitorOn();
      iziToast.show({
        title: "Telios AIO",
        message: 'Shopify Monitor Started',theme: 'dark', position: 'topRight',
        color: 'purple',image: 'https://cdn.discordapp.com/attachments/941851097809702983/951661608894103572/Png_1.png',
    });
      console.log("SHOPIFY MONITOR ON");
  } else { 
      console.log("SHOPIFY MONITOR OFF")
  }
  if(shopifyMonitor = "on"){
   
  }
});