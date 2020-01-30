var te = $("#tsf");

var url = "http://";

chrome.runtime.sendMessage({method: "getUrlToConnect"}, function(response) {
    console.log(response.urlToConnect);
    url = response.urlToConnect;

    te.append("<input type='text' value='"+url+"'/>");
});

te.append("<input type='text' value='"+url+"'/>");