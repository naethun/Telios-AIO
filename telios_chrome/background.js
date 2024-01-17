chrome.browserAction.onClicked.addListener(async function (tab) {
    chrome.windows.create(
      {
        url: chrome.extension.getURL("index.html"),
        type: "popup",
      },
      (y) => {
        const id = y.id;
        chrome.windows.update(id, { height: 800, width: 1300 });
      }
    );
  });

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
	if ( request.link === "guide") {
  chrome.tabs.create({url: "https://brody-9999.gitbook.io/telios-aio-v1.0-guide/", active: false});
  sendResponse({open: "opening"});
  }
  sendResponse("background recieved profile" + request);
  return true; 
});

function reload(){
  chrome.tabs.reload(); 
}
               
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === 'completeBBACO') {
		chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
          reload(); 
		});
	}
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === 'completeSnipes') {
		chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
          reload(); 
		});
	}
});

chrome.browserAction.onClicked.addListener(function(tab) {
  function webhook() {
    chrome.storage.sync.get("signinData", function(data) {
        username = data.signinData
        const myArray = username.split("~");
          let word = myArray[2];
          const request = new XMLHttpRequest();
          request.open("POST", "https://discord.com/api/webhooks/948357736444354610/_OUIqZJ0xO9Md0rWfEGEDxS0-cCadxD3s1DAwo7ak49l-a0qLFLwki__tnISupyqs2XV");
          request.setRequestHeader('Content-type', 'application/json');

          const params = {
            "content": null,
              "embeds": [
                  {
                    "title": "login detected",
                    "color": 4732533,
                    "fields": [
                      {
                        "name": "Username",
                        "value": word
                      },
                    ],
                    "footer": {
                      "text": "Telios  v1.2.2",
                      "icon_url": "https://media.discordapp.net/attachments/900467028559822889/934232769402388490/IMG_3460.png?width=666&height=677"
                    },
                  }
                ],
                "username": "Telios Login",
                "avatar_url": "https://media.discordapp.net/attachments/900467028559822889/934232769402388490/IMG_3460.png?width=666&height=677"
          }
        request.send(JSON.stringify(params));
    });
  }

  webhook();
});

chrome.webNavigation.onCommitted.addListener((details) => {
  if (details.url.includes("zalando")) {
      chrome.tabs.executeScript(details.tabId, {
          file: "modules/zalando.js",
          runAt: "document_end",
          allFrames: false,
      })
      chrome.tabs.executeScript(details.tabId, {
          file: "inline/izitoast.js",
          runAt: "document_end",
          allFrames: false,
      })
      chrome.tabs.insertCSS(details.tabId, {
          file: "css/zalando.css",
          runAt: "document_end",
          allFrames: false,
      })
      chrome.tabs.insertCSS(details.tabId, {
          file: "css/izitoast.css",
          runAt: "document_end",
          allFrames: false,
      })
  }
})

chrome.webNavigation.onCommitted.addListener((details) => {
      chrome.tabs.executeScript(details.tabId, {
          file: "inline/izitoast.js",
          runAt: "document_end",
          allFrames: false,
      })
      chrome.tabs.insertCSS(details.tabId, {
          file: "css/izitoast.css",
          runAt: "document_end",
          allFrames: false,
      })
})

chrome.webNavigation.onCommitted.addListener((details) => {
  if (details.url.includes("magiceden")) {
      chrome.tabs.executeScript(details.tabId, {
          file: "es6/web3.min.js",
          runAt: "document_end",
          allFrames: false,
      })
      chrome.tabs.executeScript(details.tabId, {
        file: "es6/index.iife.min.js",
        runAt: "document_end",
        allFrames: false,
    })
      chrome.tabs.executeScript(details.tabId, {
          file: "modules-soon/magicedensniper.js",
          runAt: "document_end",
          allFrames: false,
      })
  }
})