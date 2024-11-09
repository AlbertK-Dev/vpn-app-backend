import { Schema, model, Document } from 'mongoose';

// Interface pour le serveur VPN
export interface IVpnServer extends Document {
  country: string;
  address: string;
  speed: number; // Échelle de 1 à 5
  flag: string;  // Code ISO du pays (ex: 'FR' pour la France)
  createdAt?: Date;
  updatedAt?: Date;
}

// Schéma Mongoose pour le serveur VPN
const vpnServerSchema = new Schema<IVpnServer>(
  {
    country: {
      type: String,
      required: [true, 'The country is required'],
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'L\'adresse est requise'],
      unique: true,
      trim: true,
    },
    speed: {
      type: Number,
      required: true,
      min: [1, 'La vitesse doit être au moins de 1'],
      max: [5, 'La vitesse ne peut pas excéder 5'],
    },
    flag: {
      type: String,
      required: [true, 'Le code ISO du drapeau est requis'],
      match: /^[A-Z]{2}$/, // Code ISO sur 2 lettres (ex: 'FR', 'US')
    },
  },
  {
    timestamps: true, // Ajoute createdAt et updatedAt automatiquement
    versionKey: false,
  }
);

// Création du modèle
const VpnServer = model<IVpnServer>('VpnServer', vpnServerSchema);

export default VpnServer;
