import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config available throughout the app
      envFilePath: ['.env'], // Adjust this if using multiple env files
    }),
  ],
  exports: [ConfigModule],
})
export class CommonConfigModule {}
