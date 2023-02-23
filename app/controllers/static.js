import { readFile } from 'fs';
import path from 'path';

export default (request, response) => {
	let filePath = path.join('app', 'public', request.url === '/' ? 'index.html' : request.url);
	const fileExt = path.extname(filePath);
	let contentType = 'text/html';

	switch (fileExt) {
		case '.css':
			contentType = 'text/css';
			break;
		case '.js':
			contentType = 'text/javascript';
			break;
		default:
			contentType = 'text/html';
	}

	if (!fileExt) {
		filePath = `${filePath}.html`;
	}

	readFile(filePath, (err, data) => {
		if (err) {
			throw err;
		}

		response.writeHead(200, {'Content-Type': contentType});
		response.end(data);
	});
};