import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity('user_image')
export class UserImage {
  @PrimaryColumn()
  @OneToOne(() => User)
  @JoinColumn({ name: 'id', referencedColumnName: 'id' })
  id: User;

  @Column({ type: 'text', nullable: false })
  imageString: string;

  constructor(id: User, imageString: string) {
    this.id = id;
    this.imageString = imageString;
  }
}
