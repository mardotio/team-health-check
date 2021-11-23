import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import SurveyQuestion from './SurveyQuestion';
import Team from './Team';

@Entity()
export default class Survey {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  createdBy!: string;

  @CreateDateColumn()
  createdOn!: Date;

  @OneToMany(() => SurveyQuestion, (surveyQuestion) => surveyQuestion.survey)
  questions!: SurveyQuestion[];

  @Column()
  active!: boolean;

  @ManyToOne(() => Team)
  team!: Team;
}
