function BestbuyUSMonitorOn(){
  chrome.storage.sync.get('bbdelay', function(data) {
    let delays = data.bbdelay;
    chrome.storage.sync.get('bbKeyword', function(data) {
      let datas = null;
      let soo0 = true;
      let sku = data.bbKeyword;
      let headers = {
          'authority': 'www.bestbuy.com',
          'pragma': 'no-cache',
          'cache-control': 'no-cache',
          'upgrade-insecure-requests': '1',
          'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
          'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
          'sec-fetch-site': 'none',
          'sec-fetch-mode': 'navigate',
          'sec-fetch-user': '?1',
          'sec-fetch-dest': 'document',
          'accept-language': 'en-US,en;q=0.9',
          'Cookie': 'UID=b5d1a076-57ab-4ccf-8c0f-d9009d590169; pst2=588|N; oid=488954692; vt=fd76350b-3ce2-11eb-be65-121fe65aa3d5; CTT=67c011be4d769cb28467a8702e9f9c6e; SID=4f6a54e1-c268-4c4c-89fe-6e193ad18357; optimizelyEndUserId=oeu1607823118997r0.46213488756067034; rxVisitor=1607823119040VN3G5R4D1T4DGH4CBEJJ671C4CO46C7J; COM_TEST_FIX=2020-12-13T01%3A31%3A59.961Z; locDestZip=26501; locStoreId=832; sc-location-v2=%7B%22meta%22%3A%7B%22CreatedAt%22%3A%222020-12-13T01%3A32%3A02.645Z%22%2C%22ModifiedAt%22%3A%222020-12-13T01%3A32%3A03.467Z%22%2C%22ExpiresAt%22%3A%222021-12-13T01%3A32%3A03.467Z%22%7D%2C%22value%22%3A%22%7B%5C%22physical%5C%22%3A%7B%5C%22zipCode%5C%22%3A%5C%2226501%5C%22%2C%5C%22source%5C%22%3A%5C%22A%5C%22%2C%5C%22captureTime%5C%22%3A%5C%222020-12-13T01%3A32%3A02.645Z%5C%22%7D%2C%5C%22destination%5C%22%3A%7B%5C%22zipCode%5C%22%3A%5C%2226501%5C%22%7D%2C%5C%22store%5C%22%3A%7B%5C%22storeId%5C%22%3A832%2C%5C%22zipCode%5C%22%3A%5C%2226501%5C%22%2C%5C%22storeHydratedCaptureTime%5C%22%3A%5C%222020-12-13T01%3A32%3A03.466Z%5C%22%7D%7D%22%7D; partner=212%261%262020-12-12+19%3a32%3a03.000; dtCookie=v_4_srv_9_sn_C2I98A5FVDC2F8QNRHUBT1KR3QQHSMGM_app-3A1b02c17e3de73d2a_1_ol_0_perc_100000_mul_1; c6db37d7c8add47f1af93cf219c2c682=628232e5d88b0aa13219638ca8559caa; basketTimestamp=1607899376307; physical_dma=508; customerZipCode=26501|N; bby_rdp=l; dtSa=-; rxvt=1609861331340|1609859457419; dtPC=9$59527927_386h-vHGKKECHHOAFVTRSVPIFRBOAPISVREPCD-0e5; dtLatC=158; _abck=6985DEBF82A60338B3BF46B12BB9EED9~-1~YAAQJA8kF1kqeHJ2AQAAPb1z1AUuWYyv4imsXbLQw1rDI0pTO+Lhm09+lFE6ZwtCAmJ0cwP28EEqw5DRQRUrQXttBy1Lgb+RxlHU+VjpwonKPqerFKfM2qBqrYXz65nghxn7bgo+y6GcUFkfuRZNdc8wf51mWwHhBU3LWsmAvwjq/RODvFex2IzL32XDY89V9+6r8k0fKurBSn8jNghoZ606vprm8isw3ywmvggXVjBtep3IA77pSHbPpG1ji7fdF6HRxzTsf+6/3/K009sXiy9vO+jZcunb+r/PE2nK/Z53Ohd7p2pEAuiqFVjBWMNz2OtX4IYWEHy4jZ393zTYYjToxKyMRpY=~0~-1~-1; bm_sz=BC6B0EE71448F215FF4E0CEF09F68D89~YAAQJA8kF1gqeHJ2AQAAPb1z1ApFjHkYMlgHbUL/A18dQWkDgfCClTElQPcazWNsYtJJcc0PIz2IBavCpTVgeffsB5zMNfjkAE7gOxXjvzK42Sl0I3sEhAKHoAviAbg3CaG/f+t7wqtDzwGxMTXV22yBrQlzbn1fnDz92tyTINPtiEYR8yWn9T4isXBl1NuF7w==; bby_cbc_lb=p-browse-e'
      };

      function webhook() {
        let websites = location.href
        chrome.storage.sync.get("signinData", function(data) {
            username = data.signinData
            const myArray = username.split("~");
              let word = myArray[2];
              const request = new XMLHttpRequest();
              request.open("POST", "https://discord.com/api/webhooks/948715949522059334/XYAfW4t9yaYMQS_cVu5KjVqiSnpJx3OrfKnFqNyoSDBrEGATM16tYWRu2gioA-rSBWj7");
              request.setRequestHeader('Content-type', 'application/json');
      
              const params = {
                "content": null,
                  "embeds": [
                      {
                        "title": "Bestbuy Monitor Started",
                        "color": 4732533,
                        "fields": [
                          {
                            "name": "Username",
                            "value": word
                          },
                          {
                            "name": "Sku",
                            "value": sku
                          },
                          {
                            "name": "Delay",
                            "value": delays
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
    
}
      
      function sleep(delays) {
        return new Promise(res => setTimeout(res, delays));
      }
      
      async function scan() {
        console.log('scanning');
        const json = await (await fetch(`https://www.bestbuy.com/api/3.0/priceBlocks?skus=${sku}`, {
          method: 'GET',
          headers: headers,
        })).json();
        datas = json;
      }
      
      async function keycheck() {
        while (soo0) {
          if (datas) {
            let skudata = datas[0].sku.buttonState.buttonState
              if (skudata == 'ADD_TO_CART') {
                soo0 = false;
              }
          }
          await webhook();
          await scan();
          await sleep(delays);
        }
      }
      
      async function run() {
        await scan();
        await keycheck()
        location.href = `https://api.bestbuy.com/click/-/${sku}/cart`
        console.log('got it');
      }
      
      run();


      
    });
  });
}

chrome.storage.sync.get('bbMonitor', function(data) {
  bbMonitor = data.bbMonitor;
  if (bbMonitor === "on"){
      BestbuyUSMonitorOn();
      iziToast.info({
        title: "Telios AIO",
        message: "BestBuy monitor is running!",
    });
      console.log("BESTBUY MONITOR ON");
  } else { 
      console.log("BESTBUY MONITOR OFF")
  }
});