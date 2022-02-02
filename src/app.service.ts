import {Injectable} from "@nestjs/common";
import {StatsDto} from "./dto/stats.dto";
import {currentLoad, mem} from "systeminformation";

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome in managed-node-api!';
  }

  async getSystemUsage(): Promise<StatsDto> {
    const stats = new StatsDto();
    stats.ramUsage = await this.getMemInfo();
    stats.cpuUsage = await this.getCpuInfo();
    return stats;
  }

  async getCpuInfo(): Promise<string> {
    const cpuInfo = await currentLoad();
    const cpuLoadInPercents = cpuInfo.currentLoad;
    return cpuLoadInPercents.toFixed(2).concat(' %');
  }

  async getMemInfo(): Promise<string> {
    const memInfo = await mem();
    const memInfoInMB = memInfo.free / 1024 / 1024;
    return memInfoInMB.toFixed(0).concat(' MB');
  }
}
