export type TMutate<T> = {
  -readonly [P in keyof T]: T[P];
};
