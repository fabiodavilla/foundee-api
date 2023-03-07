import { CommercialInfo } from 'src/commercial-info/entities/commercial-info.entity';
import { PlaceComment } from 'src/place-comments/entities/place-comment.entity';
import { PlaceImage } from 'src/place-images/entities/place-image.entity';
import { Point } from 'src/point/entities/point.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('place')
export class Place {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 1000, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'smallint', nullable: false, default: 1 })
  status: number;

  @Column({ type: 'smallint', nullable: false, default: 1 })
  placeType: number;

  @OneToMany(() => PlaceComment, (placeComment) => placeComment.place)
  placeComments: PlaceComment[];

  @OneToMany(() => PlaceImage, (placeImages) => placeImages.place)
  placeImages: PlaceImage[];

  @ManyToOne(() => CommercialInfo, (commInfo) => commInfo.place, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'id_commercial_info',
    referencedColumnName: 'id',
  })
  commercialInfo: CommercialInfo;

  @OneToOne(() => Point)
  @JoinColumn({ name: 'id_point', referencedColumnName: 'id' })
  point: Point;
}
