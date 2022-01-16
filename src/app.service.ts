import { Injectable } from "@nestjs/common";
import execaCommand from 'execa';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome in my node rest api!';
  }

  private static async executeCmdWithArgs(cmd: string, args: string[]):Promise<string> {
    try {
      const cmdResult = execaCommand(cmd, args);
      const { stdout } = await cmdResult;
      return stdout;
    } catch (error) {
      return error;
    }
  }

  private static async executeCmd(cmd: string):Promise<string> {
    try {
      const cmdResult = execaCommand(cmd);
      const { stdout } = await cmdResult;
      return stdout;
    } catch (error) {
      return error;
    }
  }

  private static checkIfValidIP(ip: string): boolean {
    // Regular expression to check if string is a IP address
    const regexExp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
    return regexExp.test(ip);
  }
}
