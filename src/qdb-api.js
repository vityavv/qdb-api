const axios = require('axios').default;
const cheerio = require('cheerio');

function getQuote(id) {
	return new Promise((resolve, reject) => {
		axios
			.get(`http://bash.org/?${id}`)
			.then(response => {
				const $ = cheerio.load(response.data);

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
		axios
			.get('http://bash.org/?random')
			.then(response => {
				const $ = cheerio.load(response.data);

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
		axios
			.get('http://bash.org/?latest')
			.then(response => {
				const $ = cheerio.load(response.data);

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
 * @param {Number} count 10, 25, 50, 75 or 100
 */
function search(query, sort, count) {
	return new Promise((resolve, reject) => {
		axios
			.get(`http://bash.org/?search=${query}&sort=${sort}&show=${count}`)
			.then(response => {
				const $ = cheerio.load(response.data);

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

					resolve(quotes);
				}
			})
			.catch(reason => reject(reason));
	});
}

module.exports = {
	get: id => {
		return getQuote(id);
	},
	random: () => {
		return getRandomId().then(id => getQuote(id));
	},
	latest: () => {
		return getLatestId().then(id => getQuote(id));
	},
	search
};
