/**
 * @file Has all functions for qdb-api-plus
 * @module qdb-api-plus
 * @author Victor Veytsman <vityavv@gmail.com>
 * @author Mark Njung'e <mark.kamau@outlook.com>
 * @version 1.3.1
 */
const http = require('http');
const cheerio = require('cheerio');

/**
 * Get the data for a specific URL - meant to replace axios
 *
 * @async
 * @param {string|Object} options the URL/Object that http.get takes
 * @returns {Promise<string>} The data that is received (in ASCII)
 */
function get(options) {
	return new Promise((resolve, reject) => {
		try {
			http.get(options, (response) => {
				let data = '';
				response.setEncoding('ascii');
				response.on('data', (chunk) => {data += chunk});
				response.on('end', () => {
					resolve(data);
				});
			});
		} catch (e) {
			reject(e)
		}
	});
}
/**
 * Get the quote that corresponds to a certain ID
 *
 * @async
 * @param {number} ID the ID
 * @returns {Promise<Object>} The quote object
 */
function getQuote(id) {
	return new Promise((resolve, reject) => {
		get(`http://bash.org/?${id}`)
			.then(response => {
				const $ = cheerio.load(response);

				const quote = {
					id: $('.quote a b')
						.text()
						.substring(1),
					score: $('.quote font').text(),
					text: $('.qt').text()
				};

				resolve(quote);
			})
			.catch(reason => reject(reason));
	});
}
/**
 * Get random quotes
 *
 * @async
 * @param {string} [count=1] The amount of quotes to return
 * @returns {Promise<Object|Object[]>} The quote object if there's one quote, otherwise an array of them
 */
function random(count = 1) {
	return parseQuotes(count, 'http://bash.org/?random', 50);
}
/**
 * Get the latest quotes
 *
 * @async
 * @param {string} [count=1] The amount of quotes to return
 * @returns {Promise<Object|Object[]>} The quote object if there's one quote, otherwise an array of them
 */
function latest(count = 1) {
	return parseQuotes(count, 'http://bash.org/?latest', 50);
}
/**
 * Get the top quotes
 *
 * @async
 * @param {string} [count=1] The amount of quotes to return
 * @returns {Promise<Object|Object[]>} The quote object if there's one quote, otherwise an array of them
 */
function top(count = 1) {
	return parseQuotes(count, 'http://bash.org/?top', 100);
}
/**
 * Search for quotes
 *
 * @async
 * @param {string} query Search for a quote
 * @param {number} sort 0 for sorting by score, 1 for sorting by ID number
 * @param {number} count Number of results to get (has to be under 101)
 * @returns {Promise<Object|Object[]>} The quote object if there's one quote, otherwise an array of them
 */
function search(query, sort, count) {
	let showcount = count;
	if (count <= 10) count = 10;
	else if (count <= 25) count = 25;
	else if (count <= 50) count = 50;
	else if (count <= 75) count = 75;
	else if (count <= 100) count = 100;
	return parseQuotes(count, `http://bash.org/?search=${query}&sort=${sort}&show=${count}`, 100);
}
/**
 * Parse the HTML of a bash.org quote page
 *
 * @param {number} count The number of quotes to return
 * @param {string|Object} url The URL/Object that http.get takes, to scrape
 * @param {number} max The maximum number of quotes allowed
 * @returns {Promise<Object|Object[]>} The quote object if there's one quote, otherwise an array of quotes
 */
function parseQuotes(count, url, max) {
	return new Promise((resolve, reject) => {
		if (count > max) reject("You took too many!");
		if (count < 1) reject("You can't get for 0 or less quotes");
		get(url)
			.then(response => {
				const $ = cheerio.load(response);

				const quotes = [];
				if (
					$('center font')
						.text()
						.includes('No results')
				) {
					reject('No results returned.');
				} else {
					$('.quote a b').each((i, element) => {
						quotes[i] = {};
						quotes[i].id = element.firstChild.data.substring(1);
					});

					$('.quote font').each((i, element) => {
						quotes[i].score = element.firstChild.data;
					});

					$('.qt').each((i, element) => {
						quotes[i].text = '';
						element.children.forEach(child => {
							const data = child.data;
							if (data && data != '') {
								quotes[i].text += child.data;
							}
						});
					});
					if (count === 1) resolve(quotes[0]);
					resolve(quotes.slice(0, count));
				}
			}).catch(reason => reject(reason));
	});
}
module.exports = {
	get: id => {
		return getQuote(id);
	},
	random,
	latest,
	top,
	search
};
