import React from 'react';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import { ResponseValues } from '../../util/client';
import arrayOfAll from '../../util/arrayOfAll';

interface Props {
  questionId: string;
  value: ResponseValues | null;
  question: string;
  onChange: (v: ResponseValues) => void;
}

const Wrapper = styled.div`
  max-width: 500px;
  width: 100%;
  text-align: center;
`;

const Question = styled(Typography)`
  margin-bottom: 12px !important;
`;

const ValuesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RadioWrapper = styled.div`
  position: relative;

  input[type='radio']:checked + label {
    border-color: #318cf5;
    background-color: #d6e9ff;
  }
`;

const ValueButton = styled.label`
  background-color: #e4e9ed;
  padding: 4px;
  border: 2px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const ValueInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  height: 0;
  width: 0;
  opacity: 0;
`;

const Emoji = styled.span`
  font-size: 1.25rem;
  margin-right: 4px;
`;

const RESPONSE_VALUES = arrayOfAll<ResponseValues>()([
  'thumbsUp',
  'shrug',
  'thumbsDown',
]);

const EMOJI_MAP: { [K in ResponseValues]: number } = {
  thumbsUp: 0x1f44d,
  thumbsDown: 0x1f44e,
  shrug: 0x1f937,
};

const WORD_MAP: { [K in ResponseValues]: string } = {
  thumbsUp: 'Agree',
  thumbsDown: 'Disagree',
  shrug: 'Neutral',
};

const SurveyQuestion = ({ questionId, value, question, onChange }: Props) => (
  <Wrapper>
    <Question variant="h6">{question}</Question>

    <ValuesWrapper>
      {RESPONSE_VALUES.map((v) => (
        <RadioWrapper key={v}>
          <ValueInput
            name={question}
            id={`${questionId}-${v}`}
            type="radio"
            onChange={() => onChange(v)}
            value={v}
            checked={v === value}
          />
          <ValueButton htmlFor={`${questionId}-${v}`}>
            <Emoji>{String.fromCodePoint(EMOJI_MAP[v])}</Emoji>
            <Typography variant="body1">{WORD_MAP[v]}</Typography>
          </ValueButton>
        </RadioWrapper>
      ))}
    </ValuesWrapper>
  </Wrapper>
);

export default SurveyQuestion;
