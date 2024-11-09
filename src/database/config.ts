import mongoose from "mongoose";

export default class MongoDB {
    private _stringConnexion: string;
    private static _instance: boolean = false;
    private readonly maxRetries: number;
    private readonly retryDelay: number; // en ms

    constructor(stringURI: string, maxRetries = 5, retryDelay = 2000) {
        if (MongoDB._instance) {
            throw new Error("MongoDB instance already in use");
        } else {
            MongoDB._instance = true;
            this._stringConnexion = stringURI;
            this.maxRetries = maxRetries;
            this.retryDelay = retryDelay;
        }
    }

    async connect() {
        let connected = false;
        let attempts = 0;

        while (!connected && attempts < this.maxRetries) {
            try {
                await mongoose.connect(this._stringConnexion);
                connected = true;
                console.log("Connexion à la BD... ok");
            } catch (err) {
                attempts++;
                console.error(`Echec de la connexion à la BD (tentative ${attempts}/${this.maxRetries})`, err);
                if (attempts < this.maxRetries) {
                    console.log(`Nouvelle tentative dans ${this.retryDelay / 1000} secondes...`);
                    await new Promise(resolve => setTimeout(resolve, this.retryDelay));
                }
            }
        }

        if (!connected) {
            console.error("Impossible de se connecter à la BD après plusieurs tentatives.");
            throw new Error("Connection failed after multiple attempts");
        }
    }
}
