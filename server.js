import { config } from 'dotenv';
config();

import { createServer } from 'http';
import { PORT } from './app/config/url.js';
import { addRoute, runRouter } from './app/router/index.js';

const server = createServer(runRouter);
server.listen(PORT);

import homePage from './app/controllers/home.js';
import betsStreamPage from './app/controllers/bets/stream.js';
import betsAddPage from './app/controllers/bets/add.js';
import clientsStreamsPage from './app/controllers/clients/stream.js';
import updateClientsPage from './app/controllers/clients/update.js';

addRoute('/', homePage);
addRoute('/bets', betsStreamPage);
addRoute('/bets/add', betsAddPage);
addRoute('/debug/clients-streams', clientsStreamsPage);
addRoute('/debug/update-clients', updateClientsPage);
