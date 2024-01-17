function linkAppenderOn(){
  chrome.storage.sync.get('linkAppend' , function(data){
    var linkAppend = data.linkAppend
    var link
    var webiste = linkAppend
    console.log(webiste)
    document.addEventListener('copy', (event) => {
    console.log ("injected")
    navigator.clipboard.readText().then(function (textFromClipboard) {
      console.log(textFromClipboard)
      link = textFromClipboard
      g = 'no'
      console.log(link)
      if(link = textFromClipboard){
        location.href = webiste + link
        g = false
        }
    });
    });
    });
}

chrome.storage.sync.get('linkAppenderButton', function(data) {
  linkAppenderButton = data.linkAppenderButton;
  if (linkAppenderButton === "on"){
      linkAppenderOn();
      console.log("LINK APPENDER ON");
  } else { 
      console.log("LINK APPENDER OFF")
  }
});