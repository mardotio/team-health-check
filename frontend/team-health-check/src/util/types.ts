import React from 'react';

export type MergeElementProps<
  T extends React.ElementType,
  P extends object = {},
> = Omit<React.ComponentPropsWithRef<T>, keyof P> & P;

export type PropsWithAs<E extends React.ElementType, P extends {}> = {
  as?: E;
} & MergeElementProps<E, P>;

export type ElementWithAs<D extends React.ElementType, P extends {}> = <
  E extends React.ElementType = D,
>(
  props: PropsWithAs<E, P>,
) => React.ReactElement | null;
