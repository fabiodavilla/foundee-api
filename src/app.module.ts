import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Modules
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
})
export class AppModule {}
