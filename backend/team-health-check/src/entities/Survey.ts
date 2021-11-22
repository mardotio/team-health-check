import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import SurveyQuestion from './SurveyQuestion';

@Entity()
export default class Survey {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  createdBy!: string;

  @CreateDateColumn()
  createdOn!: Date;

  @OneToMany(() => SurveyQuestion, (surveyQuestion) => surveyQuestion.question)
  questions!: SurveyQuestion[];

  @Column()
  active!: boolean;
}
