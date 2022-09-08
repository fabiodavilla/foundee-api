import { Place } from 'src/places/entities/place.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('place_image')
export class PlaceImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  imageString: string;

  @ManyToOne(() => Place, (place) => place.placeImages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_place', referencedColumnName: 'id' })
  place: Place;
}
