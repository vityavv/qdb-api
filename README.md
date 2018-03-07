# qdb-api-plus

A better API wrapper for [Quote Database](http://bash.org/). Fork of [qdb-api](https://github.com/MarkNjunge/qdb-api).

Looking for a REST API? See [qdb-rest-api](https://github.com/MarkNjunge/qdb-rest-api)

`npm install qdb-api-plus`

```Javascript
const qdb = require('qdb-api-plus')
```

## qdb-api vs qdb-api-plus

* qdb-api-plus doesn't use `axios`
* qdb-api-plus has *slightly* better documentation
* qdb-api-plus has a couple more methods like `latestID` and `randomID`
* You can search for any number of results under 100 with qdb-api-plus, instead of being constrained to 10, 25, 50, 75, or 100

## Methods available

* Get a random quote or a random ID
* Get the latest quote or it's ID
* Get specific quote by it's id
* Search for a quote

### Get a random quote
Example:
```Javascript
qdb.random()
	.then(quote => {
		console.log(quote.id);
		console.log(quote.score);
		console.log(quote.text);
	})
	.catch(reason => {
		console.log(reason);
	});
```

### Get a random quote ID
Example:
```Javascript
qdb.randomID()
	.then(id => {
		console.log(id);
	})
	.catch(reason => {
		console.log(reason);
	});
```

### Get the latest quote
Example:
```Javascript
qdb.latest()
	.then(quote => {
		console.log(quote.id);
		console.log(quote.score);
		console.log(quote.text);
	})
	.catch(reason => {
		console.log(reason);
	});
```

### Get the latest quote ID
Example:
```Javascript
qdb.latestID()
	.then(id => {
		console.log(id);
	})
	.catch(reason => {
		console.log(reason);
	});
```

### Get a specific quote by its ID
**Parameters**

* `ID number`

Example:
```Javascript
qdb.get(4680)
	.then(quote => {
		console.log(quote.id);
		console.log(quote.score);
		console.log(quote.text);
	})
	.catch(reason => {
		console.log(reason);
	});
```

### Search for a quote

**Parameters**

* `Search string`
* `Sort by` - `0` for score, `1` for number
* `Number of results` - `1`, `10`, `25`, `50`, `75`, or `100`

**Returns** a quote if `Number of results` is 1, and an array of quotes otherwise

Example:
```Javascript
qdb.search('tom', 0, 10)
	.then(quotes => {
		quotes.forEach(quote => {
			console.log(quote.id);
			console.log(quote.score);
			console.log(quote.text);
		});
	})
	.catch(reason => {
		console.log(reason);
	});
```

## How it works
First, the program gets a specific bash.org website:

```Javascript
`http://bash.org/?${id}` //Get specific ID
'http://bash.org/?latest' //Latest quote/ID
'http://bash.org/?random' //Random quote/ID
`http://bash.org/?search=${query}&sort=${sort}&show=${count}` //Search
```

Then, it uses `cheerio` to scrape the page for the quote text, the votes, and the ID.

# Disclaimer

Please note that is an unofficial API.
