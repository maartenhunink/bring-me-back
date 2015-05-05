$(function() {

	var port = chrome.runtime.connect({name: "knockknock"});
	port.postMessage({getCard: true});
	port.onMessage.addListener(function(response) {
		var section = $('#section');
		var template = Handlebars.compile(section.html());
		section.after(template(response.card))

		var credits = $('#credits');
		var template = Handlebars.compile(credits.html());
		credits.after(template(response.card))
		Reveal.initialize({
			controls: false,
			progress: false,
			history: true,
			center: true,
			overview: false,

			theme: 'default', 
			transition: 'linear', 
			backgroundTransition: 'slide'

		});
	});

});

