
class TeliosUI {

    constructor(data) {
        this.totalCheckouts = 0;
        this.totalSpent = 0;
        this.totalFailures = 0;

        if(data && data.onLogout && data.onLogin) {
            this.data = data;
        } else {
            console.error("Telios UI failed starting, TeliosUI#constructor was passed incorrect data");
        }
    }


    async preCheckSavedLicense() {
        he(bodyDiv, true);
        bodyDiv.hide();
        bodyDiv.fadeIn(350);
        changePage("dashboard");

        // console.log("checking for a saved license")
        // let data = await retrieveKeyValueAsynch('license');
        // if (data.license) {
        //     console.log(data.license)
        //     const success = await teliosUI.tryLogin(data.license);
        //     if(success) {
        //          he(bodyDiv, true);
        //          bodyDiv.hide();
        //          bodyDiv.fadeIn(350);
        //          changePage("dashboard");
        //     }
        // }
    }


    async preCheckSavedProfiles() {
        console.log("checking for saved profiles")
        let data = await retrieveKeyValueAsynch('profiles');
        if (data.profiles) {
            console.log(data.profiles)
            return JSON.parse(data.profiles)
        } else {
            return [];
        }
    }

    async preCheckSavedFeatures() {
        console.log("checking for saved features")
        let data = await retrieveKeyValueAsynch('options');
        if (data.options) {
            console.log(data.options)
            return JSON.parse(data.options)
        } else {
            return defaultFeatures;
        }
    }

    async tryLogin (license) {
        profiles =  await teliosUI.preCheckSavedProfiles();
        features = await teliosUI.preCheckSavedFeatures();
        teliosUI.updateProfiles(profiles);
        teliosUI.updateFeatures(features);
        let data = await this.data.onLogin(license);
        if(data.success) {
            this.loginData = data;
            $(".settings-profile").children("img").attr("src", data.profile);
            $($(".settings-body").find(".subheading")[0]).text(data.discord);
            $($(".subscription-text").parent().children()[1]).text(data.type);
            $(".settings-vertical-group").children(".div-block").children().text(data.type);
            return true;
        }
        return false;

    }

    async logout () {
        this.data.onLogout();
    }

    loginData () {
        return this.loginData;
    }

    updateTotalCheckouts(num) {
        $(".total-checkouts").children(".text-region").children(".box-body").text(num);
    }

    updateTotalSpent(num) {
        $(".total-spent").children(".text-region").children(".box-body").text(num);
    }

    updateTotalFailures(num) {
        $(".total-failures").children(".text-region").children(".box-body").text(num);
    }

    updateRecentCheckouts(data) {
        $(".table").empty();
        for(let i = 0; i < data.length; i++) {
            const image = data[i].image;
            const name = data[i].name;
            const size = data[i].size;
            const date = data[i].date;
            const price = data[i].price;
            const orderNumber = data[i].order;
            const site = data[i].site;

            $(`<div class="table-row">
            <div class="table-row-group">
              <div class="row-unit row-item"><img src="${image}" loading="lazy" alt="" class="item-image"></div>
              <div class="row-unit row-product">
                <div class="vertical-group">
                  <div class="product-header">${name}</div>
                  <div class="product-body">${size}</div>
                </div>
              </div>
              <div class="row-unit row-date">
                <div class="product-header">${date}</div>
              </div>
              <div class="row-unit row-price">
                <div class="product-header">${price}</div>
              </div>
              <div class="row-unit row-order">
                <div class="vertical-group">
                  <div class="order-number">${orderNumber}</div>
                  <div class="product-body">${site}</div>
                </div>
              </div>
            </div>
            <div class="table-seperator"></div>
          </div>`).appendTo($(".table"));
        }
    }

    async updateProfiles(data) {

        $(".cards-list").empty();
        for(let i = 0; i < data.length; i++) {
            const cardName = data[i].name;
            const cardType = data[i].card.type;
            const lastFour = data[i].card.lastFour;
            const expiration = data[i].card.expiration;
            const e = $(`<div class="card">
              <div class="card-header">
                <div class="card-name">${cardName}</div>
                <div class="card-type">${cardType}</div>
              </div>
              <div class="card-preview-text">Preview</div>
              <div class="card-preview">•••• •••• •••• ${lastFour}</div>
              <div class="card-preview-year">${expiration}</div>
            </div>`);
            e.click(() => {

                this.currentProfile = data[i];
                $(".cards-list").children(".card-selected").removeClass("card-selected");
                e.addClass("card-selected");
                chrome.runtime.sendMessage(
                  i,
                   function (response) {
                    console.log(response);
                }
                  )
                  chrome.storage.sync.set({'profileIndex': i}, function() {
                    console.log("profileIndex is set to " + i);
                  });

                console.log(this.currentProfile);
                inputProfileName.val(data[i].name);
                inputFirstName.val(data[i].firstName);
                inputLastName.val(data[i].lastName);
                inputEmail.val(data[i].email);
                inputAddress.val(data[i].address);
                inputPhone.val(data[i].phone);
                inputZipcode.val(data[i].zipcode);
                inputCity.val(data[i].city);
                inputState.val(data[i].state);
                inputCountry.val(data[i].country);

                inputCardName.val(data[i].card.name);
                inputCardType.val(data[i].card.type);
                inputCardNumber.val(data[i].card.cardNumber);
                inputCardMonth.val(data[i].card.month);
                inputCardYear.val(data[i].card.year);
                inputCardCVV.val(data[i].card.cvv);
            });
            e.appendTo($(".cards-list"));
        }
    }

   updateFeatures(data) {
       $(".selector").children(".selector-item").remove();
       for(let i = 0; i < data.length; i++) {
            const name = data[i].name;
            const e = $(`<div class="selector-item">
            <div class="selector-text">${name}</div>
          </div>`);
            e.insertAfter($($(".selector").children()[0]));

            e.click(() => {
                $(".selector").children(".selector-selected").children(".selector-selected").removeClass("selector-selected");
                $(".selector").children(".selector-selected").removeClass("selector-selected");

                e.addClass("selector-selected");
                e.children().addClass("selector-selected");

                pageModules.children(".subheading").text(`${name} Configuration`);

                $(".modules-body").empty();

                for(let j = 0; j < data[i].features.length; j++) {
                    let feature = data[i].features[j];
                    const featureName = feature.name;
                    const description = feature.description;
                    const value = feature.value;

                    const e = $(`<div class="module">
                                <div class="modules-row">
                                <div class="vertical-group">
                                    <div class="feature-heading">${featureName}</div>
                                    <div class="features-subheading">${description}</div>
                                </div><img src="${value ? "images/Group-69.png" : "images/Group-69-1.png"}" loading="lazy" alt="" class="switch">
                                </div>
                                <div class="module-seperator"></div>
                                </div>`
                            );
                    let tempValue = value;
                    e.appendTo($(".modules-body"));
                    const switchE = e.children(".modules-row").children("img");
                    switchE.click(() => {
                        tempValue = !tempValue;
                        switchE.attr("src", tempValue ? "images/Group-69.png" : "images/Group-69-1.png");

                        this.data.onFeatureChange(name, feature, tempValue);
                    });
                }
            });
        }
        this.features = data;

   }

    updateWebhook(webhook) {
        inputSettingsWebhook.val(webhook);
    }

    updateVersion(version) {
        $(".version").text(version);
    }
}
let webhook = !localStorage.getItem("webhook") ? "" : localStorage.getItem("webhook");


const teliosUI = new TeliosUI({
    onLogout: () => {
        // var key =  chrome.storage.sync.get(['key']);
        // fetch(`https://api.whop.com/api/v1/licenses/${key}`, {
        //     method: 'POST',
        //     headers: {
        //         'Authorization': `Bearer MTE2OWEzMzE4MWQ1Mzc1NTg3MzVhZDM3YWU0MjdjZTZjYTU3ZTdhMmU4OmI3Y2UzNGE2NTc4MGYzNjZhMDA0NDIzMjhmYjA5N2FjMmRjNjY4YjE2ZQ==`,
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         metadata: {}
        //     })
        // })
        // .then((x) => {
            localStorage.setItem("valid-login", false);
            localStorage.setItem("license", null);
            chrome.storage.sync.set({'license': null}, function() {
                console.log('Value is set to ' + null);
              });
        // })
        // .catch(err => console.log(err));
        // return true;
    },

    onLogin: async (licenseKey) => {
        let key = licenseKey.toString()
        localStorage.setItem("key", key);
        chrome.storage.sync.set({'license': key}, function() {
            console.log('onlogin Value is set to ' + key);
        });

        return {success : true}

        //Below is the old authentication system. It is depreciated.
        // const options = {
        //     method: "GET",
        //     headers: {
        //         "Authorization": "Bearer MTE2OWEzMzE4MWQ1Mzc1NTg3MzVhZDM3YWU0MjdjZTZjYTU3ZTdhMmU4OmI3Y2UzNGE2NTc4MGYzNjZhMDA0NDIzMjhmYjA5N2FjMmRjNjY4YjE2ZQ=="
        //     }
        // };
        // fetch(`https://api.whop.io/api/v1/licenses/${licenseKey.toString()}`, options)
        // .then((response) => {
        //     if (response.status === 200) {
        //         return response.json();
        //     }
        // })
        // .then((json) => {
        //     if (json != undefined) {
        //         console.log(json);
        //         let dataSTR = `${json.discord.image_url.toString()}~${json.plan.title.toString()}~${json.discord.username.toString()}`
        //         localStorage.setItem("signinData",dataSTR)
        //         chrome.storage.sync.set({"signinData": dataSTR}, function() {
        //             console.log('signinData is set to ' + dataSTR);
        //           });
        //         if (json.key_status === "approved" && "listed") {
        //             console.log("key is approved and listed, so this is verified");
        //             if (json.metadata.hwid) {
        //                 chrome.system.cpu.getInfo(function(info){
        //                     chrome.system.memory.getInfo(function(info2){
        //                         var hwid_test = info.modelName + " " + info2.capacity;
        //                         if (json.metadata.hwid === hwid_test) {
        //                             console.log("same pc");
        //                             //return info
        //                             localStorage.setItem("valid-login", true);
        //                             console.log(localStorage.getItem("valid-login"));
        //                             chrome.storage.sync.set({"valid-login": true}, function() {
        //                                 console.log('Valid login is set to ' + true);
        //                               });
        //                             chrome.storage.sync.get('license', function(result) {
        //                                 console.log('Key currently is ' + result.license);
        //                               });

        //                         }
        //                     });
        //                 });

        //             } else {
        //                 var hwid = "";
        //                 chrome.system.cpu.getInfo(function(info){
        //                     chrome.system.memory.getInfo(function(info2){
        //                         hwid = info.modelName + " " + info2.capacity;
        //                         console.log(info.modelName);
        //                         console.log(info.capacity);
        //                         fetch(`https://api.whop.com/api/v1/licenses/${key}`, {
        //                             method: 'PATCH',
        //                             headers: {
        //                                 'Authorization': `Bearer MTE2OWEzMzE4MWQ1Mzc1NTg3MzVhZDM3YWU0MjdjZTZjYTU3ZTdhMmU4OmI3Y2UzNGE2NTc4MGYzNjZhMDA0NDIzMjhmYjA5N2FjMmRjNjY4YjE2ZQ==`,
        //                                 'Content-Type': 'application/json'
        //                             },
        //                             body: JSON.stringify({
        //                                 metadata: {hwid}
        //                             })
        //                         })
        //                         .then((x) => {
        //                             localStorage.setItem("valid-login", true);
        //                             chrome.storage.sync.set({"valid-login": true}, function() {
        //                                 console.log('Valid login is set to ' + true);
        //                               });

        //                         })
        //                         .catch(err => console.log(err));
        //                     });
        //                 });
        //             }
        //         }
        //     }
        // });

        // if (localStorage.getItem("valid-login").toString() == "true"){
        //     var returnData = localStorage.getItem("signinData").toString().split("~")
        //     console.log(returnData)
        //     return {
        //         success: true,
        //         profile: returnData[0].toString(),
        //         type: returnData[1].toString(),
        //         discord: returnData[2].toString(),
        //     }
        // } else {
        //     return {
        //         success:false
        //     }
        // }
    },
    onProfileImport: async () => {
        // open file prompt dialog
        let fileHandle;
        [fileHandle] = await window.showOpenFilePicker();

        // gets file that you choose in the prompt
        const file = await fileHandle.getFile();

        // gets the text that is inside the `file`
        const stringInFile = await file.text();

        // convert stringed JSON to regular JSON object
        const profiles = JSON.parse(stringInFile);

        // update profiles to API
        teliosUI.updateProfiles(profiles);
        chrome.storage.sync.set({'profiles': JSON.stringify(profiles)}, function() {
            console.log('Profiles is set to ' + JSON.stringify(profiles));
          });
    },
    onProfileExport: () => {
        function download(content, fileName, contentType) {

            //creating new element for the button
            var a = document.createElement("a");

            //grab contents of the profile
            var file = new Blob([content], {type: contentType});
            a.href = URL.createObjectURL(file);
            a.download = fileName;
            a.click();
        }

        //download json file
        download(JSON.stringify(profiles), 'profiles.json', 'text/plain');
    },
    onProfileCreate: (profileData) => {
        profiles.push(profileData);
        teliosUI.updateProfiles(profiles);
        chrome.storage.sync.set({'profiles': JSON.stringify(profiles)}, function() {
            console.log('Profiles is set to ' + JSON.stringify(profiles));
          });
    },
    onProfileDelete: (profileData) => {
        profiles.splice(profiles.indexOf(profileData), 1);
        teliosUI.updateProfiles(profiles);
        chrome.storage.sync.set({'profiles': JSON.stringify(profiles)}, function() {
            console.log('Profiles is set to ' + JSON.stringify(profiles));
          });
    },
    onFeatureChange: (site, feature, newValue) => {
        console.log("Feature changed for: " + site);

        console.log(feature);
        console.log(newValue);

        // TODO: CONNECT THIS FEATURE CHANGE TO MODULE

        for(let i = 0; i < features.length; i++) {
            let site = features[i];
            if(site.features && site.features.length) {
                for(let j = 0; j < site.features.length; j++) {
                    let _feature = site.features[j];
                    if(_feature === feature) {
                        features[i].features[j].value = newValue;
                    }
                }
            }
        }

        chrome.storage.sync.set({'options': JSON.stringify(features)}, function() {
            console.log('options is set to ' + JSON.stringify(features));
          });
    },
    onWebhookSave: (w) => {
        webhook = w;
        chrome.storage.sync.set({'webhook': w}, function() {
            console.log('Webhook is set to ' + w);
          });
                  const request = new XMLHttpRequest();
                  request.open("POST", w.toString());
                  request.setRequestHeader('Content-type', 'application/json');

                  let data = {
                      "content": null,
                      "embeds": [
                        {
                          "title": "Shopify Checkout!",
                          "color": 4732533,
                          "fields": [
                            {
                              "name": "Product",
                              "value": "TEST"
                            },
                            {
                              "name": "Size",
                              "value": "12",
                              "inline": true
                            },
                            {
                              "name": "price",
                              "value": "12.99",
                              "inline": true
                            },
                            {
                              "name": "Profile",
                              "value": ` || TEST ||`,
                              
                            },
                            {
                              "name": "Order #",
                              "value": ` || TEST ||`,
                              "inline": true
                            }
                          ],
                          "footer": {
                            "text": "Telios AIO v1.2.2",
                            "icon_url": "https://images-ext-1.discordapp.net/external/cy0voXUi49kVgrLZPaDK05fBT9qew1TVHGSuHEpSjx4/%3Fwidth%3D666%26height%3D677/https/media.discordapp.net/attachments/900467028559822889/934232769402388490/IMG_3460.png?width=665&height=676"
                          },
                          "thumbnail": {
                            "url": "https://images-ext-1.discordapp.net/external/cy0voXUi49kVgrLZPaDK05fBT9qew1TVHGSuHEpSjx4/%3Fwidth%3D666%26height%3D677/https/media.discordapp.net/attachments/900467028559822889/934232769402388490/IMG_3460.png?width=665&height=676"
                          },
                        }
                      ],
                      "username": "Telio Success",
                      "avatar_url": "https://media.discordapp.net/attachments/900467028559822889/934232769402388490/IMG_3460.png?width=666&height=677"
                }
                
                  request.send(JSON.stringify(data));

              }
            });


const pageDashboard = $(".page-dashboard");
const pageModules = $(".page-modules");
const pageFeatures = $(".page-features");
const pageProfiles = $(".page-profiles");
const pageSettings = $(".page-settings");

const buttonDashboard = $(".buttondashboard");
const buttonFeatures  = $(".buttonfeatures");
const buttonModules  = $(".buttonModules");
const buttonProfiles  = $(".buttonprofiles");
const buttonSettings  = $(".buttonsettings");

const GuidesLink = $(".guides-drops-text");

const buttonLogin = $(".login-button");
const buttonLogout = $(".logout-button");

let inputLicense = $(".login-prompt .text-field");

let inputProfileName = $($(".shipping-body").children(".text-field")[0]);
let inputFirstName = $($($(".shipping-body").children(".row")[0]).children(".text-field")[0]);
let inputLastName = $($($(".shipping-body").children(".row")[0]).children(".text-field")[1]);
let inputEmail = $($(".shipping-body").children(".text-field")[1]);
let inputAddress = $($(".shipping-body").children(".text-field")[2]);
let inputPhone = $($($(".shipping-body").children(".row")[1]).children(".text-field")[0]);
let inputZipcode = $($($(".shipping-body").children(".row")[1]).children(".text-field")[1]);
let inputCity = $($(".shipping-body").children(".text-field")[3]);
let inputState = $($($(".shipping-body").children(".row")[2]).children(".text-field")[0]);
let inputCountry = $($($(".shipping-body").children(".row")[2]).children(".text-field")[1]);

let inputCardName = $($(".billing-body").children(".text-field")[0]);
let inputCardNumber = $($(".billing-body").children(".text-field")[1]);
let inputCardMonth = $($($(".billing-body").children(".row")[0]).children(".text-field")[0]);
let inputCardYear = $($($(".billing-body").children(".row")[0]).children(".text-field")[1]);
let inputCardCVV = $($($(".billing-body").children(".row")[0]).children(".text-field")[2]);
let inputCardType = $($(".billing-body").children(".text-field")[2]);

let inputSettingsWebhook = $(".settings2").children(".row").children(".text-field");

const bodyDiv = $(".body");
const loginDiv = $(".login");


buttonDashboard.click(() => changePage("dashboard"));
buttonModules.click(() => changePage("modules"));
buttonFeatures.click(() => changePage("features"));
buttonProfiles.click(() => changePage("profiles"));
buttonSettings.click(() => changePage("settings"));

function retrieveKeyValueAsynch(key) {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(key, (items) => {
          if (chrome.runtime.lastError) {
            return reject(chrome.runtime.lastError);
          }
          resolve(items);
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {

    var link = document.getElementById('guide-link');
    // onClick's logic below:
    link.addEventListener('click', function() {
        chrome.runtime.sendMessage({greeting: "guide"}, function(response) {
            console.log(response.open);
          });
    });
});


buttonLogin.click(async () => {
        const success = await teliosUI.tryLogin(inputLicense.val());
    if(success) {
        he(bodyDiv, true);
        bodyDiv.hide();
        bodyDiv.fadeIn(350);
        changePage("dashboard");
    }
    });

buttonLogout.click(() => {
    teliosUI.logout();
    bodyDiv.fadeOut(350);
    setTimeout(() => {
        he(bodyDiv, false);
    }, 350);
});

teliosUI.preCheckSavedLicense();
let profiles =  teliosUI.preCheckSavedProfiles();
let features = teliosUI.preCheckSavedFeatures();

$(".add-card").click(() => {
    $(".cards-list").children(".card-selected").removeClass("card-selected");

    inputProfileName.val("");
    inputFirstName.val("");
    inputLastName.val("");
    inputEmail.val("");
    inputAddress.val("");
    inputPhone.val("");
    inputZipcode.val("");
    inputCity.val("");
    inputState.val("");
    inputCountry.val("");

    inputCardName.val("");
    inputCardType.val("");
    inputCardNumber.val("");
    inputCardMonth.val("");
    inputCardYear.val("");
    inputCardCVV.val("");
});

$(".import-button").click(() => {
    teliosUI.data.onProfileImport();
});

$(".export-button").click(() => {
    teliosUI.data.onProfileExport();
})

$(".create").click(() => {
    const data = {
        name: inputProfileName.val(),
        firstName: inputFirstName.val(),
        lastName: inputLastName.val(),
        email: inputEmail.val(),
        address: inputAddress.val(),
        phone: inputPhone.val(),
        zipcode: inputZipcode.val(),
        city: inputCity.val(),
        state: inputState.val(),
        country: inputCountry.val(),
        card: {
            name: inputCardName.val(),
            type: inputCardType.val(),
            lastFour: inputCardNumber.val().substring(inputCardNumber.val().length - 4),
            expiration: `${inputCardMonth.val()}/${inputCardYear.val()}`,
            cardNumber: inputCardNumber.val(),
            month: inputCardMonth.val(),
            year: inputCardYear.val(),
            cvv: inputCardCVV.val(),
        }
    };
    teliosUI.data.onProfileCreate(data);
});

$(".delete").click(() => {
    teliosUI.data.onProfileDelete(teliosUI.currentProfile);
});

$(".webhook-save-button").click(() => {
    teliosUI.data.onWebhookSave(inputSettingsWebhook.val());

});

let firstFeatures = true;
const changePage = (page) => {

    const setTabButton = (button, enabled) => {
        if(enabled) {
            button.children(".tab-text").addClass("tab-selected");
            button.children(".tab-selector").addClass("tab-selected");
        } else {
            button.children(".tab-text").removeClass("tab-selected");
            button.children(".tab-selector").removeClass("tab-selected");
        }
    };


    if(page === "dashboard") {
        setTabButton(buttonDashboard, true);
        setTabButton(buttonModules , false);
        setTabButton(buttonFeatures , false);
        setTabButton(buttonProfiles , false);
        setTabButton(buttonSettings , false);

        buttonDashboard.children("img").attr("src", "images/cards2.png");
        buttonModules.children("img").attr("src", "images/categories.png");
        buttonFeatures.children("img").attr("src", "images/infeature.png");
        buttonProfiles.children("img").attr("src", "images/Vector.png");
        buttonSettings.children("img").attr("src", "images/control-panel.png");

        he(pageDashboard, true);
        he(pageModules, false);
        he(pageFeatures, false);
        he(pageProfiles, false);
        he(pageSettings, false);

    } else if(page ==="modules"){
        if(firstFeatures) {
            firstFeatures = false;
            $($(".selector-item")[0]).click();
        }
        setTabButton(buttonDashboard, false);
        setTabButton(buttonModules , true);
        setTabButton(buttonFeatures , false);
        setTabButton(buttonProfiles , false);
        setTabButton(buttonSettings , false);
        buttonDashboard.children("img").attr("src", "images/dashboardUnselected.png");
        buttonFeatures.children("img").attr("src", "images/infeature.png");
        buttonModules.children("img").attr("src", "images/featuresSelected.png");
        buttonProfiles.children("img").attr("src", "images/Vector.png");
        buttonSettings.children("img").attr("src", "images/control-panel.png");
        he(pageDashboard, false);
        he(pageModules, true);
        he(pageFeatures, false);
        he(pageProfiles, false);
        he(pageSettings, false);
    }
    else if(page === "features") {
        setTabButton(buttonDashboard, false);
        setTabButton(buttonModules , false);
        setTabButton(buttonFeatures , true);
        setTabButton(buttonProfiles , false);
        setTabButton(buttonSettings , false);

        buttonDashboard.children("img").attr("src", "images/dashboardUnselected.png");
        buttonFeatures.children("img").attr("src", "images/feature.png");
        buttonModules.children("img").attr("src", "images/categories.png");
        buttonProfiles.children("img").attr("src", "images/Vector.png");
        buttonSettings.children("img").attr("src", "images/control-panel.png");

        he(pageDashboard, false);
        he(pageModules, false);
        he(pageFeatures, true);
        he(pageProfiles, false);
        he(pageSettings, false);
    } else if(page === "profiles") {
        setTabButton(buttonDashboard, false);
        setTabButton(buttonFeatures , false);
        setTabButton(buttonProfiles , true);
        setTabButton(buttonSettings , false);
        setTabButton(buttonModules , false);

        buttonDashboard.children("img").attr("src", "images/dashboardUnselected.png");
        buttonFeatures.children("img").attr("src", "images/infeature.png");
        buttonProfiles.children("img").attr("src", "images/profilesSelected.png");
        buttonSettings.children("img").attr("src", "images/control-panel.png");
        buttonModules.children("img").attr("src", "images/categories.png");

        he(pageDashboard, false);
        he(pageModules, false);
        he(pageFeatures, false);
        he(pageProfiles, true);
        he(pageSettings, false);

    } else if(page === "settings") {
        setTabButton(buttonDashboard, false);
        setTabButton(buttonFeatures , false);
        setTabButton(buttonProfiles , false);
        setTabButton(buttonSettings , true);
        setTabButton(buttonModules , false);

        buttonDashboard.children("img").attr("src", "images/dashboardUnselected.png");
        buttonFeatures.children("img").attr("src", "images/infeature.png");
        buttonProfiles.children("img").attr("src", "images/Vector.png");
        buttonSettings.children("img").attr("src", "images/settingsSelected.png");
        buttonModules.children("img").attr("src", "images/categories.png");

        he(pageDashboard, false);
        he(pageModules, false);
        he(pageFeatures, false);
        he(pageProfiles, false);
        he(pageSettings, true);

    }
}

$(".logout-button").click(() => {
    console.log("Logging out");
});

const he = (e, v) => {
    if(v) e.css("display", "flex");
    else e.css("display", "none");
}

const createInput = (e) => {
    const nE = $(`<input placeholder="${e.children(".field-text").text()}" class="${e.attr("class")} input">`);
    e.replaceWith(nE);
    return nE;
}

const defaultFeatures = [
    {
        name: "Bestbuy",
        features: [{
            name: "Autocheckout",
            description: "All orders will be automatically processed",
            value: false
        },
    {
        name: "Autofill",
        description: "All info will be automatically filled",
        value: false
    }]
    },
    {
        name: "Bestbuy CA",
        features: [{
            name: "Autocheckout",
            description: "All orders will be automatically processed",
            value: false
        },
        {
            name: "Autofill",
            description: "All info will be automatically filled",
            value: false
        }]
    },
    {
        name: "Gamestop",
        features: [{
            name: "Autocheckout",
            description: "All orders will be automatically processed",
            value: false
        },
        {
            name: "Autofill",
            description: "All info will be automatically filled",
            value: false
        }]
    },
    {
        name: "Shopify",
        features: [{
            name: "Autocheckout",
            description: "All orders will be automatically processed",
            value: false
        },
        {
            name: "Autofill",
            description: "All info will be automatically filled",
            value: false
        },
        {
            name: "PayPal Checkout",
            description: "The order will place through PayPal if available (if this is selected, do not have autofill or ACO on)",
            value: false
        }]
    },
    {
        name: "Stripe & TL",
        features: [{
            name: "Autocheckout",
            description: "All orders will be automatically processed",
            value: false
        },
        {
            name: "Autofill",
            description: "All info will be automatically filled",
            value: false
        }]
    },
    {
        name: "Supreme",
        features: [{
            name: "Autocheckout",
            description: "All orders will be automatically processed",
            value: false
        },
        {
            name: "Autofill",
            description: "All info will be automatically filled",
            value: false
        }]
    },
    {
        name: "DSG",
        features: [{
            name: "Autocheckout",
            description: "All orders will be automatically processed",
            value: false
        },
        {
            name: "Autofill",
            description: "All info will be automatically filled",
            value: false
        }]
    },
    {
        name: "Snipes",
        features: [{
            name: "Autocheckout",
            description: "All orders will be automatically processed",
            value: false
        },
        {
            name: "Autofill",
            description: "All info will be automatically filled",
            value: false
        }]
    },
    {
        name: "Finish line & JD",
        features: [{
            name: "Autocheckout",
            description: "All orders will be automatically processed",
            value: false
        },
        {
            name: "Autofill",
            description: "All info will be automatically filled",
            value: false
        }]
    },
    {
        name: "New Balance",
        features: [{
            name: "Autocheckout",
            description: "All orders will be automatically processed",
            value: false
        },
        {
            name: "Autofill",
            description: "All info will be automatically filled",
            value: false
        }]
    },
    {
        name: "Zalando",
        features: [{
            name: "Request mode",
            description: "All orders will be handled through request, allowing a quick and smooth process",
            value: false
        }]
    }
];

he(bodyDiv, false);
he(loginDiv, true);

inputLicense = createInput(inputLicense);

inputProfileName = createInput(inputProfileName);
inputFirstName = createInput(inputFirstName);
inputLastName = createInput(inputLastName);
inputEmail = createInput(inputEmail);
inputAddress = createInput(inputAddress);
inputPhone = createInput(inputPhone);
inputZipcode = createInput(inputZipcode);
inputCity = createInput(inputCity);
inputState = createInput(inputState);
inputCountry = createInput(inputCountry);

inputCardName = createInput(inputCardName);
inputCardNumber = createInput(inputCardNumber);
inputCardMonth = createInput(inputCardMonth);
inputCardYear = createInput(inputCardYear);
inputCardCVV = createInput(inputCardCVV);
inputCardType = createInput(inputCardType);

inputSettingsWebhook = createInput(inputSettingsWebhook);
inputSettingsWebhook.css("width", "30vw");

$(".filter-button").hide();

teliosUI.updateTotalCheckouts(0);
teliosUI.updateTotalSpent(0);
teliosUI.updateTotalFailures(0);
teliosUI.updateRecentCheckouts([
    {
        image: "images/B37571_1-1.png",
        name: "Item Name",
        size: "US 10 Mens",
        date: "10/4/2021",
        price: "$420",
        order: "#01232412",
        site: "Site Here"
    }
]);
console.log("right before updating everything we have: " + profiles)
teliosUI.updateProfiles(profiles);
teliosUI.updateVersion("v1.2.2");
teliosUI.updateFeatures(features);
teliosUI.updateWebhook(webhook);


const gap = 280;

const carousel = document.getElementById("carousel"),
    content = document.querySelector(".selector"),
    next = document.getElementById("next"),
    prev = document.getElementById("prev");

next.addEventListener("click", e => {
    carousel.scrollBy(width + gap, 0);
    if (carousel.scrollWidth !== 0) {
        prev.style.display = "flex";
    }
    if (content.scrollWidth - width - gap <= carousel.scrollLeft + width) {
        next.style.display = "flex";
    }
});
prev.addEventListener("click", e => {
    carousel.scrollBy(-(width + gap), 0);
    if (carousel.scrollLeft - width - gap <= 0) {
        prev.style.display = "flex";
    }
    if (!content.scrollWidth - width - gap <= carousel.scrollLeft + width) {
        next.style.display = "flex";
    }
});

let width = carousel.offsetWidth;

$('select').each(function () {

    var $this = $(this),
        numberOfOptions = $(this).children('option').length;

        $this.addClass('s-hidden');

    $this.wrap('<div class="select"></div>');
    $this.after('<div class="styledSelect"></div>');

    var $styledSelect = $this.next('div.styledSelect');
    $styledSelect.text($this.children('option').eq(0).text());

    var $list = $('<ul />', {
        'class': 'options'
    }).insertAfter($styledSelect);

    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }

    var $listItems = $list.children('li');

    $styledSelect.click(function (e) {
        e.stopPropagation();
        $('div.styledSelect.active').each(function () {
            $(this).removeClass('active').next('ul.options').hide();
        });
        $(this).toggleClass('active').next('ul.options').toggle();
    });

    $listItems.click(function (e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide();
    });

    $(document).click(function () {
        $styledSelect.removeClass('active');
        $list.hide();
    });

});
