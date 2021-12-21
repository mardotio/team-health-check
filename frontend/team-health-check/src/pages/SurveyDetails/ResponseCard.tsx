import React from 'react';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import { ResponseValues } from '../../util/client';
import arrayOfAll from '../../util/arrayOfAll';

export type ResponseBreakdown = {
  [K in ResponseValues]: number;
};

interface Props {
  question: string;
  breakdown: ResponseBreakdown;
  totalReplies: number;
}

const Wrapper = styled.div`
  max-width: 500px;
  width: 100%;
  padding: 12px;
`;

const Question = styled(Typography)`
  padding-bottom: 24px;
  text-align: center;
`;

const BreakdownTable = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-column-gap: 0;
  grid-row-gap: 4px;
  justify-content: space-between;
`;

interface BackgroundProps {
  row: number;
}

const Background = styled.div<BackgroundProps>`
  grid-column: 1 / span 3;
  grid-row: ${({ row }) => row};
  height: 2rem;

  svg {
    height: 100%;

    rect {
      fill: #e4e9ed;
    }
  }
`;

interface CellProps {
  row: number;
  column: number;
  alignment: 'left' | 'right';
}

const Cell = styled.div<CellProps>`
  grid-row: ${({ row }) => row};
  grid-column: ${({ column }) => column};
  height: 2rem;
  display: flex;
  justify-content: ${({ alignment }) =>
    alignment === 'left' ? 'flex-start' : 'flex-end'};
  align-items: center;
`;

const Emoji = styled.span`
  font-size: 1.5rem;
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

const ResponseCard = ({ question, breakdown, totalReplies }: Props) => (
  <Wrapper>
    <Question variant="h6">{question}</Question>
    <BreakdownTable>
      <Cell column={1} alignment="left" row={1}>
        <Typography variant="subtitle2">Response</Typography>
      </Cell>
      <Cell column={2} alignment="right" row={1}>
        <Typography variant="subtitle2">Replies</Typography>
      </Cell>
      <Cell column={3} alignment="right" row={1}>
        <Typography variant="subtitle2">%</Typography>
      </Cell>

      {RESPONSE_VALUES.map((v, i) => {
        const percent = totalReplies > 0 ? breakdown[v] / totalReplies : 0;
        return (
          <>
            <Background row={i + 2}>
              <svg width="100%">
                <rect width={`${percent}%`} height="100%" rx="4" />
              </svg>
            </Background>
            <Cell column={1} row={i + 2} alignment="left">
              <Emoji role="img" aria-label={v}>
                {String.fromCodePoint(EMOJI_MAP[v])}
              </Emoji>
            </Cell>
            <Cell column={2} row={i + 2} alignment="right">
              <Typography variant="body1">{breakdown[v]}</Typography>
            </Cell>
            <Cell column={3} row={i + 2} alignment="right">
              <Typography variant="body1">{percent}%</Typography>
            </Cell>
          </>
        );
      })}
    </BreakdownTable>
  </Wrapper>
);

export default ResponseCard;
