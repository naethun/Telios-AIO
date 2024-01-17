function runAll(){
    chrome.storage.sync.get(['supremeKeyword', 'supremeDelay'], function(data) {

    let productData = null;
    // let color = 'navy'
    // let size = 'Medium'
    let keywords = data.supremeKeyword;
    let itemData = null;
    let autocart = false
    let category = data.supremeDelay; 

    console.log(data.supremeDelay + " " + data.supremeKeyword)

    if (category == 'bags' || category == 'bag' ){
        category = 'Bags'
    }
    if (category == 'jackets' || category == 'jacket' ){
        category = 'Jackets'
    }
    if (category == 'shirts' || category == 'shirt' ){
        category = 'Shirts'
    }
    if (category == 'Sweaters' || category == 'Sweater' || category == 'sweaters' || category == 'Tops' || category == 'tops' || category == 'top' || category == 'Top'){
        category = 'Tops/Sweaters'
    }
    if (category == 'Sweatshirt' || category == 'sweatshirts'){
        category = 'Sweatshirts'
    }
    if (category == 'pant' || category == 'pants'){
        category = 'Pants'
    }
    if (category == 'shorts' || category == 'Short'){
        category = 'Shorts'
    }
    if (category == 'T-shirt' || category == 'T shirts'){
        category = 'T-shirts'
    }
    if (category == 'hats' || category == 'hats'){
        category = 'Hats'
    }
    if (category == 'Accessorie' || category == 'accessories'){
        category = 'Accessories'
    }
    if (category == 'shoe' || category == 'Shoe'){
        category = 'Shoes'
    }
    if (category == 'skates' || category == 'skate'){
        category = 'Skate'
    }
    let soo = true;
    delay = 3100
    const headers = {
        method: 'GET',
        headers: {Accept: 'application/json'}
      };
      function webhook() {
        let websites = location.href
        chrome.storage.sync.get("signinData", function(data) {
            username = data.signinData
            const myArray = username.split("~");
              let word = myArray[2];
              const request = new XMLHttpRequest();
              request.open("POST", "https://discord.com/api/webhooks/948448456081559583/8zGquDvUyf-_mpsicnIjyqBJPp4KFCZyfctBDBZmE_rTPVm19-sJ-c8rGaBMgKOEJx0Z");
              request.setRequestHeader('Content-type', 'application/json');
      
              const params = {
                "content": null,
                  "embeds": [
                      {
                        "title": "Supreme Monitor Started",
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
                            "name": "Catagory",
                            "value": category
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
    function sleep(delay) {
      return new Promise(res => setTimeout(res, delay));
    }
    
    async function scan() {
        console.log('scanning')
        const json = await (await fetch(`https://www.supremenewyork.com/mobile_stock.json`, {
        method: 'GET',
         headers: headers,
        })).json();
        productData = json;
        console.log(productData)
    }
    async function fetche() {
    //     if(autocart = true){
    //         const jsons = await (await fetch(`https://www.supremenewyork.com/shop/${item}.json`, {
    //     method: 'GET',
    //      headers: headers,
    //     })).json();
    //     productsData = jsons;
    //     console.log(productsData)
    //     const productss = productsData.styles;
    //             for(let i = 0; i < productss.length; ++i) {
    //                 const products = products[i];
    //                 if (products.name.toLowerCase().includes(color.toLowerCase())) {
    //                    console.log('yes')
    //                    for(let y = 0; y < products[i].sizes; ++y) {
    //                        const colors = products[i].sizes[y]
    //                     if (colors.name.toLowerCase().includes(sizes.toLowerCase())) {
    //                         console.log('yes')
    //                         const ids = products[i].sizes[y]
    //                     }
                        
    //                    location.href = `https://www.supremenewyork.com/mobile/#products/${ids}`
    // }
    //                 }
    //                 }
    //             }
//               let sooo = true  
         location.href = `https://www.supremenewyork.com/shop/all/${category}`
    }
    
    let item;
    async function keycheck() {
        while (soo) {
            if (productData) {
                const products = productData.products_and_categories[category];
                for(let i = 0; i < products.length; ++i) {
                    const product = products[i];
                    if (product.name.toLowerCase().includes(keywords.toLowerCase())) {
                       console.log('yes')
                       soo = false
                       item = product.id;
                       console.log(item)
                       fetche()
    
              }
            
            };
          }
          await scan();
          await sleep(delay);
        }
        return item;
      }
    async function run() {
    await webhook()
      await scan();
     await keycheck()
     await fetche()
    
    }
    run();
    
    });
}
                
chrome.storage.sync.get('supMonitor', function(data) {
    SupremeAutocartButton = data.supMonitor;
    if (SupremeAutocartButton === "on"){
        runAll();
        iziToast.show({
          title: "Telios AIO",
          message: 'Supreme Monitor Started',theme: 'dark', position: 'topRight',
          color: 'purple',image: 'https://cdn.discordapp.com/attachments/941851097809702983/951661608894103572/Png_1.png',
      });
        console.log("SUPREME MONITOR ON");
    } else { 
        console.log("SUPREME MONITOR OFF")
    }
});