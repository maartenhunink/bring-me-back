chrome.storage.onChanged.addListener(function(){
  getUrls();
})

// testing to get user info, is just returning an id now, no real info yet...
// chrome.identity.getProfileUserInfo(function(result){
//   console.log(result)
// })

chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install" || details.reason == "update"){
        
        // TODO: only show intro page on install not update
        chrome.tabs.create({
          url: chrome.extension.getURL('index.html?newinstall=true')
        })


        // TODO: when updating, not refresh all data.

        // TODO: remove this, so people start with a blank slate
        // adding default urls
        blockedUrls = [
        {
          'favIconUrl': 'http://www.nrc.nl/favicon.ico',
          'title' : 'nrc.nl - Snelle duiding bij het belangrijkste nieuws',
          'url' : '*://www.nrc.nl/*'
        }, {
          'favIconUrl': 'data:image/png;base64,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',
          'title' : 'reddit: the front page of the internet',
          'url' : '*://www.reddit.com/*',
        }, {
          'favIconUrl': 'http://static.digg.com/static/fe/0d2527/images/digg_favicon.png',
          'title' : 'Digg - What the Internet is talking about right now',
          'url' : '*://digg.com/*'
        }];

        chrome.storage.sync.set({loveOn: true, "urls": blockedUrls});

        // add all cards to the database
        var server;
        db.open( {
            server: 'love',
            version: 2,
            schema: {
                cards: {
                    key: { keyPath: 'id' , autoIncrement: true }
                }
            }
        } ).then( function ( s ) {
            server = s;
            server.cards.query()
              .filter()
              .execute()
              .then( function ( results ) {
                  if(isEmpty(results)){
                    // get json without jquery
                    request = new XMLHttpRequest();
                    request.open('GET', 'js/data.json', true);

                    request.onload = function() {
                      if (request.status >= 200 && request.status < 400){
                        // Success!
                        result = JSON.parse(request.responseText);
                        server.cards.add(result).then( function ( item ) {
                        });  
                      }
                    };

                    request.send();

                  } else {
                    // for now, clear the database and put the new stuff in
                    server.cards.clear().then(function(){
                      request = new XMLHttpRequest();
                      request.open('GET', 'js/data.json', true);

                      request.onload = function() {
                        if (request.status >= 200 && request.status < 400){
                          // Success!
                          result = JSON.parse(request.responseText);
                          server.cards.add(result).then( function ( item ) {
                          });  
                        }
                      };

                      request.send();
                    })
                  }
              } );


        } );

    }
});

chrome.contextMenus.create({"title": 'Replace page with love', "contexts": ['all'], "onclick": addUrl});

function replaceUrls(){
  chrome.tabs.update({
    url: chrome.extension.getURL('index.html')
  });
  return {cancel: true}; 
}

getUrls();

function getUrls(){
  chrome.storage.sync.get(null,function (obj){
    var blockedUrls = obj.urls;
    if(chrome.webRequest.onBeforeRequest.hasListener){
      chrome.webRequest.onBeforeRequest.removeListener(replaceUrls);
    }
    if(blockedUrls.length && obj.loveOn){

      var onlyUrls = []
      Object.keys(blockedUrls).forEach(function (key) {
          onlyUrls.push(blockedUrls[key].url);    
      });

      chrome.webRequest.onBeforeRequest.addListener(
        replaceUrls,
        {
          urls: onlyUrls,
          types: ['main_frame']
        },
        ["blocking"]
      );
      chrome.tabs.query({url: onlyUrls}, function(results){
        for (var i = 0; i < results.length; i++) {
          chrome.tabs.update(results[i].id, {
            url: chrome.extension.getURL('index.html')
          })
        }
      })
    }
  });
}

