import { ActionCreatorsMapObject } from 'redux';

export interface Action<T extends string> {
  type: T;
}

export interface ActionWithPayload<T extends string, P> extends Action<T> {
  payload: P;
}

type ActionCreator = {
  <T extends string>(type: T): Action<T>;
  <T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;
};

const actionCreator: ActionCreator = <T extends string, P>(
  type: T,
  payload?: P,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any => (payload !== undefined ? { type, payload } : { type });

export type Actions<A extends ActionCreatorsMapObject> = ReturnType<A[keyof A]>;

export default actionCreator;
