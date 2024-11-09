import express, { Application, Router, Response, NextFunction } from 'express';
import cors from "cors"



/**
 * Interface représentant une route Express.
 */
interface IExpressRoute {
    path: string;
    router: Router;
}

/**
 * Classe représentant une route de l'application.
 */
export class AppRoute implements IExpressRoute {
    private _path: string;
    private _router: Router;
    static allPath: Array<string> = [];

    /**
     * Constructeur de AppRoute.
     * @param {string} path - Le chemin de la route.
     * @param {Router} router - Le routeur associé à la route.
     */
    constructor(path: string, router: Router) {
        this._path = path;
        this._router = router;
        AppRoute.allPath.push(path);
    }

    /**
     * Récupère le chemin de la route.
     * @return {string} Le chemin de la route.
     */
    public get path(): string {
        return this._path;
    }

    /**
     * Récupère le routeur de la route.
     * @return {Router} Le routeur de la route.
     */
    public get router(): Router {
        return this._router;
    }
}

/**
 * Classe représentant le serveur de l'application.
 */
export default class Server {
    readonly port: number;
    private _app: Application;
    private static _instance: boolean = false;
    /**
     * Constructeur de Server.
     * @param {number} port - Le port sur lequel le serveur va écouter.
     * @throws {Error} Si une instance de Server est déjà en cours d'utilisation.
     */
    constructor(port: number) {
        this.port = port;
        if (Server._instance) {
            throw new Error("Instance de serveur déjà en cours d'utilisation");
        } else {
            Server._instance = true;
            this._app = express();
            this._app.use(express.json());
            this._app.use(express.urlencoded({extended:true}))
            this._app.use(cors())
        }
    }

    /**
     * Démarre le serveur.
     */
    start() {
        this._app.listen(this.port, () => {
            console.log(`Serveur démarré avec succès sur le port ${this.port}`);
        });
    }

    /**
     * Récupère l'application Express.
     * @return {Application} L'application Express.
     */
    public get app(): Application {
        return this._app;
    }

    /**
     * Ajoute une route à l'application.
     * @param {AppRoute} route - La route à ajouter.
     */
    useRoute(route: AppRoute) {
        this._app.use(route.path, route.router);
    }

}