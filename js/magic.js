$(function() {

	var server;
	db.open( {
	    server: 'bringmeback',
	    version: 1,
	    schema: {
	        cards: {
	            key: { keyPath: 'id' , autoIncrement: true }
	        }
	    }
	} ).then( function ( server ) {
        
        // for now clear and add the data, because refreshing the app takes to much time...
        server.cards.clear().then(function(){
        	$.getJSON('js/data.json', function(result){
				server.cards.add(result).then( function ( item ) {
					server.cards.query()
						.filter()
						.execute()
						.then(function (result) {

							var newDeck = Math.floor(Math.random() * (result.length));
							chrome.storage.sync.get(['lastRefresh', 'deckId'],function (storageResult){
								if(Reveal.getQueryHash().newinstall){
									newDeck = 0;
								} else if(isEmpty(storageResult)){
           							chrome.storage.sync.set({lastRefresh: Date.now(), deckId : newDeck});
								} else {
									if((Date.now() - storageResult.lastRefresh) > 300000){
										// show new deck
										chrome.storage.sync.set({lastRefresh: Date.now(), deckId : newDeck});
									} else {
										//show old deck
										newDeck = storageResult.deckId;
									}
								}
								
								var section = $('#section');
								var template = Handlebars.compile(section.html());
								section.after(template(result[newDeck]))

								var credits = $('#credits');
								var template = Handlebars.compile(credits.html());
								credits.after(template(result[newDeck]))

								Reveal.initialize({
									controls: false,
									progress: false,
									history: true,
									center: true,
									overview: false,

									theme: 'default', // available themes are in /css/theme
									transition: 'linear', // default/cube/page/concave/zoom/linear/fade/none
									backgroundTransition: 'slide'

									// Parallax scrolling
									// parallaxBackgroundImage: 'https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg',
									// parallaxBackgroundSize: '2100px 900px',

								});
							})
					  	});
				})
			})
        })	
	});
});

