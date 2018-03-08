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
* You can search for any number of results under 101 with qdb-api-plus, instead of being constrained to 10, 25, 50, 75, or 100
* You can get any amount of latest/random quotes under 51 with qdb-api-plus, instead of just getting one

## Methods available

* Get up to 50 random quotes at a time
* Get up to 50 of the latest quotes
* Get up to 100 of the top quotes
* Get specific quote by its id
* Search for a quote

### Examples of all of these methods can be found in [`src/examples.js`](src/examples.js)

#### Quote object
The quote object is returned by every method in this library and works like this:

```JavaScript
let quote = {
	text: "The text of the quote",
	id: "The ID of the quote",
	score: "The score of the quote"
};
```

#### `qdb.random` - get random quotes
* `[count = 1]` - The amount of quotes to return (max 50)
* `[over0 = true]` - Whether to return only quotes that have a score greater than zero or not (basically whether to scrape `http://bash.org/?random` or `http://bash.org/?random1

Returns a promise which resolves to a quote object if count is one, and an array of them otherwise

#### `qdb.latest` - get the latest quotes
* `[count = 1]` - The amount of quotes to return (max 50)

Returns a promise which resolves to a quote object if count is one, and an array of them otherwise

#### `qdb.top` - get the top quotes
* `[count = 1]` - The amount of quotes to return (max 50)

Returns a promise which resolves to a quote object if count is one, and an array of them otherwise

#### `qdb.get` - get a quote from it's ID
* `id` - The ID of the quote

Returns a promise which resolves to a quote object

#### `qdb.search` - search for a quote
* `query` - The search query
* `[count = 1]` - The amount of quotes to return (max 100)
* `[byNumber = false]` - Whether to sort by ID number or by votes

Returns a promise which resolves to a quote object if count is one, and an array of them otherwise

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
