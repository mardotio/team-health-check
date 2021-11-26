import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import SurveyQuestion from './SurveyQuestion';
import SurveyResponse from './SurveyResponse';

@Entity()
export default class QuestionResponse {
  @Column()
  response!: string;

  @PrimaryColumn({ type: 'uuid' })
  questionId!: string;

  @PrimaryColumn({ type: 'uuid' })
  surveyResponseId!: string;

  @ManyToOne(() => SurveyQuestion)
  @JoinColumn({ name: 'questionId' })
  question!: SurveyQuestion;

  @ManyToOne(() => SurveyResponse)
  @JoinColumn({ name: 'surveyResponseId' })
  surveyResponse!: SurveyResponse;
}
