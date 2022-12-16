import { readFile } from 'fs';

export default (request, response, parsedUrl) => {
	readFile('./index.html', 'utf-8', (err, data) => {
		if (err !== null) {
			response.writeHead(500);
			response.end('error');
		}
		response.end(data);
	});
};