import { Place } from 'src/places/entities/place.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('point')
export class Point {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'numeric', precision: 15, scale: 12 })
  latitude: number;

  @Column({ type: 'numeric', precision: 15, scale: 12 })
  longitude: number;

  @ManyToOne(() => User, (user) => user.points, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_user', referencedColumnName: 'id' })
  user: User;

  @OneToOne(() => Place)
  @JoinColumn({ name: 'id_place', referencedColumnName: 'id' })
  place: Place;
}
