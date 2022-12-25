import { getBets } from '#app/stores/bets.js';
import { getClients, addClient, cleanClient } from '#app/stores/clients.js';
import eventBus from '#app/core/eventbus.js';

const REQUEST_TIMEOUT = 40000;
const CLIENTS_CHECK_INTERVAL = 100000;

const clients = getClients();

eventBus.on('addBet', bet => clients.forEach(client => sendBetsToClient(client, [ bet ])));

export default (request, response, parsedUrl) => {
	const client = {
		request,
		response,
		created: new Date()
	};

   const id = parsedUrl.searchParams.get('id');
	const immediatelyBets = getBets().filter(bet => bet.id > parseInt(id));

	if (immediatelyBets.length > 0) {
		sendBetsToClient(client, immediatelyBets);
	} else {
		addClient(client);
		response.on('close', () => cleanClient(response));
	}

	setInterval(() => {
		clients.forEach((client) => {
			if ((new Date().getTime() - client.created.getTime()) > REQUEST_TIMEOUT) {
				client.response.writeHead(400);
				client.response.end();
			}
		});
	}, CLIENTS_CHECK_INTERVAL);
}

function sendBetsToClient(client, bets) {
	client.response.end(JSON.stringify(bets));
}