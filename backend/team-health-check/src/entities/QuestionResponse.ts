import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import SurveyQuestion from './SurveyQuestion';

@Entity()
export default class QuestionResponse {
  @Column()
  response!: string;

  @PrimaryColumn({ type: 'uuid' })
  userId!: string;

  @PrimaryColumn({ type: 'uuid' })
  questionId!: string;

  @ManyToOne(() => SurveyQuestion)
  @JoinColumn({ name: 'questionId' })
  question!: SurveyQuestion;
}
