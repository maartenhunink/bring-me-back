$(function() {

	var db = new Dexie('bring-me-back');
    db.version(1).stores({
        cards: "++id,text,views"
    });

    db.open(); // Will resolve when data is fully populated (or fail if error)

    // Following operation will be queued until we're finished populating data:
    db.cards.orderBy('views').limit(20).toArray(function (obj) {

		chrome.storage.sync.get(['lastRefresh', 'cardId'],function (storageResult){
			if(isEmpty(storageResult) || (Date.now() - storageResult.lastRefresh) > 300000){
				// show new card
				randomNumb = Math.floor(Math.random() * (obj.length))
				newCardId = obj[randomNumb].id;
				chrome.storage.sync.set({lastRefresh: Date.now(), cardId : newCardId});
				db.cards.update(newCardId, {views: obj[randomNumb].views+1})
			} else {
				//show old card
				newCardId = storageResult.cardId;
			}
			db.cards.where('id').equals(newCardId).each(function(obj){
				var section = $('#section');
				var template = Handlebars.compile(section.html());
				section.after(template(obj))

				var credits = $('#credits');
				var template = Handlebars.compile(credits.html());
				credits.after(template(obj))
				Reveal.initialize({
					controls: false,
					progress: false,
					history: true,
					center: true,
					overview: false,

					theme: 'default', // available themes are in /css/theme
					transition: 'linear', // default/cube/page/concave/zoom/linear/fade/none
					backgroundTransition: 'slide'

				});

			})

		})
    }).then(function () {
        console.log("Finished.");
        // db.delete();
    }).catch(function (error) {
        // In our each() callback above fails, OR db.open() fails due to any reason,
        // including our ajax call failed, this operation will fail and we will get
        // the error here!
        console.error(error.stack || error);
        // Note that we could also have catched it on db.open() but in this sample,
        // we show it here.
    });

});

