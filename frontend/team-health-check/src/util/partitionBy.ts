type PassedPartition<T> = T[];
type FailedPartition<T> = T[];

export type Partitioned<T> = [PassedPartition<T>, FailedPartition<T>];

const partitionBy = <T>(
  arr: T[],
  filterFn: (e: T) => boolean,
): Partitioned<T> =>
  arr.reduce(
    (partitioned, e) => {
      const result = filterFn(e);
      const [success, fail] = partitioned;
      if (result) {
        return [[...success, e], fail];
      }
      return [success, [...fail, e]];
    },
    [[], []] as Partitioned<T>,
  );

export default partitionBy;
