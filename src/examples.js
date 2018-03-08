const qdb = require("./qdb-api.js");

//Get 5 random quotes that have a positive score
qdb.random(5, true).then(quotes => {
	console.log("\n\n");
	console.log("5 random quotes that have a positive score\n");
	//quotes is an array of quote objects
	quotes.forEach(quote => {
		console.log(quote.text);
		console.log(`Score: ${quote.score} - ID: ${quote.id}\n`);
	});
});

//Get the latest quote
qdb.latest().then(quote => {
	console.log("\n\n");
	//Notice that since we didn't put the count, it defaulted
	//to 1, and it returned a quote object instead of an array
	console.log("Latest quote\n");
	console.log(quote.text);
	console.log(`Score: ${quote.score} - ID: ${quote.id}\n`);
});

//Get the top 42 quotes
qdb.top(42).then(quotes => {
	console.log("\n\n");
	console.log("The 42nd quote on the top 100\n");
	console.log(quotes[41].text);
	console.log(`Score: ${quotes[41].score} - ID: ${quotes[41].id}`);
});

//Get a quote from it's ID
qdb.get(777977).then(quote => {
	console.log("\n\n");
	console.log("One of my favorite quotes\n");
	console.log(quote.text);
	console.log(`Score: ${quote.score}`);
});

//Search for a quote
qdb.search("hunter2", 1).then(quote => {
	console.log("\n\n");
	console.log("Top quote of all time\n");
	console.log(quote.text);
	console.log(`Score: ${quote.score} - ID: ${quote.id}`);
});

//Congradulations for making it here! Now you're a qdb-api-plus master!
