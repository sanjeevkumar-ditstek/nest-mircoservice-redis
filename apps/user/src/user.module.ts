import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { DatabaseModule, CommonConfigModule, SecurityMiddleware, RequestTimeLoggerMiddleware } from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    CommonConfigModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ClientsModule.registerAsync([
      {
        name: 'USER_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.REDIS,
          options: {
            host: configService.get<string>('REDIS_HOST'),
            port: configService.get<number>('REDIS_PORT'),
          },
        }),
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule  {

  // configure(consumer: MiddlewareConsumer) {
  //   console.log('Configuring middlewares for UserModule...');  // Debugging line
    
  //   consumer
  //     .apply(SecurityMiddleware)
  //     .forRoutes('*'); // Apply globally

  //   consumer
  //     .apply(RequestTimeLoggerMiddleware)
  //     .forRoutes('*'); // Apply globally

  //   // Debugging to ensure middleware is applied
  //   console.log('Middlewares applied for all routes.');
  // }
  
}
