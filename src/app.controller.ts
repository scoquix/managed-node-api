/**
 * Copyright ⓒ 2022 Sebastian Szafrański - All Rights Reserved
 */
import { Controller, Get, Param } from "@nestjs/common";
import { AppService } from "./app.service";
import { StatsDto } from "./dto/stats.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * This method retrieve usage of concrete system component
   */
  @Get('/os-monitor/:component')
  async getConcreteUsage(@Param('component') component: string): Promise<string> {
    switch (component) {
      case 'cpu':
        return this.appService.getCpuInfo();
      case 'ram':
        return this.appService.getMemInfo();
      default:
        throw new Error('Bad component');
    }
  }

  /**
   * This method retrieve system usage (cpu & ram)
   */
  @Get('/os-monitor')
  async getSystemUsage(): Promise<StatsDto> {
    return this.appService.getSystemUsage();
  }
}
