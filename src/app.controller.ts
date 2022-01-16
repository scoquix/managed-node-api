import { Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  /**
   * This method checks system usage on concrete node
   * @param ip
   */
  @Post('/check/:ip')
  async checkSystemUsageOnIp(@Param('ip') ip: string): Promise<string> {
    return "checking system usage";
  }
}
