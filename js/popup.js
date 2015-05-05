var bg = chrome.extension.getBackgroundPage();

chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
	var thisUrl = tabs[0].url;
	if((thisUrl.indexOf("chrome://") != -1) || (thisUrl.indexOf("chrome-extension://") != -1)){
		$('body').addClass('hide-add-url')
	} else {
		$('.this-site').text(simple_domain(tabs[0].url))
	}
});

chrome.alarms.get('reEnable', function(alarm){
	if(alarm !== undefined){
		$('body').addClass('disabled');
	}
})

$(function() {
	$('.add-url').click(function(e){
		if(!$('.hide-add-url').length){
			$('body').addClass('adding-url-show')
	        setTimeout(function(){
		        addUrl();
		        window.close();
	        }, 2500)
		}
        e.preventDefault();
	})

	$('#open-options').click(function(e){
		chrome.tabs.create({url: 'chrome://extensions?options='+chrome.runtime.id});
        window.close();
        e.preventDefault();
	})


    $('#re-enable').click(function (e){
	    chrome.runtime.sendMessage({enable: true});
        window.close();
    	e.preventDefault();
    })
});