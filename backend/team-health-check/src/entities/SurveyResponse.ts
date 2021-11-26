import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import Survey from './Survey';

@Entity()
@Unique(['userId', 'survey'])
export default class SurveyResponse {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  userId!: string;

  @ManyToOne(() => Survey)
  survey!: Survey;

  @Column()
  questions!: number;

  @Column()
  answered!: number;
}
