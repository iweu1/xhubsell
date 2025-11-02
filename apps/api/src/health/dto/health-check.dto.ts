import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class HealthCheckDto {
  @IsString()
  status: string;

  @IsString()
  timestamp: string;

  @IsString()
  uptime: string;

  @IsString()
  @IsOptional()
  version?: string;

  @IsString()
  @IsOptional()
  environment?: string;

  @IsBoolean()
  @IsOptional()
  database?: boolean;

  @IsBoolean()
  @IsOptional()
  redis?: boolean;
}