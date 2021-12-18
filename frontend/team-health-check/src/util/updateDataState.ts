export interface DataState<D> {
  loading: boolean;
  data: D | null;
  error: string | null;
  lastSuccess: number | null;
  lastUpdate: number | null;
}

const updateDataState = {
  loading: <D>(current: DataState<D>): DataState<D> => ({
    ...current,
    loading: true,
    lastUpdate: Date.now(),
  }),
  success: <D>(current: DataState<D>, data: D): DataState<D> => ({
    ...current,
    loading: false,
    data,
    error: null,
    lastSuccess: Date.now(),
    lastUpdate: Date.now(),
  }),
  error: <D>(
    current: DataState<D>,
    error: DataState<D>['error'],
    clearData = false,
  ): DataState<D> => ({
    ...current,
    loading: false,
    data: clearData ? null : current.data,
    error,
    lastUpdate: Date.now(),
  }),
};

export default updateDataState;
