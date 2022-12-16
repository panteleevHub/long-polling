import { getBets, onBet } from '#app/stores/bets.js';

const clients = [];

onBet(bet => clients.forEach(client => sendBetsToClient(client, [ bet ])));

export default (request, response, parsedUrl) => {
	const client = { response };
   const id = parsedUrl.searchParams.get('id');
	const immediatelyBets = getBets().filter(bet => bet.id > parseInt(id));

	if (immediatelyBets.length > 0) {
		sendBetsToClient(client, immediatelyBets);
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