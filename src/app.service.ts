import {Injectable} from "@nestjs/common";
import {StatsDto} from "./dto/stats.dto";
import {currentLoad, fsSize, mem} from "systeminformation";

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome in managed-node-api!';
  }

  async getSystemUsage(): Promise<StatsDto> {
    const stats = new StatsDto();
    stats.ramUsage = await this.getMemInfo();
    stats.cpuUsage = await this.getCpuInfo();
    stats.fsUsage = await this.getFileSystemInfo();
    return stats;
  }

  async getCpuInfo(): Promise<string> {
    const cpuInfo = await currentLoad();
    const cpuLoadInPercents = cpuInfo.currentLoad;
    return cpuLoadInPercents.toFixed(2).concat(' %');
  }

  async getMemInfo(): Promise<string> {
    const memInfo = await mem();
    return this.formatBytes(memInfo.free);
  }

  async getFileSystemInfo(): Promise<string> {
    const diskInfo = await fsSize();
    const usedSpace = this.formatBytes(diskInfo[0].used);
    const fullSpace = this.formatBytes(diskInfo[0].size);
    return [usedSpace, fullSpace].join(" / ");
  }

  formatBytes(bytes, decimals = 2): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
