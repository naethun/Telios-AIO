chrome.storage.sync.get(["isValidKey", "userSettings"], function(data) {
  if (data.isValidKey === true && data.userSettings.autoclick) {
    let isRecaptchaFrame = () => {
      return /https:\/\/www.google.com\/recaptcha\/api2\/anchor/.test(window.location.href);
    };

    let isDiscordOauth = () => {
      return window.location.href.includes("discord.com/oauth");
    };

    let captchaInterval = setInterval(() => {
      if (isRecaptchaFrame()) {
        clearInterval(captchaInterval);
        document.getElementsByClassName("recaptcha-checkbox-checkmark")[0].click();
      }
    }, 500);

    let discordAuthInterval = setInterval(() => {
      if (
        document.getElementsByClassName(
          "button-38aScr lookFilled-1Gx00P colorBrand-3pXr91 sizeMedium-1AC_Sl grow-q77ONN"
        ) &&
        isDiscordOauth()
      ) {
        clearInterval(discordAuthInterval);
        document
          .getElementsByClassName("button-38aScr lookFilled-1Gx00P colorBrand-3pXr91 sizeMedium-1AC_Sl grow-q77ONN")[0]
          .click();
      }
    }, 500);
  }
});
