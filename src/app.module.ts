import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { JwtService } from '@nestjs/jwt';

// Modules
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { PlacesModule } from './places/places.module';
import { PlaceImagesModule } from './place-images/place-images.module';
import { PlaceCommentsModule } from './place-comments/place-comments.module';
import { CommercialInfoModule } from './commercial-info/commercial-info.module';
import { PointModule } from './point/point.module';
import { PhoneModule } from './phone/phone.module';
import { HealthModule } from './health/health.module';
import { UserImageModule } from './user-image/user-image.module';
import { AuthModule } from './auth/auth.module';

// Entities
import { User } from './user/entities/user.entity';
import { Place } from './places/entities/place.entity';
import { PlaceImage } from './place-images/entities/place-image.entity';
import { PlaceComment } from './place-comments/entities/place-comment.entity';
import { CommercialInfo } from './commercial-info/entities/commercial-info.entity';
import { Phone } from './phone/entities/phone.entity';
import { UserImage } from './user-image/entities/user-image.entity';
import { Point } from './point/entities/point.entity';

// Middleware
import { JwtMiddleware } from './common/middlewares/jwt.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        CommercialInfo,
        User,
        PlaceComment,
        PlaceImage,
        Place,
        Phone,
        UserImage,
        Point,
      ],
      synchronize: Boolean(process.env.DATABASE_SYNC),
      logging: Boolean(process.env.DATABASE_LOG),
    }),
    UserModule,
    PlacesModule,
    PlaceImagesModule,
    PlaceCommentsModule,
    CommercialInfoModule,
    PointModule,
    HealthModule,
    PhoneModule,
    UserImageModule,
    AuthModule,
  ],
  providers: [
    JwtService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude(
        {
          path: 'auth/login',
          method: RequestMethod.POST,
        },
        {
          path: 'user',
          method: RequestMethod.POST,
        },
      )
      .forRoutes('*');
  }
}
