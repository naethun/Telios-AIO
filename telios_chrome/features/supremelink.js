let websitess
let webhookss = true
function runall(){
chrome.storage.sync.get(['supremeKeyword', 'supremeDelay'], function(data) {
    let keywords = data.supremeKeyword;
    let category = data.supremeDelay; 
    if(location.href.includes(category)){
let itemname = document.getElementsByClassName('name-link')
        console.log(itemname)
        sooo = true
        while (sooo) {
        for(let i = 0; i < itemname.length; ++i) {
            const productname = itemname[i];
            if (productname.outerText.toLowerCase().includes(keywords.toLowerCase())) {
                console.log('yes')
                sooo = false
                itemlink = document.getElementsByClassName('name-link')[i].href
                location.href = itemlink
                websites = itemlink
                if (webhookss == true){
                    webhooksss()
                    webhooks = false  
                }
                
            }
        }
    }
    function webhooksss() {
        chrome.storage.sync.get('shopifyKeyword', function(datas) {
        chrome.storage.sync.get("signinData", function(data) {
            username = data.signinData
            keywords = datas.shopifyKeyword
            const myArray = username.split("~");
              let word = myArray[2];
              const request = new XMLHttpRequest();
              request.open("POST", "https://discord.com/api/webhooks/948450275054714921/8R6bwVPIebMpHvxyHySFEDud4Dr1IwKuQg6ZIkL-CahjNQOS_mx2dGAP0m1izRg5yaHc");
              request.setRequestHeader('Content-type', 'application/json');
      
              const params = {
                "content": null,
                  "embeds": [
                      {
                        "title": "Supreme Monitor Link",
                        "color": 4732533,
                        "fields": [
                          {
                            "name": "Product link",
                            "value": websitess
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
}
}
});
}
chrome.storage.sync.get('supMonitor', function(data) {
    SupremeAutocartButton = data.supMonitor;
    if (SupremeAutocartButton === "on"){
        runall();
        console.log("SUPREME MONITOR ON");
    } else { 
        console.log("SUPREME MONITOR OFF")
    }
});