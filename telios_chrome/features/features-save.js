//save
var ShopifyAutocartSave = document.querySelector('#autocartSave');

ShopifyAutocartSave.onclick = function(){
    var autocartSize = document.getElementById('autocartSize').value;
    var autocartAmt = document.getElementById('autocartAmt').value;

    chrome.storage.sync.set({'autocartSize': autocartSize}, function() {
        console.log("Autocart Size:" + autocartSize)
    });
    chrome.storage.sync.set({'autocartAmt': autocartAmt}, function() {
        console.log("Autocart Quantity:" + autocartAmt)
    });

}

var supremeAutocartSave = document.querySelector('#supremeAutocartSave')

supremeAutocartSave.onclick = function(){
    var supremeSize = document.getElementById('supremeSize').value;

    chrome.storage.sync.set({'supremeSize': supremeSize}, function() {
        console.log("supremeSize:" + supremeSize)
    });   
}

var supremeMonitorSave = document.querySelector('#supremeMonitorSave');

supremeMonitorSave.onclick = function(){
    var supremeKeyword = document.getElementById('supremeKeyword').value;
    var supremeDelay = document.getElementById('supremeDelay').value;

    chrome.storage.sync.set({'supremeKeyword': supremeKeyword}, function() {
        console.log("supremeKeyword:" + supremeKeyword)
    });
    chrome.storage.sync.set({'supremeDelay': supremeDelay}, function() {
        console.log("Supreme Category:" + supremeDelay)
    });

}

var linkAppendSave = document.querySelector('#linkAppendSave')

linkAppendSave.onclick = function(){
    var linkAppend = document.getElementById('linkAppend').value;

    chrome.storage.sync.set({'linkAppend': linkAppend}, function() {
        console.log("linkAppend:" + linkAppend)
    });   
}

var ALOsave = document.querySelector('#ALOsave')

ALOsave.onclick = function(){
    var ALO = document.getElementById('ALO').value;

    chrome.storage.sync.set({'ALO': ALO}, function() {
        console.log("ALO:" + ALO)
    });   
}

var shopifyMonitorSave = document.querySelector('#shopifyMonitorSave');

shopifyMonitorSave.onclick = function(){
    var shopifyKeyword = document.getElementById('shopifyKeyword').value;
    var shopifydelay = document.getElementById('shopifydelay').value;

    chrome.storage.sync.set({'shopifyKeyword': shopifyKeyword}, function() {
        console.log("shopifyKeyword:" + shopifyKeyword)
    });
    chrome.storage.sync.set({'shopifydelay': shopifydelay}, function() {
        console.log("shopifydelay:" + shopifydelay)
    });

}

var bbMonitorSave = document.querySelector('#bestbuyMonitorSave');

bbMonitorSave.onclick = function(){
    var bbKeyword = document.getElementById('bestbuyKeyword').value;
    var bbdelay = document.getElementById('bestbuydelay').value;

    chrome.storage.sync.set({'bbKeyword': bbKeyword}, function() {
        console.log("bbKeyword:" + bbKeyword)
    });
    chrome.storage.sync.set({'bbdelay': bbdelay}, function() {
        console.log("bbdelay:" + bbdelay)
    });

}

//load
window.onload = function() {
    chrome.storage.sync.get('autocartSize', function(data) {
        if(data.autocartSize != null){
            document.getElementById("autocartSize").value = data.autocartSize
        } else {
            document.getElementById("autocartSize").value = ""
        }
    });

    chrome.storage.sync.get('autocartAmt', function(data) {
        if(data.autocartAmt != null){
            document.getElementById("autocartAmt").value = data.autocartAmt
        } else {
            document.getElementById("autocartAmt").value = ""
        }
    });

    chrome.storage.sync.get('supremeSize', function(data) {
        if(data.supremeSize != null){
            document.getElementById("supremeSize").value = data.supremeSize
        } else [
            document.getElementById("supremeSize").value = ""
        ]
    });

    chrome.storage.sync.get('supremeDelay', function(data) {
      console.log(data.supremeDelay)
      document.getElementById("supremeDelay").value = data.supremeDelay
    });

    chrome.storage.sync.get('supremeKeyword', function(data) {
        if(data.supremeKeyword != null){
            document.getElementById("supremeKeyword").value = data.supremeKeyword
        } else {
            document.getElementById("supremeKeyword").value = ""
        }
    });

    chrome.storage.sync.get('linkAppend', function(data) {
        if(data.linkAppend != null){
            document.getElementById("linkAppend").value = data.linkAppend
        } else {
            document.getElementById("linkAppend").value = ""
        }
    });

    chrome.storage.sync.get('ALO', function(data) {
        if(data.ALO != null){
            document.getElementById("ALO").value = data.ALO
        } else {
            document.getElementById("ALO").value = ""
        }
    });

    chrome.storage.sync.get('shopifyKeyword', function(data) {
        if(data.shopifyKeyword != null){
            document.getElementById("shopifyKeyword").value = data.shopifyKeyword
        } else {
            document.getElementById("shopifyKeyword").value = ""
        }
    });

    chrome.storage.sync.get('shopifydelay', function(data) {
        if(data.shopifydelay != null){
            document.getElementById("shopifydelay").value = data.shopifydelay
        } else {
            document.getElementById("shopifydelay").value = ""
        }
    });

    chrome.storage.sync.get('bbKeyword', function(data) {
      if(data.bbKeyword != null){
          document.getElementById("bestbuyKeyword").value = data.bbKeyword
      } else {
          document.getElementById("bestbuyKeyword").value = ""
      }
  });

  chrome.storage.sync.get('bbdelay', function(data) {
      if(data.bbdelay != null){
          document.getElementById("bestbuydelay").value = data.bbdelay
      } else {
          document.getElementById("bestbuydelay").value = ""
      }
  });
}


// switches

var ShopifyAOToggle = document.querySelector('#solGeneral')
var ShopifyAOStatus = document.querySelector('#solGeneral')
ShopifyAOStatus.toggleStatus = "off";

chrome.storage.sync.get('ShopifyAutocartButton', function(data) {
    /// AUTOCART - TOGGLED OFF ///

    if (ShopifyAutocartButton = "off") {
        var ShopifyAOToggle = document.querySelector('#solGeneral')
        var ShopifyAOStatus = document.querySelector('#solGeneral')
        ShopifyAOToggle.toggleStatus = "off";
        chrome.storage.sync.set({'ShopifyAutocartButton': 'off'}, function() {
          console.log('ShopifyAutocartButton Status: Off');
        });
        
        ShopifyAOToggle.onclick = function(){
          switch(ShopifyAOToggle.toggleStatus){
            case "on":
                ShopifyAOStatus.toggleStatus="off";
                ShopifyAOStatus.style.color = '#7a7d9d';
                ShopifyAOStatus.style.backgroundColor = '#2b2f40';
              chrome.storage.sync.set({'ShopifyAutocartButton': 'off'}, function() {
                console.log('ShopifyAutocartButton Status: Off');
              });
              break;
            case "off":
                ShopifyAOStatus.toggleStatus="on";
                ShopifyAOStatus.style.color = '#ffffff';
                ShopifyAOStatus.style.backgroundColor = '#738ADB';
              chrome.storage.sync.set({'ShopifyAutocartButton': 'on'}, function() {
                console.log('ShopifyAutocartButton Status: On');
              });
              break;
          }
        }
      };
      
    /// AUTOCART - BUTTON TOGGLED ON ///
    
      if (ShopifyAutocartButton === "on") {
        var ShopifyAOToggle = document.querySelector('#linkAppenderInput')
        var ShopifyAOStatus = document.querySelector('#linkAppenderInput')
        ShopifyAOStatus.toggleStatus = "on";
    
        chrome.storage.sync.set({'ShopifyAutocartButton': 'on'}, function() {
          console.log('ShopifyAutocartButton Status: On');
        });
        
        ShopifyAOStatus.toggleStatus="on";
        ShopifyAOStatus.style.color = '#ffffff';
        ShopifyAOStatus.style.backgroundColor = '#738ADB';
    
        ShopifyAOToggle.onclick = function(){
          switch(ShopifyAOToggle.toggleStatus){
            case "on":
                ShopifyAOStatus.toggleStatus="off";
                ShopifyAOStatus.style.color = '#7a7d9d';
                ShopifyAOStatus.style.backgroundColor = '#2b2f40';
              chrome.storage.sync.set({'ShopifyAutocartButton': 'off'}, function() {
                console.log('ShopifyAutocartButton Status: Off');
              });
              break;
            case "off":
                ShopifyAOStatus.toggleStatus="on";
                ShopifyAOStatus.style.color = '#ffffff';
                ShopifyAOStatus.style.backgroundColor = '#738ADB';
              chrome.storage.sync.set({'ShopifyAutocartButton': 'on'}, function() {
                console.log('ShopifyAutocartButton Status: On');
              });
              break;
          }
        }
      }
});

var linkAppenderToggle = document.querySelector('#linkAppenderInput')
var linkAppenderInputStatus = document.querySelector('#linkAppenderInput')
linkAppenderInputStatus.toggleStatus = "off";

chrome.storage.sync.get('linkAppenderButton', function(data) {
    console.log("Link Appender STATUS:" + data.linkAppenderButton);

    /// LINKAPPENDER - TOGGLED OFF ///

  if (linkAppenderButton = "off") {
    var linkAppenderToggle = document.querySelector('#linkAppenderInput')
    var linkAppenderInputStatus = document.querySelector('#linkAppenderInput')
    linkAppenderToggle.toggleStatus = "off";
    chrome.storage.sync.set({'linkAppenderButton': 'off'}, function() {
      console.log('linkAppenderButton Status: Off');
    });
    
    linkAppenderToggle.onclick = function(){
      switch(linkAppenderToggle.toggleStatus){
        case "on":
            linkAppenderInputStatus.toggleStatus="off";
            linkAppenderInputStatus.style.color = '#7a7d9d';
            linkAppenderInputStatus.style.backgroundColor = '#2b2f40';
          chrome.storage.sync.set({'linkAppenderButton': 'off'}, function() {
            console.log('linkAppenderButton Status: Off');
          });
          break;
        case "off":
            linkAppenderInputStatus.toggleStatus="on";
            linkAppenderInputStatus.style.color = '#ffffff';
            linkAppenderInputStatus.style.backgroundColor = '#738ADB';
          chrome.storage.sync.set({'linkAppenderButton': 'on'}, function() {
            console.log('linkAppenderButton Status: On');
          });
          break;
      }
    }
  };
  
/// LINKAPPENDER - BUTTON TOGGLED ON ///

  if (linkAppenderButton === "on") {
    var linkAppenderToggle = document.querySelector('#linkAppenderInput')
    var linkAppenderInputStatus = document.querySelector('#linkAppenderInput')
    linkAppenderInputStatus.toggleStatus = "on";

    chrome.storage.sync.set({'linkAppenderButton': 'on'}, function() {
      console.log('linkAppenderButton Status: On');
    });
    
    linkAppenderInputStatus.toggleStatus="on";
    linkAppenderInputStatus.style.color = '#ffffff';
    linkAppenderInputStatus.style.backgroundColor = '#738ADB';

    linkAppenderToggle.onclick = function(){
      switch(linkAppenderToggle.toggleStatus){
        case "on":
            linkAppenderInputStatus.toggleStatus="off";
            linkAppenderInputStatus.style.color = '#7a7d9d';
            linkAppenderInputStatus.style.backgroundColor = '#2b2f40';
          chrome.storage.sync.set({'linkAppenderButton': 'off'}, function() {
            console.log('linkAppenderButton Status: Off');
          });
          break;
        case "off":
            linkAppenderInputStatus.toggleStatus="on";
            linkAppenderInputStatus.style.color = '#ffffff';
            linkAppenderInputStatus.style.backgroundColor = '#738ADB';
          chrome.storage.sync.set({'linkAppenderButton': 'on'}, function() {
            console.log('linkAppenderButton Status: On');
          });
          break;
      }
    }
  }
});

var autolinkToggle = document.querySelector('#autolinkInput');
var autolinkToggleStatus = document.querySelector('#autolinkInput')
autolinkToggleStatus.toggleStatus = "off";

chrome.storage.sync.get('autolinkButton', function(data) {
    console.log("autolink STATUS:" + data.autolinkButton);

    /// AUTOCART - TOGGLED OFF ///

  if (autolinkButton = "off") {
    var autolinkToggle = document.querySelector('#autolinkInput')
    var autolinkToggleStatus = document.querySelector('#autolinkInput')
    autolinkToggle.toggleStatus = "off";
    chrome.storage.sync.set({'autolinkButton': 'off'}, function() {
      console.log('autolinkButton Status: Off');
    });
    
    autolinkToggle.onclick = function(){
      switch(autolinkToggle.toggleStatus){
        case "on":
          autolinkToggleStatus.toggleStatus="off";
          autolinkToggleStatus.style.color = '#7a7d9d';
          autolinkToggleStatus.style.backgroundColor = '#2b2f40';
          chrome.storage.sync.set({'autolinkButton': 'off'}, function() {
            console.log('autolinkButton Status: Off');
          });
          break;
        case "off":
          autolinkToggleStatus.toggleStatus="on";
          autolinkToggleStatus.style.color = '#ffffff';
          autolinkToggleStatus.style.backgroundColor = '#738ADB';
          chrome.storage.sync.set({'autolinkButton': 'on'}, function() {
            console.log('autolinkButton Status: On');
          });
          break;
      }
    }
  };
  
/// AUTOCART - BUTTON TOGGLED ON ///

  if (autolinkButton === "on") {
    var autolinkToggle = document.querySelector('#autolinkInput')
    var autolinkToggleStatus = document.querySelector('#autolinkInput')
    autolinkToggleStatus.toggleStatus = "on";

    chrome.storage.sync.set({'autolinkButton': 'on'}, function() {
      console.log('autolinkButton Status: On');
    });
    
    autolinkToggleStatus.toggleStatus="on";
    autolinkToggleStatus.style.color = '#ffffff';
    autolinkToggleStatus.style.backgroundColor = '#738ADB';

    autolinkToggle.onclick = function(){
      switch(autolinkToggle.toggleStatus){
        case "on":
          autolinkToggleStatus.toggleStatus="off";
          autolinkToggleStatus.style.color = '#7a7d9d';
          autolinkToggleStatus.style.backgroundColor = '#2b2f40';
          chrome.storage.sync.set({'autolinkButton': 'off'}, function() {
            console.log('autolinkButton Status: Off');
          });
          break;
        case "off":
          autolinkToggleStatus.toggleStatus="on";
          autolinkToggleStatus.style.color = '#ffffff';
          autolinkToggleStatus.style.backgroundColor = '#738ADB';
          chrome.storage.sync.set({'autolinkButton': 'on'}, function() {
            console.log('autolinkButton Status: On');
          });
          break;
      }
    }
  }
});

var shopMonitorToggle = document.querySelector('#shopifyMonitorInput');
var shopMonitorToggleStatus = document.querySelector('#shopifyMonitorInput')
shopMonitorToggleStatus.toggleStatus = "off";

chrome.storage.sync.get('shopifyMonitor', function(data) {
    console.log("shopifyMonitor STATUS:" + data.shopifyMonitor);

    /// SHOPIFY MONITOR - TOGGLED OFF ///

  if (shopifyMonitor = "off") {
    var shopMonitorToggle = document.querySelector('#shopifyMonitorInput')
    var shopMonitorToggleStatus = document.querySelector('#shopifyMonitorInput')
    shopMonitorToggle.toggleStatus = "off";
    chrome.storage.sync.set({'shopifyMonitor': 'off'}, function() {
      console.log('shopifyMonitor Status: Off');
    });
    
    shopMonitorToggle.onclick = function(){
      switch(shopMonitorToggle.toggleStatus){
        case "on":
          shopMonitorToggleStatus.toggleStatus="off";
          shopMonitorToggleStatus.style.color = '#7a7d9d';
          shopMonitorToggleStatus.style.backgroundColor = '#2b2f40';
          chrome.storage.sync.set({'shopifyMonitor': 'off'}, function() {
            console.log('shopifyMonitor Status: Off');
          });
          break;
        case "off":
          shopMonitorToggleStatus.toggleStatus="on";
          shopMonitorToggleStatus.style.color = '#ffffff';
          shopMonitorToggleStatus.style.backgroundColor = '#738ADB';
          chrome.storage.sync.set({'shopifyMonitor': 'on'}, function() {
            console.log('shopifyMonitor Status: On');
          });
          break;
      }
    }
  };
  
/// SHOPIFY MONITOR - BUTTON TOGGLED ON ///

  if (shopifyMonitor === "on") {
    var shopMonitorToggle = document.querySelector('#shopifyMonitorInput')
    var shopMonitorToggleStatus = document.querySelector('#shopifyMonitorInput')
    shopMonitorToggleStatus.toggleStatus = "on";

    chrome.storage.sync.set({'shopifyMonitor': 'on'}, function() {
      console.log('shopifyMonitor Status: On');
    });
    
    shopMonitorToggleStatus.toggleStatus="on";
    shopMonitorToggleStatus.style.color = '#ffffff';
    shopMonitorToggleStatus.style.backgroundColor = '#738ADB';

    shopMonitorToggle.onclick = function(){
      switch(shopMonitorToggle.toggleStatus){
        case "on":
          shopMonitorToggleStatus.toggleStatus="off";
          shopMonitorToggleStatus.style.color = '#7a7d9d';
          shopMonitorToggleStatus.style.backgroundColor = '#2b2f40';
          chrome.storage.sync.set({'shopifyMonitor': 'off'}, function() {
            console.log('shopifyMonitor Status: Off');
          });
          break;
        case "off":
          shopMonitorToggleStatus.toggleStatus="on";
          shopMonitorToggleStatus.style.color = '#ffffff';
          shopMonitorToggleStatus.style.backgroundColor = '#738ADB';
          chrome.storage.sync.set({'shopifyMonitor': 'on'}, function() {
            console.log('shopifyMonitor Status: On');
          });
          break;
      }
    }
  }
});

var bbMonitorToggle = document.querySelector('#bestbuyMonitorInput');
var bbMonitorToggleStatus = document.querySelector('#bestbuyMonitorInput')
bbMonitorToggleStatus.toggleStatus = "off";

chrome.storage.sync.get('bbMonitor', function(data) {
    console.log("bbMonitor STATUS:" + data.bbMonitor);

    /// BB MONITOR - TOGGLED OFF ///

  if (bbMonitor = "off") {
    var bbMonitorToggle = document.querySelector('#bestbuyMonitorInput')
    var bbMonitorToggleStatus = document.querySelector('#bestbuyMonitorInput')
    shopMonitorToggle.toggleStatus = "off";
    chrome.storage.sync.set({'bbMonitor': 'off'}, function() {
      console.log('bbMonitor Status: Off');
    });
    
    bbMonitorToggle.onclick = function(){
      switch(bbMonitorToggle.toggleStatus){
        case "on":
          bbMonitorToggleStatus.toggleStatus="off";
          bbMonitorToggleStatus.style.color = '#7a7d9d';
          bbMonitorToggleStatus.style.backgroundColor = '#2b2f40';
          chrome.storage.sync.set({'bbMonitor': 'off'}, function() {
            console.log('bbMonitor Status: Off');
          });
          break;
        case "off":
          bbMonitorToggleStatus.toggleStatus="on";
          bbMonitorToggleStatus.style.color = '#ffffff';
          bbMonitorToggleStatus.style.backgroundColor = '#738ADB';
          chrome.storage.sync.set({'bbMonitor': 'on'}, function() {
            console.log('bbMonitor Status: On');
          });
          break;
      }
    }
  };
  
/// BB MONITOR - BUTTON TOGGLED ON ///

  if (bbMonitor === "on") {
    var bbMonitorToggle = document.querySelector('#bestbuyMonitorInput')
    var bbMonitorToggleStatus = document.querySelector('#bestbuyMonitorInput')
    bbMonitorToggleStatus.toggleStatus = "on";

    chrome.storage.sync.set({'bbMonitor': 'on'}, function() {
      console.log('bbMonitor Status: On');
    });
    
    bbMonitorToggleStatus.toggleStatus="on";
    bbMonitorToggleStatus.style.color = '#ffffff';
    bbMonitorToggleStatus.style.backgroundColor = '#738ADB';

    bbMonitorToggle.onclick = function(){
      switch(bbMonitorToggle.toggleStatus){
        case "on":
          bbMonitorToggleStatus.toggleStatus="off";
          bbMonitorToggleStatus.style.color = '#7a7d9d';
          bbMonitorToggleStatus.style.backgroundColor = '#2b2f40';
          chrome.storage.sync.set({'bbMonitor': 'off'}, function() {
            console.log('bbMonitor Status: Off');
          });
          break;
        case "off":
          bbMonitorToggleStatus.toggleStatus="on";
          bbMonitorToggleStatus.style.color = '#ffffff';
          bbMonitorToggleStatus.style.backgroundColor = '#738ADB';
          chrome.storage.sync.set({'bbMonitor': 'on'}, function() {
            console.log('bbMonitor Status: On');
          });
          break;
      }
    }
  }
});

var supMonitorToggle = document.querySelector('#supremeMonitorInput');
var supMonitorToggleStatus = document.querySelector('#supremeMonitorInput')
supMonitorToggleStatus.toggleStatus = "off";

chrome.storage.sync.get('supMonitor', function(data) {
    console.log("supMonitor STATUS:" + data.bbMonitor);

    /// SUP MONITOR - TOGGLED OFF ///

  if (supMonitor = "off") {
    var supMonitorToggle = document.querySelector('#supremeMonitorInput')
    var supMonitorToggleStatus = document.querySelector('#supremeMonitorInput')
    supMonitorToggle.toggleStatus = "off";
    chrome.storage.sync.set({'supMonitor': 'off'}, function() {
      console.log('supMonitor Status: Off');
    });
    
    supMonitorToggle.onclick = function(){
      switch(supMonitorToggleStatus.toggleStatus){
        case "on":
          supMonitorToggleStatus.toggleStatus="off";
          supMonitorToggleStatus.style.color = '#7a7d9d';
          supMonitorToggleStatus.style.backgroundColor = '#2b2f40';
          chrome.storage.sync.set({'supMonitor': 'off'}, function() {
            console.log('supMonitor Status: Off');
          });
          break;
        case "off":
          supMonitorToggleStatus.toggleStatus="on";
          supMonitorToggleStatus.style.color = '#ffffff';
          supMonitorToggleStatus.style.backgroundColor = '#738ADB';
          chrome.storage.sync.set({'supMonitor': 'on'}, function() {
            console.log('supMonitor Status: On');
          });
          break;
      }
    }
  };
  
/// SUP MONITOR - BUTTON TOGGLED ON ///

  if (supMonitor === "on") {
    var supMonitorToggle = document.querySelector('#supremeMonitorInput')
    var supMonitorToggleStatus = document.querySelector('#supremeMonitorInput')
    supMonitorToggleStatus.toggleStatus = "on";

    chrome.storage.sync.set({'supMonitor': 'on'}, function() {
      console.log('supMonitor Status: On');
    });
    
    supMonitorToggleStatus.toggleStatus="on";
    supMonitorToggleStatus.style.color = '#ffffff';
    supMonitorToggleStatus.style.backgroundColor = '#738ADB';

    supMonitorToggle.onclick = function(){
      switch(supMonitorToggle.toggleStatus){
        case "on":
          supMonitorToggleStatus.toggleStatus="off";
          supMonitorToggleStatus.style.color = '#7a7d9d';
          supMonitorToggleStatus.style.backgroundColor = '#2b2f40';
          chrome.storage.sync.set({'supMonitor': 'off'}, function() {
            console.log('supMonitor Status: Off');
          });
          break;
        case "off":
          supMonitorToggleStatus.toggleStatus="on";
          supMonitorToggleStatus.style.color = '#ffffff';
          supMonitorToggleStatus.style.backgroundColor = '#738ADB';
          chrome.storage.sync.set({'supMonitor': 'on'}, function() {
            console.log('supMonitor Status: On');
          });
          break;
      }
    }
  }
});