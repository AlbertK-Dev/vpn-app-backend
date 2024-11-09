import VpnServer, { IVpnServer } from '../models/vpn-server.model';

export class VpnServerService {
  // Get all VPN servers
  async getAllServers(): Promise<IVpnServer[]> {
    return await VpnServer.find();
  }

  // Get a single VPN server by ID
  async getServerById(id: string): Promise<IVpnServer | null> {
    return await VpnServer.findById(id);
  }

  // Add a new VPN server
  async addServer(serverData: IVpnServer): Promise<IVpnServer> {
    const newServer = new VpnServer(serverData);
    return await newServer.save();
  }

  // Update an existing VPN server
  async updateServer(id: string, serverData: Partial<IVpnServer>): Promise<IVpnServer | null> {
    return await VpnServer.findByIdAndUpdate(id, serverData, { new: true, runValidators: true });
  }

  // Delete a VPN server
  async deleteServer(id: string): Promise<IVpnServer | null> {
    return await VpnServer.findByIdAndDelete(id);
  }
}

export default new VpnServerService();
