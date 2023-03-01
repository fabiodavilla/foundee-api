import { Place } from 'src/places/entities/place.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('point')
export class Point {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'integer' })
  latitude: number;

  @Column({ type: 'integer' })
  longitude: number;

  @Column({ type: 'integer' })
  placeType: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'id_user', referencedColumnName: 'id' })
  idUser: User;

  @OneToOne(() => Place)
  @JoinColumn({ name: 'id_place', referencedColumnName: 'id' })
  idPlace: Place;
}
