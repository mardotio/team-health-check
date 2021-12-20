import React from 'react';
import styled from 'styled-components';
import { ElementWithAs } from '../../util/types';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'transparent'
  | 'danger'
  | 'dangerSubtle';

interface Props {
  variant?: ButtonVariant;
}

interface WrapperProps {
  colors: ButtonColors;
}

interface ButtonStates {
  default: string;
  hover: string;
  focus: string;
  disabled: string;
}

interface ButtonColors {
  background: ButtonStates;
  border: ButtonStates;
  text: ButtonStates;
}

const Wrapper = styled.button<WrapperProps>`
  color: ${({ colors }) => colors.text.default};
  background-color: ${({ colors }) => colors.background.default};
  border: 1px solid ${({ colors }) => colors.border.default};
  font-size: 14px;
  font-weight: 600;
  line-height: calc(20 / 14);
  border-radius: 4px;
  cursor: pointer;
  display: inline-block;
  outline: none;
  padding: 5px 15px;
  position: relative;
  text-decoration: none;
  vertical-align: top;

  &:hover {
    color: ${({ colors }) => colors.text.hover};
    background-color: ${({ colors }) => colors.background.hover};
    border-color: ${({ colors }) => colors.border.hover};
  }

  &:focus {
    color: ${({ colors }) => colors.text.focus};
    background-color: ${({ colors }) => colors.background.focus};
    border-color: ${({ colors }) => colors.border.focus};
    box-shadow: 0 0 0 2px #58a1f5;
  }

  &:disabled {
    color: ${({ colors }) => colors.text.disabled};
    background-color: ${({ colors }) => colors.background.disabled};
    border-color: ${({ colors }) => colors.border.disabled};
    pointer-events: none;
  }
`;

const getColors = (variant: ButtonVariant): ButtonColors => {
  switch (variant) {
    case 'primary':
      return {
        background: {
          default: '#186ccc',
          hover: '#318cf5',
          focus: '#186ccc',
          disabled: '#a3c4eb',
        },
        border: {
          default: '#186ccc',
          hover: '#318cf5',
          focus: '#186ccc',
          disabled: '#a3c4eb',
        },
        text: {
          default: '#fff',
          hover: '#fff',
          focus: '#fff',
          disabled: '#fff',
        },
      };
    case 'secondary':
      return {
        background: {
          default: '#fff',
          hover: '#fff',
          focus: '#fff',
          disabled: '#fff',
        },
        border: {
          default: '#ccd4d9',
          hover: '#ccd4d9',
          focus: '#ccd4d9',
          disabled: '#ebeef0',
        },
        text: {
          default: '#186ccc',
          hover: '#318cf5',
          focus: '#186ccc',
          disabled: '#a3c4eb',
        },
      };
    case 'tertiary':
      return {
        background: {
          default: '#edf0f2',
          hover: '#f2f5f7',
          focus: '#edf0f2',
          disabled: '#f8f9fa',
        },
        border: {
          default: '#ccd4d9',
          hover: '#ccd4d9',
          focus: '#ccd4d9',
          disabled: '#ebeef0',
        },
        text: {
          default: '#454c52',
          hover: '#318cf5',
          focus: '#454c52',
          disabled: '#b5b7ba',
        },
      };
    case 'transparent':
      return {
        background: {
          default: 'transparent',
          hover: '#edf0f2',
          focus: 'transparent',
          disabled: 'transparent',
        },
        border: {
          default: 'transparent',
          hover: 'transparent',
          focus: 'transparent',
          disabled: 'transparent',
        },
        text: {
          default: '#5d6f7a',
          hover: '#318cf5',
          focus: '#5d6f7a',
          disabled: '#bec5ca',
        },
      };
    case 'danger':
      return {
        background: {
          default: '#c43118',
          hover: '#f54e31',
          focus: '#c43118',
          disabled: '#e7ada3',
        },
        border: {
          default: '#c43118',
          hover: '#f54e31',
          focus: '#c43118',
          disabled: '#e7ada3',
        },
        text: {
          default: '#fff',
          hover: '#fff',
          focus: '#fff',
          disabled: '#fff',
        },
      };

    case 'dangerSubtle':
      return {
        background: {
          default: '#fff',
          hover: '#fff',
          focus: '#fff',
          disabled: '#fff',
        },
        border: {
          default: '#ccd4d9',
          hover: '#ccd4d9',
          focus: '#ccd4d9',
          disabled: '#ebeef0',
        },
        text: {
          default: '#c43118',
          hover: '#f54e31',
          focus: '#c43118',
          disabled: '#e7ada3',
        },
      };
    default:
      throw Error(`${variant} is not a valid Button variant`);
  }
};

const Button: ElementWithAs<'button', Props> = ({
  children,
  variant = 'primary',
  ref,
  ...props
}) => (
  <Wrapper colors={getColors(variant)} {...props}>
    {children}
  </Wrapper>
);

export default Button;
