import { Place } from 'src/places/entities/place.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('commercial_info')
export class CommercialInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'char', length: 14, nullable: false, unique: true })
  registry: string;

  @ManyToOne(() => User, (user) => user.commercialInfo, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_user', referencedColumnName: 'id' })
  user: User;

  @OneToMany(() => Place, (place) => place.commercialInfo)
  place: Place;
}
