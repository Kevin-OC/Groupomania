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

/* 
 * Code suivant est issu du cours 'Créez une application Express' (ressource du projet #6 So Peckoko) ,
 * je le laisse en commentaire pour l'avoir sous la main si besoin,
 * il fait à peu près la même tâche que le code ci-dessus mais avec + de gestion d'erreurs
 *
 * DEBUT

    const http = require('http');
    const app = require('./app');

    const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
    };
    const port = normalizePort(process.env.PORT || '3000');
    app.set('port', port);

    const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
        case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;
        default:
        throw error;
    }
    };

    const server = http.createServer(app);

    server.on('error', errorHandler);
    server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
    });

    server.listen(port);

 * FIN
*/