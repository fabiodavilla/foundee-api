import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity('user_image')
export class UserImage {
  @OneToOne(() => User, { primary: true })
  @JoinColumn({ name: 'id', referencedColumnName: 'id' })
  id: User;

  @Column({ type: 'text', nullable: false })
  imageString: string;
}
