import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('phone')
export class Phone {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  number: string;

  @ManyToOne(() => User, (user) => user.phones, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_user', referencedColumnName: 'id' })
  user: User;
}
