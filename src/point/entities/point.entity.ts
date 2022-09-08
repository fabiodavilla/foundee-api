import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity('point')
export class Point {
  @ObjectIdColumn()
  id: number;

  @Column({ type: 'integer' })
  latitude: number;

  @Column({ type: 'integer' })
  longitude: number;

  @Column({ type: 'string' })
  idUser: string;

  @Column({ type: 'string' })
  idPlace: string;

  @Column({ type: 'integer' })
  placeType: number;
}
