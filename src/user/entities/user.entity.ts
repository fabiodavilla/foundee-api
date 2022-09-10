import { CommercialInfo } from 'src/commercial-info/entities/commercial-info.entity';
import { Phone } from 'src/phone/entities/phone.entity';
import { PlaceComment } from 'src/place-comments/entities/place-comment.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  lastName: string;

  @Column({ type: 'date', nullable: false })
  dateBirthday: Date;

  @Column({ type: 'varchar', length: 100, nullable: false })
  address: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  district: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  city: string;

  @Column({ type: 'varchar', length: 2, nullable: false })
  state: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  country: string;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  password: string;

  @Column({ type: 'smallint', nullable: false, default: 1 })
  userType: number;

  @Column({ type: 'smallint', nullable: false, default: 1 })
  status: number;

  @OneToMany(() => CommercialInfo, (commercialInfo) => commercialInfo.user)
  commercialInfo: CommercialInfo;

  @OneToMany(() => PlaceComment, (placeComments) => placeComments.user)
  placeComments: PlaceComment[];

  @OneToMany(() => Phone, (phone) => phone.user)
  phones: Phone[];
}
