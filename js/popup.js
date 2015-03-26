var bg = chrome.extension.getBackgroundPage();

chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
	var thisUrl = tabs[0].url;
	if((thisUrl.indexOf("chrome://") != -1) || (thisUrl.indexOf("chrome-extension://") != -1)){
		$('body').addClass('hide-add-url')
	} else {
		$('.this-site').text(simple_domain(tabs[0].url))
	}
});

chrome.storage.sync.get(function (result){
	if(!result.loveOn){
		$('body').addClass('love-off');
	}
})



$(function() {
	$('.add-url').click(function(e){
		if(!$('.hide-add-url').length){
	        addUrl();
	        window.close();
		}
        e.preventDefault();
	})

	$('#open-options').click(function(e){
		chrome.tabs.create({url: 'chrome://extensions?options=pfcedikjhcnichhgpjnnjhdnkamdcnpm'});
        window.close();
        e.preventDefault();
	})

	// $('#open-options').click(function(e){
	// 	chrome.tabs.create({url: 'chrome-extension://dkiedlkkgecifhikgblefjmiehccoomk/options.html#/'});
 //        window.close();
 //        e.preventDefault();
	// })

    $('#love-on').click(function (e){
	    chrome.storage.sync.set({loveOn: true});
        toggleIcon(true)
        window.close();
    	e.preventDefault();
    })
});