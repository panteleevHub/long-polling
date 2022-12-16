export const PROTOCOL = process.env.PROTOCOL ?? 'http';
export const HOSTNAME = process.env.DOMAIN ?? 'localhost';
export const PORT = process.env.PORT ?? 3000;
export const ORIGIN = `${PROTOCOL}://${HOSTNAME}:${PORT}`;