export interface DataState<D> {
  loading: boolean;
  data: D | null;
  error: string | null;
  lastSuccess: number | null;
  lastUpdate: number | null;
}

export interface DataStateWithId<D> extends DataState<D> {
  id: string | null;
}

export const getDefaultDataState = <D>(): DataState<D> => ({
  loading: false,
  data: null,
  error: null,
  lastSuccess: null,
  lastUpdate: null,
});

export const getDefaultDataStateWithId = <D>(): DataStateWithId<D> => ({
  ...getDefaultDataState<D>(),
  id: null,
});

type LoadingFunction = {
  <D>(current: DataState<D>): DataState<D>;
  <D>(
    current: DataStateWithId<D>,
    id: DataStateWithId<D>['id'],
  ): DataStateWithId<D>;
};

type SuccessFunction = {
  <D, T extends DataState<D>>(current: T, data: D): T;
};

type ErrorFunction = {
  <D, T extends DataState<D>>(
    current: T,
    error: DataState<D>['error'],
    clearData?: boolean,
  ): T;
};

interface UpdateFunctions {
  loading: LoadingFunction;
  success: SuccessFunction;
  error: ErrorFunction;
}

const updateDataState: UpdateFunctions = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loading: (current, id?): any => {
    if (id !== undefined) {
      return {
        ...current,
        loading: true,
        id,
        lastUpdate: Date.now(),
      };
    }
    return {
      ...current,
      loading: true,
      lastUpdate: Date.now(),
    };
  },
  success: (current, data) => ({
    ...current,
    loading: false,
    data,
    error: null,
    lastSuccess: Date.now(),
    lastUpdate: Date.now(),
  }),
  error: (current, error, clearData = false) => ({
    ...current,
    loading: false,
    data: clearData ? null : current.data,
    error,
    lastUpdate: Date.now(),
  }),
};

export default updateDataState;
