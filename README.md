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
* You can get the first search result with qdb-api-plus

## APIs available

* Get a random quote or a random ID
* Get the latest quote or it's ID
* Get specific quote by it's id
* Search for a quote

### Get a random quote

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

```Javascript
qdb.latest()
	.then(id => {
		console.log(id);
	})
	.catch(reason => {
		console.log(reason);
	});
```

### Get a specific quote by its ID
#### `ID number`
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
#### `Search string`
#### `Sort by` - `0` for score, `1` for number
#### `Number of results` - `10`, `25`, `50`, `75`, or `100`
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

# Disclaimer

Please note that is an unofficial API.
