import { renderPage } from '#app/utils.js';

export default (request, response, parsedUrl) => {
	renderPage(response, 'index.html');
};