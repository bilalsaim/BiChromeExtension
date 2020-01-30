
var tabid=-1;
var sitelist = [];
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){

    if (request.method == "getUrlToConnect") {
        setTimeout(function() {
        chrome.storage.local.get(['urlToConnect'], function(result) {
                sendResponse({urlToConnect: result.urlToConnect});
        }); } ,1);
        return true;
    }

    if (request.todo == "event")
    {
        chrome.tabs.query({active:true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {todo:request.todoextra, plimit: request.plimit,
                    psecond: request.psecond, psearch: request.psearch},
                function(response) {
                    if(response.result == "pboards") {
                        showMessage("BiSocial Done",response.notif);
                    }
                    else if(response.result == "plist")
                    {
                        if(response.sitelist.length !=0 )
                        {
                            tabid = tabs[0].id;
                            sitelist = response.sitelist;
                            siteFollow();
                        }
                        else
                            showMessage("BiSocial Warning!","There is no user!");
                    }

                });
        });
    }
});

function siteFollow() {
    if(sitelist.length != 0){
        chrome.tabs.update(tabid,{url: sitelist[0]},function(tab) {
        });
        sitelist.shift();
    }
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
            if(tabid != -1 && tabid == tabId)
            {
                chrome.tabs.sendMessage(tabid, {todo: 'pfollow', psecond: 5},function (response) {
                    if(response.result == "pfollow")
                    {
                        if(sitelist.length != 0)
                        {
                            siteFollow();
                        }
                        else
                        {
                            showMessage("BiSocial Done!","Pinterest followed all people which you wanted!");
                            tabid = -1;
                        }
                    }
                });
            }
        }
});


function showMessage(title, message) {
    var notifOptions = {
        type: "progress",
        iconUrl: "icon-128.png",
        title: title,
        message: message
    };
    chrome.notifications.create('limitNotif', notifOptions);
}


var menuItem = {
    "id": "Speak",
    "title": "Go to Page",
    "contexts": ["all"]
};

chrome.contextMenus.create(menuItem);



