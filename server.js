import { config } from 'dotenv';
config();

import { createServer } from 'http';
import { PORT } from './app/config/url.js';
import { addRoute, runRouter } from './app/router/index.js';

const server = createServer(runRouter);
server.listen(PORT);

import staticPage from './app/controllers/static.js';
import betsStreamPage from './app/controllers/bets/stream.js';
import betsAddPage from './app/controllers/bets/add.js';
import updateClientsPage from './app/controllers/clients/update.js';

addRoute('/', staticPage);
addRoute('/js/index.js', staticPage);
addRoute('/bets', betsStreamPage);
addRoute('/bets/add', betsAddPage);
addRoute('/clients', staticPage);
addRoute('/js/clients.js', staticPage);
addRoute('/clients/update', updateClientsPage);
