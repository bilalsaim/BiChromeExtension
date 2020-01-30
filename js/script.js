chrome.storage.local.get(['urlToConnect'], function(result) {
    $("#p1limit").val(result.urlToConnect)
});

$("#p1limit").change(function(){
    chrome.storage.local.set({urlToConnect: $("#p1limit").val()}, function() {
        console.log('Value is set to ' + $("#p1limit").val());
    });
});

chrome.runtime.sendMessage({method: "getUrlToConnect"}, function(response) {
    console.log("aa");
    console.log(response.urlToConnect);
});