import { Place } from 'src/places/entities/place.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('place_comment')
export class PlaceComment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 5000, nullable: true })
  comment: string;

  @ManyToOne(() => Place, (place) => place.placeComments)
  @JoinColumn({ name: 'id_place' })
  place: Place;

  @ManyToOne(() => User, (user) => user.placeComments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_user', referencedColumnName: 'id' })
  user: User;
}
