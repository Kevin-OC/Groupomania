/* imports */
const app = require('./app.js');
const http = require('http');

/* création de notre server http */
const server = http.createServer(app);

/* set du port */
const port = process.env.PORT || '3000';
app.set('port', port);

/* gestion d'erreur */
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
}
server.on('error', errorHandler);
server.on('listening', () => {
    console.log("Listening port > " + port);
});

/* écoute sur le port 3000 */
server.listen(port);