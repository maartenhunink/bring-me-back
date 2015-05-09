$(function() {
  var port = chrome.runtime.connect({name: "knockknock"});
  port.postMessage({isEnabled: true});
  port.onMessage.addListener(function(response) {
    if(response.enabled){
		chrome.storage.sync.get('facebookTimeline',function (result){
			if(isEmpty(result) || !result.facebookTimeline){
				$('body').addClass('bmb-show-timeline')
			} else {
				hideTimeline()
			}
		})
    } else {
    	$('body').addClass('bmb-show-timeline')    	
    }
  });

	chrome.runtime.onMessage.addListener(
	  function(request, sender, sendResponse) {
	    if (request.hideFacebookTimeline && $('.bmb-show-timeline').length){
			chrome.storage.sync.get('facebookTimeline',function (result){
				if(isEmpty(result) || !result.facebookTimeline){
					// nothing
				} else {
					hideTimeline()
					$('body').removeClass('bmb-show-timeline')
				}
			})
	    }
	  });
});

function hideTimeline(){
	var port = chrome.runtime.connect({name: "knockknock"});
	port.postMessage({getCard: true});
	port.onMessage.addListener(function(response) {
	    var quoteDiv, quoteText, quoteSource;

		quoteDiv = $("<div class='bmb-quote'/>");

		if(response.card.bgImage){
			quoteText = $("<div class='bmb-quote-img'><img src='"+chrome.extension.getURL(response.card.bgImage)+"'></div>")
			    .appendTo(quoteDiv);
		}

		if(response.card.title){
			quoteText = $("<p class='bmb-quote-title'>"+response.card.title+"</p>")
			    .appendTo(quoteDiv);
		}

		if(response.card.text){
			quoteText = $("<p class='bmb-quote-text'>“"+response.card.text+"”</p>")
			    .appendTo(quoteDiv);
		}
		
		if(response.card.source){
			quoteSource = $("<p class='bmb-quote-source'>"+response.card.source+"</p>")
			    .appendTo(quoteDiv);
		}

		$("div#stream_pagelet").append(quoteDiv);
	});

	// This delay ensures that the elements have been created by Facebook's
	// scripts before we attempt to delete them
	setTimeout(function(){

	    // Delete the ticker
	    $("div#pagelet_ticker, div#pagelet_trending_tags_and_topics, div#pagelet_home_stream, div[id^='topnews_main_stream']").remove();

	}, 1000);
}

