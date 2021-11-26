import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Survey from './Survey';
import QuestionResponse from './QuestionResponse';

@Entity()
export default class SurveyQuestion {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Survey)
  survey!: Survey;

  @Column()
  question!: string;

  @OneToMany(
    () => QuestionResponse,
    (questionResponse) => questionResponse.question,
  )
  responses!: QuestionResponse[];
}
