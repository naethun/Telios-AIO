function aloON(){
    chrome.storage.sync.get('ALO', function(data) {

        let keyWords = [data.ALO]

        // we define a list to store all links that have already been posted so we are not opening pointless links
        let list = []
    
        // gets old links before posing new ones this is to prevent opening old links
        function start() {
    
            // gets all link elements
            let anchors = document.getElementsByTagName('a');
            console.log("Found ",anchors.length, " original links!");
            console.log("Links are ", anchors);
            for (let i = 0; i < anchors.length; i++) {
                let url = anchors[i].getAttribute('href');
                if (url !== null) {
                    list.push(url);
                }
            }
    
            // initiates actual monitor for new links portion
            monitor();
        }
    
        // initiates monitor after old links are retrieved
        function monitor(){
    
            let anchors = document.getElementsByTagName('a');
            for (let i = 0; i < anchors.length; i++) {
                let url = anchors[i].getAttribute('href');
                if (url !== null && !list.includes(url)) {
                    if (keyWords) {
                        if (url.includes) {
                            if (keyWords.every(key => url.includes(key))) {
                                console.log("URL valid opening... ", url)
                                window.open(url);
                                // returns out of function after a link is found to prevent repeatedly opening links
                                return
                            }
                        }
                    } else if (!keyWords) {
                        console.log("URL valid opening... ", url)
                        window.open(url);
                        // returns out of function after a link is found to prevent repeatedly opening links
                        return
                    }
                }
            }
            setTimeout(() => {
                monitor();
            }, 200);
        }
    
        // starts monitor after 10 seconds because some links will load after the document loads resulting in old links being re-opened. I would not suggest lowering this as there is no gain and can only cause issues
        setTimeout(() => {
            start()
            console.log("Keywords are:" + " " + keyWords);
        }, 10000);
    
    });
}

chrome.storage.sync.get('autolinkButton', function(data) {
    autolinkButton = data.autolinkButton;
    if (autolinkButton === "on"){
        aloON();
        iziToast.info({
            title: "Telios AIO",
            message: "Autolink opener is running!",
        });
        console.log("AUTO OPENER ON");
    } else { 
        console.log("AUTO OPENER OFF")
    }
  });