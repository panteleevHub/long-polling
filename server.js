import { createServer } from 'http';
import { readFile } from 'fs';

const clients = [];
const bets = [];

const server = createServer((request, response) => {
	const { pathname, searchParams } = new URL(request.url || '', `http://${request.headers.host}`);

	switch(pathname){
		case '/':
			mainPage(response);
			break;
		case '/bets':
			const betId = searchParams.get('id');
			betsStream(response, betId);
			break;
		default:
			response.writeHead(404);
			response.end('Page not found');
	}
});

server.listen(3000);

function mainPage(response){
	readFile('./index.html', 'utf-8', (err, data) => {
		if (err !== null) {
			response.writeHead(500);
			response.end('error');
		}
		response.end(data);
	});
}

function betsStream(response, id){
	const client = { response };
	const immediatelyBets = bets.filter(bet => bet.id > parseInt(id));

	if (immediatelyBets.length > 0) {
		sendBetsToClient(client, bets);
	} else {
		clients.push(client);
		response.on('close', () => cleanClient(response));
	}
}

function sendBetsToClient(client, bets) {
	client.response.end(JSON.stringify(bets));
}

function cleanClient(response){
	let ind = clients.findIndex(client => client.response === response);

	if(ind !== -1){
		clients.splice(ind, 1);
	}
}

function randomBet(){
	setTimeout(() => {
		let id = bets.length > 0 ? bets[bets.length - 1].id : 0;
		++id;
		const bet = { id, value: id * 1000, time: Date.now() };
		bets.push(bet);
		clients.forEach((client) => sendBetsToClient(client, [bet]));
		randomBet();
	}, 1000 * ( Math.floor(Math.random() * 20) + 20 ));
}

randomBet();