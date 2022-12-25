import { getClients } from '#app/stores/clients.js';

export default (request, response, parsedUrl) => {
   const clients = getClients();
   const now = new Date();

   const clientsInfo = clients.map(client => ({
      created: client.created.toLocaleTimeString(),
      agent: client.request.headers['user-agent'],
      long: now.getTime() - client.created.getTime()
   }));

   response.end(JSON.stringify(clientsInfo));
};