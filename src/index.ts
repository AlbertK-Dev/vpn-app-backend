import MongoDB from "./database/config";
import Server, { AppRoute } from "./server";
import 'dotenv/config';
import VpnServerRouter from "./routers/vpn-server.router";
import { useEnvVars } from "./helpers/useEnv";

const {nodeEnv, databaseURI, port} = useEnvVars()
console.clear();

console.log("Environment : [" + nodeEnv + "]");


// Définition de touts les routes ici : n'oubliez pas de les inclure dans le serveur avec la méthode useRoute
const vpnServerRoute: AppRoute = new AppRoute('/vpn-server', VpnServerRouter);


// Instance de la base de données
const MyDB = new MongoDB(databaseURI);

/**
 * Connecte à la base de données MongoDB.
 */
MyDB.connect();

// Instance du serveur
const MyServer = new Server(port);


// Ajout des routes au serveur
MyServer.useRoute(vpnServerRoute);


// Démarrage du serveur
MyServer.start();

/**
 * Exporte l'application Express pour le déploiement sur Vercel.
 */
export default MyServer.app;