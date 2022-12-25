const clients = [];

export function getClients() {
	return clients;
}

export function addClient(client) {
	clients.push(client);
}

export function cleanClient(response){
	let ind = clients.findIndex(client => client.response === response);

	if(ind !== -1){
		clients.splice(ind, 1);
	}
}