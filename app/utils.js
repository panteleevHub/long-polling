import { readFile } from 'fs';

export function renderPage(response, fileName) {
   readFile(`./app/views/${fileName}`, 'utf-8', (err, data) => {
		if (err !== null) {
			response.writeHead(500);
			response.end('error');
		}
		response.end(data);
	});
}