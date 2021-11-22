import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Survey from './Survey';

@Entity()
export default class SurveyQuestion {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Survey)
  survey!: Survey;

  @Column()
  question!: string;
}
