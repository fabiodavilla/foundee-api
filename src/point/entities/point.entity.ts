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
  id: string;

  @Column({ type: 'numeric', precision: 10, scale: 7 })
  latitude: number;

  @Column({ type: 'numeric', precision: 10, scale: 7 })
  longitude: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'id_user', referencedColumnName: 'id' })
  idUser: User;

  @OneToOne(() => Place)
  @JoinColumn({ name: 'id_place', referencedColumnName: 'id' })
  place: Place;
}
