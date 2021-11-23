import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Team {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  displayName!: string;
}
