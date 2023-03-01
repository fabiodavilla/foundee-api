import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  TypeOrmHealthIndicator,
  DiskHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import { InjectDataSource } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { resolve } from 'path';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private readonly db: TypeOrmHealthIndicator,
    @InjectDataSource()
    private readonly defaultConnection: Connection,
  ) {}

  @Get('status')
  @HealthCheck()
  checkStatus() {
    return this.health.check([
      // Connection check
      () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),

      // Database check
      () => this.db.pingCheck('foundee'),
      () =>
        this.db.pingCheck('postgres', { connection: this.defaultConnection }),

      // Memory check
      () => this.memory.checkHeap('memory heap', 150 * 1024 * 1024),
      () => this.memory.checkRSS('memory RSS', 150 * 1024 * 1024),

      // Disk check
      () =>
        this.disk.checkStorage('storage', {
          path: `${resolve('/')}`,
          thresholdPercent: 0.8,
        }),
    ]);
  }
}
