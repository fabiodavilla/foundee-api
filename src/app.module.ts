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

// Postgres Entities
import { User } from './user/entities/user.entity';
import { Place } from './places/entities/place.entity';
import { PlaceImage } from './place-images/entities/place-image.entity';
import { PlaceComment } from './place-comments/entities/place-comment.entity';
import { CommercialInfo } from './commercial-info/entities/commercial-info.entity';
import { Phone } from './phone/entities/phone.entity';

// Mongo Entities
import { Point } from './point/entities/point.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [CommercialInfo, User, PlaceComment, PlaceImage, Place, Phone],
      synchronize: process.env.DATABASE_SYNC,
      logging: 'all',
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      name: process.env.MONGODB_SURNAME,
      host: process.env.MONGODB_HOST,
      port: process.env.MONGODB_PORT,
      database: process.env.MONGODB_NAME,
      entities: [Point],
      synchronize: process.env.MONGODB_SYNC,
      logging: 'all',
    }),
    UserModule,
    PlacesModule,
    PlaceImagesModule,
    PlaceCommentsModule,
    CommercialInfoModule,
    PointModule,
    HealthModule,
    PhoneModule,
    AuthModule,
  ],
})
export class AppModule {}
