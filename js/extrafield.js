

$(document).ready(function()
{
    var te = $("#tsf");

    var url = "http://";

    chrome.runtime.sendMessage({method: "getUrlToConnect"}, function(response) {
        console.log(response.urlToConnect);
        url = response.urlToConnect;

        te.append("<input type='text' value='"+url+"'/>");
    });

    te.append("<input type='text' value='"+url+"'/>");

    te.append("<select class=\"js-example-basic-multiple\" name=\"states[]\" multiple=\"multiple\">\n" +
        "  <option value=\"AL\">Alabama</option>\n" +
        "  <option value=\"WY\">Wyoming</option>\n" +
        "</select>");


    $('.js-example-basic-multiple').select2();
});

