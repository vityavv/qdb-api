/**
 * THIS IS AN OLD FILE
 * You must be looking for example.js
 * Although everything in this file will work except the search function
 */

const qdb = require('./qdb-api');

qdb
	.search('tom', 0, 10)
	.then(quotes => {
		quotes.forEach(quote => {
			console.log(quote.id);
			console.log(quote.score);
			console.log(quote.text);
			console.log('\n');
		});
	})
	.catch(reason => {
		console.log(reason);
	});

qdb
	.get(4680)
	.then(quote => {
		console.log(quote.id);
		console.log(quote.score);
		console.log(quote.text);
	})
	.catch(reason => {
		console.log(reason);
	});

qdb
	.random()
	.then(quote => {
		console.log(quote.id);
		console.log(quote.score);
		console.log(quote.text);
	})
	.catch(reason => {
		console.log(reason);
	});

qdb
	.latest()
	.then(quote => {
		console.log(quote.id);
		console.log(quote.score);
		console.log(quote.text);
	})
	.catch(reason => {
		console.log(reason);
	});
