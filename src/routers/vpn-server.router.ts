import { Router } from 'express';
import VpnServerController from '../controller/vpn-server.controller';

const VpnServerRouter = Router();

// Route to get all VPN servers
VpnServerRouter.get('/', VpnServerController.getAllServers);

// Route to get a single VPN server by ID
VpnServerRouter.get('/:id', VpnServerController.getServerById);

// Route to add a new VPN server
VpnServerRouter.post('/', VpnServerController.addServer);

// Route to update an existing VPN server
VpnServerRouter.put('/:id', VpnServerController.updateServer);

// Route to delete a VPN server
VpnServerRouter.delete('/:id', VpnServerController.deleteServer);

export default VpnServerRouter;
