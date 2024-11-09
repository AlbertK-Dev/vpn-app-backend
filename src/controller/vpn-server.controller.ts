import { Request, Response } from 'express';
import VpnServerService from '../database/services/vpn-server.service';

export class VpnServerController {
  // Get all VPN servers
  async getAllServers(req: Request, res: Response): Promise<void> {
    try {
      const servers = await VpnServerService.getAllServers();
      res.status(200).json(servers);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch VPN servers', error });
    }
  }

  // Get a single VPN server by ID
  async getServerById(req: Request, res: Response): Promise<void> {
    try {
      const server = await VpnServerService.getServerById(req.params.id);
      if (!server) {
         res.status(404).json({ message: 'Server not found' });
      }
      res.status(200).json(server);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch VPN server', error });
    }
  }

  // Add a new VPN server
  async addServer(req: Request, res: Response): Promise<void> {
    try {
      const server = await VpnServerService.addServer(req.body);
      res.status(201).json(server);
    } catch (error) {
      res.status(400).json({ message: 'Failed to add VPN server', error });
    }
  }

  // Update an existing VPN server
  async updateServer(req: Request, res: Response): Promise<void> {
    try {
      const server = await VpnServerService.updateServer(req.params.id, req.body);
      if (!server) {
         res.status(404).json({ message: 'Server not found' });
      }
      res.status(200).json(server);
    } catch (error) {
      res.status(400).json({ message: 'Failed to update VPN server', error });
    }
  }

  // Delete a VPN server
  async deleteServer(req: Request, res: Response): Promise<void> {
    try {
      const server = await VpnServerService.deleteServer(req.params.id);
      if (!server) {
         res.status(404).json({ message: 'Server not found' });
      }
      res.status(200).json({ message: 'Server deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete VPN server', error });
    }
  }
}

export default new VpnServerController();
