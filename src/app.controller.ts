import {BadRequestException, Controller, Get, Param} from '@nestjs/common';
import { AppService } from './app.service';
import {StatsDto} from "./dto/stats.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  /**
   * This method retrieve usage of concrete system component
   */
  @Get('/system-usage/:component')
  async getConcreteUsage(@Param('component') component: string): Promise<string> {
    switch (component) {
      case 'cpu':
        return this.appService.getCpuInfo();
      case 'ram':
        return this.appService.getMemInfo();
      default:
        throw new BadRequestException('Bad component');
    }
  }

  /**
   * This method retrieve system usage (cpu & ram)
   */
  @Get('/system-usage')
  async getSystemUsage(): Promise<StatsDto> {
    return this.appService.getSystemUsage();
  }
}
