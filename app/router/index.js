import { ORIGIN } from '#app/config/url.js';

const routes = [];

export function addRoute(url, callback) {
   routes.push({url, callback});
}

export function runRouter(request, response) {
   const parsedUrl = new URL(request.url, ORIGIN);
   const route = routes.find(route => route.url === parsedUrl.pathname);

   if (route) {
      route.callback(request, response, parsedUrl);
   } else {
      response.writeHead(404);
      response.end('Page not found');
   }
}