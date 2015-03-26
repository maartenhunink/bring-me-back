function simple_domain(url){
    var matches = url.match(/^https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i);
    return matches[1];
}

// check if an object is empty or not
// Speed up calls to hasOwnProperty
var hasOwnProperty = Object.prototype.hasOwnProperty;
function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

function functiontofindIndexByKeyValue(arraytosearch, key, valuetosearch) {
    for (var i = 0; i < arraytosearch.length; i++) {
        if (arraytosearch[i][key] == valuetosearch) {
            return i;
        }
    }
    return null;
}

function addUrl() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.storage.sync.get({urls: []},function (result){
            urlsToLove = result.urls;
            var newUrl = '*://'+simple_domain(tabs[0].url)+'/*';
            if(functiontofindIndexByKeyValue(urlsToLove, "url", newUrl) == null){
                urlsToLove.push({'title' : tabs[0].title, 'url' : newUrl, 'favIconUrl' : tabs[0].favIconUrl});
            }
            chrome.storage.sync.set({loveOn: true, "urls": urlsToLove});
            toggleIcon(true)
            chrome.tabs.update({
                url: chrome.extension.getURL('index.html?newurl=true')
            });
        });
    });
}

function toggleIcon(on){
    if(on){
      chrome.browserAction.setIcon({path:'img/icon.png'})  
    } else {
      chrome.browserAction.setIcon({path:'img/icon-grey.png'})  
    }
}
