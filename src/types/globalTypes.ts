/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
// types.ts

import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition,
  QueryDefinition,
} from "@reduxjs/toolkit/query/react";

// Generic API Response type
export interface ApiResponse<Data = any> {
  status: string;
  message: string;
  data: Data;
}

// Utility type to extract the argument type from a query
export type QueryArg<T extends QueryDefinition<any, any, any, any>> =
  T extends QueryDefinition<infer Q, any, any, any> ? Q : never;

// Utility type to extract the result type from a query
export type QueryResult<T extends QueryDefinition<any, any, any, any>> =
  T extends QueryDefinition<any, any, any, infer R> ? R : never;

// Utility type to extract the argument type from a mutation
export type MutationArg<T extends MutationDefinition<any, any, any, any>> =
  T extends MutationDefinition<infer Q, any, any, any> ? Q : never;

// Utility type to extract the result type from a mutation
export type MutationResult<
  T extends MutationDefinition<any, any, any, unknown>
> = T extends MutationDefinition<any, any, any, infer R> ? R : never;

// Base Query type
export type BaseApiQuery = BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  {},
  FetchBaseQueryMeta
>;
