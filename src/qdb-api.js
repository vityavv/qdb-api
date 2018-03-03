/*const axios = require('axios').default;*/
const http = require('http');
const cheerio = require('cheerio');

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

function getRandomId() {
	return new Promise((resolve, reject) => {
		get('http://bash.org/?random')
			.then(response => {
				const $ = cheerio.load(response);

				const id = $('.quote a b')
					.first()
					.text()
					.substring(1);

				resolve(id);
			})
			.catch(reason => reject(reason));
	});
}

function getLatestId() {
	return new Promise((resolve, reject) => {
		get('http://bash.org/?latest')
			.then(response => {
				const $ = cheerio.load(response);

				const id = $('.quote a b')
					.first()
					.text()
					.substring(1);

				resolve(id);
			})
			.catch(reason => reject(reason));
	});
}
/**
 *
 * @param {String} query The search word
 * @param {Number} sort 0 for score, 1 for number
 * @param {Number} count 1, 10, 25, 50, 75 or 100
 */
function search(query, sort, count) {
	return new Promise((resolve, reject) => {
		let showone = false;
		if (count === 1) {
			showone = true;
			count = 10;
		}
		get(`http://bash.org/?search=${query}&sort=${sort}&show=${count}`)
			.then(response => {
				const $ = cheerio.load(response);

				const quotes = [];

				/* eslint-disable */
				if (
					$('center font')
						.text()
						.includes('No results')
				) {
					/* eslint-enable */
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
					if (showone) resolve(quotes[0]);
					else resolve(quotes);
				}
			})
			.catch(reason => reject(reason));
	});
}

module.exports = {
	get: id => {
		return getQuote(id);
	},
	randomID: () => {
		return getRandomId();
	},
	random: () => {
		return getRandomId().then(id => getQuote(id));
	},
	latestID: () => {
		return getLatestId();
	},
	latest: () => {
		return getLatestId().then(id => getQuote(id));
	},
	search
};
