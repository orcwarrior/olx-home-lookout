
export type SeedData<T> = Omit<T, "id">;

export type SeedFnWhere = (table: string, query: object) => any;
export type SeedFnJoin = (table: string, joinQuery: object) => any;
export type SeedFnGet = (string) => any;

export type SeedExecutor<T> = (where: SeedFnWhere, join: SeedFnJoin, get: SeedFnGet) => T[]
