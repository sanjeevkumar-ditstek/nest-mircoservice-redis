import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config available throughout the app
      envFilePath: ['.env'], // Adjust this if using multiple env files
    }),
  ],
  exports: [ConfigModule],
})
export class CommonConfigModule {}
